const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const Page = require('../models/Page');
const News = require('../models/News');
const Navigation = require('../models/Navigation');
const Employee = require('../models/Employee');
const Specialty = require('../models/Specialty');
const Contact = require('../models/Contact');
const Settings = require('../models/Settings');
const Document = require('../models/Document');
const Event = require('../models/Event');
const ContactMessage = require('../models/ContactMessage');
const HeroSection = require('../models/HeroSection');

// Публичный API — все данные для SPA
router.get('/content', async (req, res) => {
  try {
    const [pages, navigation, news, employees, specialties, contacts, settings, documents, events, heroes] = await Promise.all([
      Page.find({ isActive: true }).sort({ path: 1 }),
      Navigation.find({ isActive: true }).sort({ order: 1 }),
      News.find({ status: 'published' }).sort({ publishedAt: -1 }),
      Employee.find({ isActive: true }).sort({ order: 1, lastName: 1 }),
      Specialty.find({ isActive: true }).sort({ order: 1, code: 1 }),
      Contact.find().sort({ order: 1 }),
      Settings.findOne(),
      Document.find({ isPublished: true }).sort({ category: 1, order: 1 }),
      Event.find({ isPublished: true }).sort({ date: -1 }),
      HeroSection.find({ isActive: true }).sort({ order: 1 }),
    ]);

    res.json({
      pages,
      navigation,
      news,
      employees,
      specialties,
      contacts,
      settings,
      documents,
      events,
      heroes,
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

// Публичная отправка сообщения «Напишите нам»
router.post('/contact-message', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ message: 'Имя и сообщение обязательны' });
    }
    const msg = await ContactMessage.create({ name, email, phone, subject, message });
    res.status(201).json({ message: 'Сообщение отправлено', id: msg._id });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

// Экспорт данных в JS-модули для клиентского SPA
const EXPORT_DIR = path.join(__dirname, '..', 'exports');

const ensureExportDir = () => {
  if (!fs.existsSync(EXPORT_DIR)) {
    fs.mkdirSync(EXPORT_DIR, { recursive: true });
  }
};

const exportModule = (name, data) => {
  ensureExportDir();
  const filePath = path.join(EXPORT_DIR, `${name}.js`);
  const content = `// Auto-generated from CMS — ${new Date().toISOString()}\nwindow.__CMS_${name.toUpperCase()} = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(filePath, content, 'utf8');
};

router.get('/export', async (req, res) => {
  try {
    const [pages, navigation, news, employees, specialties, contacts, settings, documents, events, heroes] = await Promise.all([
      Page.find({ isActive: true }).sort({ path: 1 }),
      Navigation.find({ isActive: true }).sort({ order: 1 }),
      News.find({ status: 'published' }).sort({ publishedAt: -1 }),
      Employee.find({ isActive: true }).sort({ order: 1, lastName: 1 }),
      Specialty.find({ isActive: true }).sort({ order: 1, code: 1 }),
      Contact.find().sort({ order: 1 }),
      Settings.findOne(),
      Document.find({ isPublished: true }).sort({ category: 1, order: 1 }),
      Event.find({ isPublished: true }).sort({ date: -1 }),
      HeroSection.find({ isActive: true }).sort({ order: 1 }),
    ]);

    exportModule('pages', pages);
    exportModule('navigation', navigation);
    exportModule('news', news);
    exportModule('employees', employees);
    exportModule('specialties', specialties);
    exportModule('contacts', contacts);
    exportModule('settings', settings);
    exportModule('documents', documents);
    exportModule('events', events);
    exportModule('heroes', heroes);

    // Главный экспорт-файл
    ensureExportDir();
    const mainContent = `// Auto-generated CMS bundle — ${new Date().toISOString()}\nwindow.__CMS_DATA = ${JSON.stringify({
      pages, navigation, news, employees, specialties, contacts, settings, documents, events, heroes
    }, null, 2)};\n`;
    fs.writeFileSync(path.join(EXPORT_DIR, 'cms-data.js'), mainContent, 'utf8');

    res.json({ message: 'Данные экспортированы', count: 10 });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка экспорта', error: error.message });
  }
});

// Статическая раздача JS-экспортов
router.use('/exports', express.static(EXPORT_DIR));

// JSON-экспорт для GitHub Pages (без сервера)
router.get('/content.json', async (req, res) => {
  try {
    const [pages, navigation, news, employees, specialties, contacts, settings, documents, events, heroes] = await Promise.all([
      Page.find({ isActive: true }).sort({ path: 1 }),
      Navigation.find({ isActive: true }).sort({ order: 1 }),
      News.find({ status: 'published' }).sort({ publishedAt: -1 }),
      Employee.find({ isActive: true }).sort({ order: 1, lastName: 1 }),
      Specialty.find({ isActive: true }).sort({ order: 1, code: 1 }),
      Contact.find().sort({ order: 1 }),
      Settings.findOne(),
      Document.find({ isPublished: true }).sort({ category: 1, order: 1 }),
      Event.find({ isPublished: true }).sort({ date: -1 }),
      HeroSection.find({ isActive: true }).sort({ order: 1 }),
    ]);
    res.json({ pages, navigation, news, employees, specialties, contacts, settings, documents, events, heroes });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка экспорта', error: error.message });
  }
});

module.exports = router;
