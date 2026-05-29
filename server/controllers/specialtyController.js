const Specialty = require('../models/Specialty');

exports.getAll = async (req, res) => {
  try {
    const specialties = await Specialty.find().sort({ order: 1 });
    res.json(specialties);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getById = async (req, res) => {
  try {
    const specialty = await Specialty.findById(req.params.id);
    if (!specialty) return res.status(404).json({ message: 'Специальность не найдена' });
    res.json(specialty);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.create = async (req, res) => {
  try {
    const specialty = await Specialty.create(req.body);
    res.status(201).json(specialty);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const specialty = await Specialty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!specialty) return res.status(404).json({ message: 'Специальность не найдена' });
    res.json(specialty);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.remove = async (req, res) => {
  try {
    const specialty = await Specialty.findByIdAndDelete(req.params.id);
    if (!specialty) return res.status(404).json({ message: 'Специальность не найдена' });
    res.json({ message: 'Специальность удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};