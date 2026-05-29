const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['new', 'processing', 'replied', 'closed'],
    default: 'new'
  },
  isRead: { type: Boolean, default: false },
  isImportant: { type: Boolean, default: false },
  adminReply: { type: String, default: '' },
  repliedAt: { type: Date }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);