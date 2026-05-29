const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Владимирский политехнический колледж' },
  siteDescription: { type: String, default: '' },
  logo: { type: String, default: '' },
  favicon: { type: String, default: '' },
  contacts: {
    address: { type: String, default: '' },
    phones: [{ type: String }],
    emails: [{ type: String }],
    workHours: { type: String, default: '' },
    mapCoordinates: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 }
    }
  },
  socials: {
    vk: { type: String, default: '' },
    telegram: { type: String, default: '' },
    youtube: { type: String, default: '' },
    whatsapp: { type: String, default: '' }
  },
  analytics: {
    yandexMetrikaId: { type: String, default: '' },
    googleAnalyticsId: { type: String, default: '' }
  },
  seo: {
    defaultTitle: { type: String, default: '' },
    defaultDescription: { type: String, default: '' },
    defaultKeywords: { type: String, default: '' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);