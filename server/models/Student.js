// models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, default: 1 },
  currentCheckIn: [{
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    checkedOutAt: { type: Date, default: Date.now }
  }],
  historyCheckouts: [{
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    checkedOutAt: { type: Date, default: Date.now }
  }]
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
