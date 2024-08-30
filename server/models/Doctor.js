const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  Doctor_ID: {
    type: String,
    unique: true,
  },
  Doctor_Name: {
    type: String,
    required: true,
  },
  Specialization: {
    type: String,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  HospitalName: {
    type: String,
  },
  Hospital_ID: {
    type: String,
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
