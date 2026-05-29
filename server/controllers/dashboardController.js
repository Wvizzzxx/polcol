const News = require('../models/News');
const Employee = require('../models/Employee');
const Specialty = require('../models/Specialty');
const ContactMessage = require('../models/ContactMessage');
const User = require('../models/User');
const Page = require('../models/Page');

exports.getStats = async (req, res) => {
  try {
    const stats = {
      news: {
        total: await News.countDocuments(),
        published: await News.countDocuments({ status: 'published' }),
        drafts: await News.countDocuments({ status: 'draft' }),
        archived: await News.countDocuments({ status: 'archived' })
      },
      employees: {
        total: await Employee.countDocuments(),
        active: await Employee.countDocuments({ isActive: true })
      },
      specialties: {
        total: await Specialty.countDocuments(),
        active: await Specialty.countDocuments({ isActive: true })
      },
      pages: {
        total: await Page.countDocuments({ isActive: true })
      },
      messages: {
        total: await ContactMessage.countDocuments(),
        new: await ContactMessage.countDocuments({ status: 'new' }),
        processing: await ContactMessage.countDocuments({ status: 'processing' })
      },
      users: {
        total: await User.countDocuments()
      }
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const recentNews = await News.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('title updatedAt')
      .populate('author', 'name');

    const recentMessages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name subject createdAt status');

    res.json({
      recentNews,
      recentMessages
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};