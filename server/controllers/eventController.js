const Event = require('../models/Event');

exports.getAll = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const events = await Event.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Event.countDocuments(filter);

    res.json({ events, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Мероприятие не найдено' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.create = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Мероприятие не найдено' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.remove = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Мероприятие не найдено' });
    res.json({ message: 'Мероприятие удалено' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};