const mongoose = require('mongoose');
const { connect } = require('../config/connectDB');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: String,
  email : String,
  password: String,
  salary: Number,
  address: String,
  department_id: String,
  token:  String 
},
{ 
  timestamps: true
}
);

const EmployeeModel = connect.model('employees', EmployeeSchema);

module.exports = EmployeeModel;