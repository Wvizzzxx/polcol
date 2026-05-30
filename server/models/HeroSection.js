const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'main'
  },
  badge: { type: String, default: '' },
  title: { type: String, default: '' },
  titleHighlight: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImage: { type: String, default: '' },
  buttonText: { type: String, default: '' },
  buttonLink: { type: String, default: '' },
  secondaryButtonText: { type: String, default: '' },
  secondaryButtonLink: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('HeroSection', heroSectionSchema);