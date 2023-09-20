require("dotenv").config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = express.Router();
const Employee = require('../models/employee');

router.post("/register", async (req,res)=> {

    try{
        const { name , address ,email,password} = req.body;
        if(!(email && password && name && address)){

            res.status(400).send("All input is required");
        }

        const oldUser = await Employee.findOne({email});

        if(oldUser)
        {
            res.status(409).send("User Already Exist. Please Login");
        }


        encryptedPassword  = await bcrypt.hash(password,10);

        const user = await Employee.create({
            name: name,
            email : email.toLowerCase(),
            password: encryptedPassword,
            address: address,
        });
        //console.log(user);
        const token = jwt.sign(
            { user_id : user._id ,email : email},
            process.env.TOKEN_KEY,{
                expiresIn :"2h",
            }
        )
        user.token = token;

        res.status(201).json(user);


    }catch (err){
        console.log(err);
    }

});
router.post("/login", async (req,res)=>{

    try{
        const {email,password} = req.body;
        if(!(email && password )){

            res.status(400).send("All input is required");
        }
        const user = await Employee.findOne({email});

        if (user && (await bcrypt.compare(password,user.password)))
        {
            const token = jwt.sign(
                { user_id : user._id ,email : email},
                process.env.TOKEN_KEY,{
                    expiresIn :"2h",
                }
            );

            user.token = token;

            res.status(201).json(user);

        }
        else
        {
            res.status(400).send("Invalid Credentials");
        }

    }catch (err){
        console.log(err);
    }
    

});


module.exports = router;