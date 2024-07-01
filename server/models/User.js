// User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  Id: Number,
  gender: String,
  email: String,
  password: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;