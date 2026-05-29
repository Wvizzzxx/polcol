const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['address', 'phone', 'email', 'social', 'reception', 'schedule'],
    required: true
  },
  label: { type: String, default: '' },
  value: { type: String, required: true },
  icon: { type: String, default: '' },
  link: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);