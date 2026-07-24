const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  internId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Intern',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  loginTime: {
    type: Date,
    required: true,
  },
  logoutTime: {
    type: Date,
  },
  totalWorkingHours: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Attendance', attendanceSchema);
