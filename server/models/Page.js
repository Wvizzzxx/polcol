const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'list', 'cards', 'info', 'gallery', 'faq', 'video'],
    required: true
  },
  title: { type: String, default: '' },
  icon: { type: String, default: '' },
  image: { type: String, default: '' },
  images: { type: [String], default: [] },
  content: { type: String, default: '' },
  items: { type: mongoose.Schema.Types.Mixed, default: [] },
  order: { type: Number, default: 0 }
});

const pageSchema = new mongoose.Schema({
  path: {
    type: String,
    required: [true, 'Путь страницы обязателен'],
    unique: true
  },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  badge: { type: String, default: '' },
  hero: { type: String, default: '' },
  sections: [sectionSchema],
  seo: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' }
  },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Page', pageSchema);