const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/db');
const initializeData = require('./seedData');

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
const heroRoutes = require('./routes/hero');
const publicRoutes = require('./routes/public');

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
app.use('/api/heroes', heroRoutes);
app.use('/api/public', publicRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Админ-панель (собранная SPA)
const adminDist = path.join(__dirname, '..', 'admin-panel', 'dist');
app.use('/admin', express.static(adminDist));
// Express 5 — catch-all для SPA
app.use('/admin', (req, res) => {
  res.sendFile(path.join(adminDist, 'index.html'));
});

// Фронтенд (собранная SPA) — раздаётся на корневом пути
const frontendDist = path.join(__dirname, '..', 'dist');
app.use(express.static(frontendDist));
// Все остальные GET-запросы → index.html (SPA routing)
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Внутренняя ошибка сервера', error: err.message });
});

const PORT = process.env.PORT || 5000;

// Подключение к БД и запуск сервера
connectDB()
  .then(async () => {
    // Автоматическая инициализация данных при первом запуске
    await initializeData();

    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${PORT}`);
      console.log(`📦 API: http://localhost:${PORT}/api`);
      console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
    });
  })
  .catch((err) => {
    console.error('❌ Критическая ошибка:', err.message);
    process.exit(1);
  });
