const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: '' },
  file: { type: String, default: '' },
  fileSize: { type: Number, default: 0 },
  version: { type: String, default: '1.0' },
  description: { type: String, default: '' },
  page: { type: String, default: '' },
  isPublished: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Document', documentSchema);