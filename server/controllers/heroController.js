const HeroSection = require('../models/HeroSection');

exports.getAll = async (req, res) => {
  try {
    const heroes = await HeroSection.find().sort({ order: 1 });
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getByKey = async (req, res) => {
  try {
    const hero = await HeroSection.findOne({ key: req.params.key });
    if (!hero) return res.status(404).json({ message: 'Hero-секция не найдена' });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getById = async (req, res) => {
  try {
    const hero = await HeroSection.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Hero-секция не найдена' });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.create = async (req, res) => {
  try {
    const hero = await HeroSection.create(req.body);
    res.status(201).json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const hero = await HeroSection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!hero) return res.status(404).json({ message: 'Hero-секция не найдена' });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.remove = async (req, res) => {
  try {
    const hero = await HeroSection.findByIdAndDelete(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Hero-секция не найдена' });
    res.json({ message: 'Hero-секция удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};