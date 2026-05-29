const Navigation = require('../models/Navigation');

exports.getAll = async (req, res) => {
  try {
    const nav = await Navigation.find().sort({ order: 1 });
    res.json(nav);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.update = async (req, res) => {
  try {
    await Navigation.deleteMany({});
    const nav = await Navigation.insertMany(req.body);
    res.json(nav);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};