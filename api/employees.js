const express = require('express')

const router = express.Router();
const Employee = require('../models/employee');


// router.use(function(req,res,next){

//     console.log('Time : ',Date.now());
//     next();
// })

// router.use('/',function(req,res,next){

//     console.log('eire');
//     next();
// })



router.get('/employeeAll',async (req,res) => {
    try{
        const employees = await Employee.find({});
        res.status(200).json(employees);
    }
    catch (error){
        res.status(500).json(error);
    }
});
router.post('/create', async (req, res) => {
	// create employee
    const payload = req.body;
    const employees = new Employee(payload);
    await employees.save();
    res.status(201).end();
});

router.put('/update/:id', async (req, res) => {
	// update employee
  const payload = req.body;
  const { id } = req.params;

  const employees = await Employee.findByIdAndUpdate(id, { $set: payload });
  res.status(200).json(employees);
});
router.delete('/:id', async (req, res) => {
	// delete employee
    const { id } = req.params;

    await Employee.findByIdAndDelete(id);
    res.status(204).end();
});




module.exports = router;