const News = require('../models/News');

exports.getAll = async (req, res) => {
  try {
    const { status, category, search, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const news = await News.find(filter)
      .populate('author', 'name')
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await News.countDocuments(filter);

    res.json({ news, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug }).populate('author', 'name');
    if (!news) return res.status(404).json({ message: 'Новость не найдена' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'name');
    if (!news) return res.status(404).json({ message: 'Новость не найдена' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.create = async (req, res) => {
  try {
    const news = await News.create({ ...req.body, author: req.user.id });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!news) return res.status(404).json({ message: 'Новость не найдена' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.remove = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: 'Новость не найдена' });
    res.json({ message: 'Новость удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};