const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please add a full name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please add a phone number'],
  },
  role: {
    type: String,
    required: [true, 'Please add a role'],
  },
  department: {
    type: String,
    required: [true, 'Please add a department'],
  },
  college: {
    type: String,
    required: [true, 'Please add a college'],
  },
  skills: {
    type: [String],
    required: true,
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  currentStatus: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Intern', internSchema);
