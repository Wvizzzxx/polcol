const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');

// Импорт роутов
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const pageRoutes = require('./routes/pages');
const navigationRoutes = require('./routes/navigation');
const employeeRoutes = require('./routes/employees');
const specialtyRoutes = require('./routes/specialties');
const mediaRoutes = require('./routes/media');
const contactRoutes = require('./routes/contacts');
const documentRoutes = require('./routes/documents');
const settingsRoutes = require('./routes/settings');
const eventRoutes = require('./routes/events');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Статические файлы (загруженные изображения/документы)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API роуты
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/navigation', navigationRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/specialties', specialtyRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Внутренняя ошибка сервера', error: err.message });
});

const PORT = process.env.PORT || 5000;

// Подключение к БД и запуск сервера
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
    console.log(`📦 API: http://localhost:${PORT}/api`);
    console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
  });
});