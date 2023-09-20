require('dotenv').config();

// const mysql = require('mysql');

 const { DB_NAME,DB_USERNAME,DB_PASSWORD,DB_PORT,DB_MONGO } = process.env;

 const mongoose = require('mongoose');

 mongoose.connect('mongodb://'+DB_MONGO+':'+DB_PORT+'/'+DB_NAME, {
   useNewUrlParser: true,
   
 });
exports.connect = mongoose;

