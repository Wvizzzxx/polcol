const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  fullDescription: { type: String, default: '' },
  forms: [{ type: String }],
  duration: { type: String, default: '' },
  budgetPlaces: { type: Number, default: 0 },
  paidPlaces: { type: Number, default: 0 },
  costPerYear: { type: Number, default: 0 },
  fgosCode: { type: String, default: '' },
  disciplines: [{ type: String }],
  image: { type: String, default: '' },
  emoji: { type: String, default: '' },
  color: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Specialty', specialtySchema);