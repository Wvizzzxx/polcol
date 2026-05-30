const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Navigation = require('./models/Navigation');
const Page = require('./models/Page');
const Contact = require('./models/Contact');
const Settings = require('./models/Settings');
const News = require('./models/News');
const HeroSection = require('./models/HeroSection');
const Employee = require('./models/Employee');
const Specialty = require('./models/Specialty');
const Document = require('./models/Document');
const Event = require('./models/Event');
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

    // Специальности
    const specCount = await Specialty.countDocuments();
    if (specCount === 0) {
      await Specialty.create([
        {
          code: '09.02.01',
          name: 'Компьютерные сети и системы связи',
          description: 'Подготовка специалистов в области проектирования, настройки и администрирования компьютерных сетей и систем связи',
          profile: 'Сетевые технологии',
          duration: '2 года 10 месяцев',
          budgetPlaces: 30,
          paidPlaces: 10,
          isActive: true,
          order: 0,
        },
        {
          code: '09.02.02',
          name: 'Компьютерные системы и комплексы',
          description: 'Подготовка специалистов по сборке, настройке и ремонту компьютерной техники',
          profile: 'Системная интеграция',
          duration: '2 года 10 месяцев',
          budgetPlaces: 25,
          paidPlaces: 10,
          isActive: true,
          order: 1,
        },
        {
          code: '09.02.03',
          name: 'Программирование в компьютерных системах',
          description: 'Подготовка программистов для разработки программного обеспечения',
          profile: 'Программирование',
          duration: '2 года 10 месяцев',
          budgetPlaces: 35,
          paidPlaces: 15,
          isActive: true,
          order: 2,
        },
        {
          code: '20.02.04',
          name: 'Наземные транспортные средства (машиностроение)',
          description: 'Подготовка специалистов в области конструирования и производства транспортных средств',
          profile: 'Машиностроение',
          duration: '2 года 10 месяцев',
          budgetPlaces: 20,
          paidPlaces: 5,
          isActive: true,
          order: 3,
        },
        {
          code: '22.02.01',
          name: 'Монтаж и эксплуатация внутренних сантехнических устройств, кондиционирования воздуха и вентиляции',
          description: 'Подготовка специалистов по монтажу и обслуживанию инженерных систем зданий',
          profile: 'Строительство',
          duration: '2 года 10 месяцев',
          budgetPlaces: 15,
          paidPlaces: 5,
          isActive: true,
          order: 4,
        },
      ]);
      console.log('✅ Специальности созданы');
    } else {
      console.log('👤 Специальности уже существуют');
    }

    // Сотрудники
    const empCount = await Employee.countDocuments();
    if (empCount === 0) {
      await Employee.create([
        {
          fullName: 'Иванов Сергей Петрович',
          position: 'Директор',
          department: 'Руководство',
          education: 'Высшее, ВГУ им. А.Г. и Н.Г. Турченевых',
          experience: 25,
          category: 'Высшая',
          phone: '+7 (4922) 32-42-24',
          email: 'ivanov@vpk.ru',
          bio: 'Директор Владимирского политехнического колледжа. Награждён медалью «За заслуги в образовании».',
          achievements: ['Медаль «За заслуги в образовании»', 'Почётный работник общего образования РФ'],
          order: 0,
          isActive: true,
        },
        {
          fullName: 'Петрова Елена Викторовна',
          position: 'Заместитель директора по учебной работе',
          department: 'Руководство',
          education: 'Высшее, Владимирский государственный университет',
          experience: 18,
          category: 'Высшая',
          phone: '+7 (4922) 32-42-25',
          email: 'petrova@vpk.ru',
          bio: 'Курирует учебную деятельность колледжа, координирует работу педагогического состава.',
          achievements: ['Почётный работник среднего профессионального образования'],
          order: 1,
          isActive: true,
        },
        {
          fullName: 'Сидоров Алексей Николаевич',
          position: 'Заведующий кафедрой информатики',
          department: 'Информатика и вычислительная техника',
          education: 'Высшее, МГУ им. М.В. Ломоносова',
          experience: 15,
          category: 'Высшая',
          phone: '+7 (4922) 32-42-30',
          email: 'sidorov@vpk.ru',
          bio: 'Преподаватель информатики и программирования. Руководитель кружка робототехники.',
          achievements: ['Победитель конкурса «Лучший преподаватель года»', 'Руководитель IT-кружка'],
          order: 2,
          isActive: true,
        },
        {
          fullName: 'Козлова Мария Андреевна',
          position: 'Преподаватель математики',
          department: 'Математика и естественные науки',
          education: 'Высшее, Владимирский государственный педагогический университет',
          experience: 12,
          category: 'Первая',
          phone: '',
          email: 'kozlova@vpk.ru',
          bio: 'Автор методических пособий по преподаванию математики в средних профессиональных учреждениях.',
          achievements: ['Автор методических пособий', 'Победитель городского конкурса педагогического мастерства'],
          order: 3,
          isActive: true,
        },
        {
          fullName: 'Морозов Дмитрий Владимирович',
          position: 'Преподаватель машиностроения',
          department: 'Машиностроение',
          education: 'Высшее, МАДИ (Московский автомобильно-дорожный институт)',
          experience: 20,
          category: 'Высшая',
          phone: '+7 (4922) 32-42-35',
          email: 'morozov@vpk.ru',
          bio: 'Опытный преподаватель с 20-летним стажем. Специалист по CAD-системам и 3D-моделированию.',
          achievements: ['Научный руководитель студенческих проектов', 'Сертифицированный специалист SolidWorks'],
          order: 4,
          isActive: true,
        },
        {
          fullName: 'Волкова Ольга Игоревна',
          position: 'Преподаватель английского языка',
          department: 'Языковые дисциплины',
          education: 'Высшее, ВГПУ',
          experience: 8,
          category: 'Вторая',
          phone: '',
          email: 'volkova@vpk.ru',
          bio: 'Преподаватель английского языка. Руководитель языкового клуба.',
          achievements: ['Сертификат Cambridge English', 'Руководитель языкового клуба'],
          order: 5,
          isActive: true,
        },
      ]);
      console.log('✅ Сотрудники созданы');
    } else {
      console.log('👤 Сотрудники уже существуют');
    }

    // Документы
    const docCount = await Document.countDocuments();
    if (docCount === 0) {
      await Document.create([
        {
          title: 'Устав ГАПОУ ВО «Владимирский политехнический колледж»',
          category: 'Устав',
          file: '',
          description: 'Основной документ, определяющий организационно-правовую форму, статус, цели, задачи и основные направления деятельности колледжа',
          version: '3.0',
          isPublished: true,
          order: 0,
        },
        {
          title: 'Лицензия на образовательную деятельность',
          category: 'Лицензии',
          file: '',
          description: 'Лицензия на осуществление образовательной деятельности по основным профессиональным образовательным программам',
          version: '1.0',
          isPublished: true,
          order: 1,
        },
        {
          title: 'Государственная аккредитация',
          category: 'Аккредитация',
          file: '',
          description: 'Свидетельство о государственной аккредитации по образовательным программам среднего профессионального образования',
          version: '1.0',
          isPublished: true,
          order: 2,
        },
        {
          title: 'Правила приёма в колледж',
          category: 'Приказы',
          file: '',
          description: 'Правила приёма обучающихся на текущий учебный год',
          version: '1.0',
          isPublished: true,
          order: 3,
        },
        {
          title: 'Формы и порядок предоставления платных образовательных услуг',
          category: 'Образование',
          file: '',
          description: 'Информация о стоимости обучения по каждой образовательной программе',
          version: '1.0',
          isPublished: true,
          order: 4,
        },
      ]);
      console.log('✅ Документы созданы');
    } else {
      console.log('👤 Документы уже существуют');
    }

    // Мероприятия
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.create([
        {
          title: 'День открытых дверей',
          description: 'Приглашаем абитуриентов и их родителей познакомиться с колледжом, преподавателями и условиями обучения',
          date: new Date('2026-03-15'),
          location: 'Главный корпус колледжа',
          participants: 200,
        },
        {
          title: 'Научно-практическая конференция',
          description: 'Ежегодная конференция по актуальным вопросам среднего профессионального образования',
          date: new Date('2026-04-20'),
          location: 'Актовый зал',
          participants: 150,
        },
        {
          title: 'IT-хакатон «Код будущего»',
          description: 'Соревнование по программированию среди студентов колледжа',
          date: new Date('2026-05-10'),
          location: 'Лаборатория IT-Куб',
          participants: 60,
        },
        {
          title: 'Выпускной экзамен',
          description: 'Государственная итоговая аттестация выпускников',
          date: new Date('2026-06-01'),
          location: 'Актовый зал',
          participants: 120,
        },
      ]);
      console.log('✅ Мероприятия созданы');
    } else {
      console.log('👤 Мероприятия уже существуют');
    }

    // Новости
    const newsCount = await News.countDocuments();
    if (newsCount === 0) {
      await News.create([
        { title: 'День открытых дверей', content: 'Приглашаем абитуриентов и их родителей на День открытых дверей!', status: 'published', category: 'Новости' },
        { title: 'Начало приемной кампании', content: 'С 1 июня начинается прием документов от абитуриентов.', status: 'published', category: 'Новости' },
        { title: 'IT-хакатон в ВПК', content: 'Наш колледж принял участие в региональном IT-хакатоне по робототехнике.', status: 'published', category: 'Мероприятия' },
      ]);
      console.log('✅ Новости созданы');
    } else {
      console.log('👤 Новости уже существуют');
    }

    // Hero-секции
    const heroCount = await HeroSection.countDocuments();
    if (heroCount === 0) {
      await HeroSection.create({
        key: 'main',
        badge: 'ГАПОУ Владимирской области',
        title: 'Владимирский политехнический',
        titleHighlight: 'колледж',
        subtitle: 'Качественное образование сегодня — профессиональный успех завтра. Региональный центр по подготовке специалистов ИТ-сферы и машиностроения',
        buttonText: 'Поступить к нам',
        buttonLink: '/abiturientam',
        secondaryButtonText: 'О колледже',
        secondaryButtonLink: '/about',
        isActive: true,
        order: 0,
      });
      console.log('✅ Hero-секция создана');
    } else {
      console.log('👤 Hero-секции уже существуют');
    }

    console.log('🎉 Seed завершён!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка seed:', error);
    process.exit(1);
  }
};

seed();