const mongoose = require('mongoose');

const submenuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  path: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
});

const navigationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  path: { type: String, required: true },
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isMain: { type: Boolean, default: false },
  submenu: [submenuSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Navigation', navigationSchema);