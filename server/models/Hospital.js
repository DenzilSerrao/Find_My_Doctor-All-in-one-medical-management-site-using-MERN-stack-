const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  Hospital_ID: {
    type: String,
    unique: true,
    required: true
  },
  HospitalName: String,
  HospitalContactNumber: String,
  Email: {
    type: String,
    unique: true,
    required: true
  },
  HospitalAddress: String,
  Password: String,
  doctors: [
    {
      Doctor_ID: String,
      Doctor_Name: String,
      Specialization: String,
      Email: {
        type: String,
        unique: true
      }
    }
  ]
});

module.exports = mongoose.model('Hospital', hospitalSchema);
