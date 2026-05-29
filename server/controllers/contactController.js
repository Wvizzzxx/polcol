const Contact = require('../models/Contact');
const ContactMessage = require('../models/ContactMessage');

exports.getAll = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ order: 1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.update = async (req, res) => {
  try {
    await Contact.deleteMany({});
    const contacts = await Contact.insertMany(req.body);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Contact Messages
exports.getMessages = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const messages = await ContactMessage.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await ContactMessage.countDocuments(filter);

    res.json({ messages, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!message) return res.status(404).json({ message: 'Сообщение не найдено' });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.removeMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Сообщение не найдено' });
    res.json({ message: 'Сообщение удалено' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};