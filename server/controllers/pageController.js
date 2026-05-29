const Page = require('../models/Page');

exports.getAll = async (req, res) => {
  try {
    const pages = await Page.find().sort({ path: 1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getByPath = async (req, res) => {
  try {
    const path = req.query.path ? '/' + req.query.path.replace(/^\//, '') : '/';
    const page = await Page.findOne({ path });
    if (!page) return res.status(404).json({ message: 'Страница не найдена' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ message: 'Страница не найдена' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.create = async (req, res) => {
  try {
    const page = await Page.create(req.body);
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!page) return res.status(404).json({ message: 'Страница не найдена' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.updateSections = async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      { sections: req.body.sections },
      { new: true }
    );
    if (!page) return res.status(404).json({ message: 'Страница не найдена' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.remove = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ message: 'Страница не найдена' });
    res.json({ message: 'Страница удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};