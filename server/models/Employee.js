const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, default: '' },
  education: { type: String, default: '' },
  experience: { type: Number, default: 0 },
  category: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  photo: { type: String, default: '' },
  bio: { type: String, default: '' },
  achievements: [{ type: String }],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);