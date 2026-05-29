const Media = require('../models/Media');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
  try {
    const { folder } = req.query;
    const filter = {};
    if (folder) filter.folder = folder;
    const media = await Media.find(filter).sort({ createdAt: -1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Файл не загружен' });
    }

    const media = await Media.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path.replace(/\\/g, '/').replace('uploads/', ''),
      folder: req.body.folder || 'general',
      alt: req.body.alt || '',
      uploadedBy: req.user.id
    });

    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Файл не найден' });

    const filePath = path.join(__dirname, '..', 'uploads', media.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: 'Файл удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};