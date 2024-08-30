const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: String,
  ContactNumber: String,
  Email: { type: String, unique: true },
  Address: String,
  Password: String
});

module.exports = mongoose.model('User', userSchema);
