const Document = require('../models/Document');

exports.getAll = async (req, res) => {
  try {
    const { category, page } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const docs = await Document.find(filter).sort({ order: 1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Документ не найден' });
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.create = async (req, res) => {
  try {
    const doc = await Document.create({ ...req.body, uploadedBy: req.user.id });
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const doc = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: 'Документ не найден' });
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.remove = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Документ не найден' });
    res.json({ message: 'Документ удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};