const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Navigation = require('./models/Navigation');
const Page = require('./models/Page');
const Contact = require('./models/Contact');
const Settings = require('./models/Settings');
const News = require('./models/News');
const connectDB = require('./config/db');

const seed = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Запуск seed...');

    // Создание администратора по умолчанию
    const adminExists = await User.findOne({ email: 'admin@vpk.ru' });
    if (!adminExists) {
      await User.create({
        name: 'Администратор',
        email: 'admin@vpk.ru',
        password: 'admin123',
        role: 'superadmin',
        isActive: true
      });
      console.log('✅ Администратор создан: admin@vpk.ru / admin123');
    } else {
      console.log('👤 Администратор уже существует');
    }

    // Навигация
    const navCount = await Navigation.countDocuments();
    if (navCount === 0) {
      await Navigation.create([
        { title: 'Главная', path: '/', icon: 'home', order: 0, isMain: true },
        { title: 'Сведения об образовательной организации', path: '/sveden', icon: 'info', order: 1, isMain: false,
          submenu: [
            { title: 'Основные сведения', path: '/sveden/common', order: 0 },
            { title: 'Структура и органы управления', path: '/sveden/struct', order: 1 },
            { title: 'Документы', path: '/sveden/documents', order: 2 },
            { title: 'Образование', path: '/sveden/education', order: 3 },
            { title: 'Образовательные стандарты', path: '/sveden/eduStandarts', order: 4 },
            { title: 'Руководство. Педагогический состав', path: '/sveden/employees', order: 5 },
            { title: 'Материально-техническое обеспечение', path: '/sveden/mto', order: 6 },
            { title: 'Стипендии и меры поддержки', path: '/sveden/stipend', order: 7 },
            { title: 'Платные образовательные услуги', path: '/sveden/paid_edu', order: 8 },
            { title: 'Финансово-хозяйственная деятельность', path: '/sveden/finance', order: 9 },
            { title: 'Вакантные места для приема', path: '/sveden/vacant', order: 10 },
            { title: 'Доступная среда', path: '/sveden/accessible_environment', order: 11 },
            { title: 'Международное сотрудничество', path: '/sveden/cooperation', order: 12 },
          ]
        },
        { title: 'Абитуриентам', path: '/abiturientam', icon: 'user', order: 2 },
        { title: 'Студентам', path: '/studentam', icon: 'graduation', order: 3 },
        { title: 'Родителям', path: '/roditelyam', icon: 'family', order: 4 },
        { title: 'Сотрудникам', path: '/sotrudnikam', icon: 'staff', order: 5 },
        { title: 'Новости', path: '/news', icon: 'news', order: 6 },
        { title: 'Контакты', path: '/contacts', icon: 'contacts', order: 7 },
        { title: 'IT-Куб', path: '/itcube', icon: 'cube', order: 8 },
      ]);
      console.log('✅ Навигация создана');
    } else {
      console.log('👤 Навигация уже существует');
    }

    // Страницы
    const pageCount = await Page.countDocuments();
    if (pageCount === 0) {
      await Page.create([
        { title: 'Главная', path: '/', sections: [{"type":"text","title":"Владимирский политехнический колледж","content":"ГАПОУ ВО «ВПК». Качественное образование и успешное будущее"}] },
        { title: 'О колледже', path: '/about', sections: [] },
        { title: 'Абитуриентам', path: '/abiturientam', sections: [] },
        { title: 'Студентам', path: '/studentam', sections: [] },
        { title: 'Родителям', path: '/roditelyam', sections: [] },
        { title: 'Сотрудникам', path: '/sotrudnikam', sections: [] },
        { title: 'IT-Куб', path: '/itcube', sections: [] },
        { title: 'Контакты', path: '/contacts', sections: [] },
      ]);
      console.log('✅ Страницы созданы');
    } else {
      console.log('👤 Страницы уже существуют');
    }

    // Контакты
    const contactCount = await Contact.countDocuments();
    if (contactCount === 0) {
      await Contact.create([
        { type: 'address', label: 'Адрес', value: 'г. Владимир, ул. Диктора Левитана, д. 14', icon: 'map-pin', order: 0 },
        { type: 'phone', label: 'Приемная директора', value: '+7 (4922) 32-42-24', icon: 'phone', link: 'tel:+74922324224', order: 1 },
        { type: 'phone', label: 'Приемная комиссия', value: '+7 (4922) 53-12-21', icon: 'phone', link: 'tel:+74922531221', order: 2 },
        { type: 'email', label: 'Email', value: 'vladpk@yandex.ru', icon: 'mail', link: 'mailto:vladpk@yandex.ru', order: 3 },
        { type: 'social', label: 'ВКонтакте', value: 'vk.com/vpk33', icon: 'vk', link: 'https://vk.com/vpk33', order: 4 },
        { type: 'schedule', label: 'График работы', value: 'Пн-Пт: 8:00 - 17:00, Сб: 8:00 - 15:00', icon: 'clock', order: 5 },
      ]);
      console.log('✅ Контакты созданы');
    } else {
      console.log('👤 Контакты уже существуют');
    }

    // Настройки
    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await Settings.create({
        siteName: 'ГАПОУ ВО «Владимирский политехнический колледж»',
        shortName: 'ВПК',
        email: 'vladpk@yandex.ru',
        phone: '+7 (4922) 32-42-24',
        address: 'г. Владимир, ул. Диктора Левитана, д. 14',
        workingHours: 'Пн-Пт: 8:00 - 17:00, Сб: 8:00 - 15:00',
        socialLinks: { vk: 'https://vk.com/vpk33' },
      });
      console.log('✅ Настройки созданы');
    } else {
      console.log('👤 Настройки уже существуют');
    }

    // Новости
    const newsCount = await News.countDocuments();
    if (newsCount === 0) {
      await News.create([
        { title: 'День открытых дверей', content: 'Приглашаем абитуриентов и их родителей на День открытых дверей!', isPublished: true, date: new Date() },
        { title: 'Начало приемной кампании', content: 'С 1 июня начинается прием документов от абитуриентов.', isPublished: true, date: new Date() },
      ]);
      console.log('✅ Новости созданы');
    } else {
      console.log('👤 Новости уже существуют');
    }

    console.log('🎉 Seed завершён!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка seed:', error);
    process.exit(1);
  }
};

seed();