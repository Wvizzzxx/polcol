const Employee = require('../models/Employee');

exports.getAll = async (req, res) => {
  try {
    const { department, isActive } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    const employees = await Employee.find(filter).sort({ order: 1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Сотрудник не найден' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.create = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ message: 'Сотрудник не найден' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.remove = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Сотрудник не найден' });
    res.json({ message: 'Сотрудник удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};