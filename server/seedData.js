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

const navigationData = [
  {
    title: 'Сведения об образовательной организации',
    path: '/sveden',
    icon: 'info',
    order: 0,
    isMain: true,
    submenu: [
      { title: 'Основные сведения', path: '/sveden/common', order: 0 },
      { title: 'Структура и органы управления', path: '/sveden/struct', order: 1 },
      { title: 'Документы', path: '/sveden/document', order: 2 },
      { title: 'Образование', path: '/sveden/education', order: 3 },
      { title: 'Образовательные стандарты', path: '/sveden/eduStandarts', order: 4 },
      { title: 'Руководство. Педагогический состав', path: '/sveden/employees', order: 5 },
      { title: 'Материально-техническое обеспечение', path: '/sveden/dsreda', order: 6 },
      { title: 'Стипендии и меры поддержки', path: '/sveden/grants', order: 7 },
      { title: 'Платные образовательные услуги', path: '/sveden/paid_edu', order: 8 },
      { title: 'Финансово-хозяйственная деятельность', path: '/sveden/budget', order: 9 },
      { title: 'Вакантные места для приема', path: '/sveden/vacant', order: 10 },
      { title: 'Международное сотрудничество', path: '/sveden/cooperation', order: 12 },
    ]
  },
  {
    title: 'Абитуриентам',
    path: '/abiturientam',
    icon: 'user',
    order: 1,
    submenu: [
      { title: 'Приемная комиссия', path: '/abiturientam/priemnaya-komissiya', order: 0 },
      { title: 'День открытых дверей', path: '/abiturientam/den-otkrytykh-dverej', order: 1 },
      { title: 'Специальности', path: '/abiturientam/spetsialnosti', order: 2 },
      { title: 'Общежитие', path: '/abiturientam/obshhezhitie-dlya-inogorodnikh-studentov', order: 3 },
      { title: 'Профориентация', path: '/abiturientam/proforientatsiya', order: 4 },
      { title: 'Тест на профопределение', path: '/abiturientam/test-na-professionalnoe-samoopredelenie', order: 5 },
    ]
  },
  {
    title: 'Студентам',
    path: '/studentam',
    icon: 'graduation',
    order: 2,
    submenu: [
      { title: 'Расписание занятий', path: '/studentam/raspisanie-zanyatij', order: 0 },
      { title: 'Расписание звонков', path: '/studentam/raspisanie-zvonkov', order: 1 },
      { title: 'Документы', path: '/studentam/dokumenty', order: 2 },
      { title: 'Практика', path: '/studentam/praktika', order: 3 },
      { title: 'Студенческая жизнь', path: '/studentam/studencheskaya-zhizn', order: 4 },
      { title: 'Студенческий совет', path: '/studentam/studencheskiy-sovet', order: 5 },
      { title: 'Трудоустройство', path: '/studentam/trudoustrojstvo-vypusknikov', order: 6 },
      { title: 'Олимпиады и конкурсы', path: '/studentam/olimpiady-i-konkursy', order: 7 },
      { title: 'Волонтерское движение', path: '/studentam/volonterskoe-dvizhenie', order: 8 },
      { title: 'Центр карьеры', path: '/studentam/tsentr-karery', order: 9 },
    ]
  },
  {
    title: 'Родителям',
    path: '/roditelyam',
    icon: 'family',
    order: 3,
    submenu: [
      { title: 'Питание и здоровье', path: '/roditelyam/pitanie-i-zdorovye', order: 0 },
      { title: 'Воспитательная работа', path: '/roditelyam/vospitatelynaya-rabota', order: 1 },
      { title: 'Классные руководители', path: '/roditelyam/klassnye-rukovoditeli', order: 2 },
      { title: 'Объявления', path: '/roditelyam/obyavleniya', order: 3 },
      { title: 'Документы', path: '/roditelyam/dokumenty', order: 4 },
      { title: 'Мероприятия', path: '/roditelyam/meropriyatiya', order: 5 },
    ]
  },
  {
    title: 'Сотрудникам',
    path: '/sotrudnikam',
    icon: 'staff',
    order: 4,
    submenu: [
      { title: 'Аттестация', path: '/sotrudnikam/attestatsii', order: 0 },
      { title: 'Документы', path: '/sotrudnikam/dokumenty', order: 1 },
      { title: 'Методические материалы', path: '/sotrudnikam/metodicheskie-materialy', order: 2 },
      { title: 'Мероприятия', path: '/sotrudnikam/meropriyatiya', order: 3 },
      { title: 'Конкурс "Мастер года"', path: '/sotrudnikam/konkurs-master-goda', order: 4 },
      { title: 'Музей', path: '/sotrudnikam/muzey', order: 5 },
    ]
  },
  {
    title: 'Новости',
    path: '/news',
    icon: 'news',
    order: 5,
    submenu: []
  },
];

const initializeData = async () => {
  try {
    console.log('🔄 Проверка и инициализация данных...');

    // Администратор
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
    }

    // Навигация — всегда перезаписываем для保證 актуальности submenu
    await Navigation.deleteMany({});
    await Navigation.create(navigationData);
    console.log('✅ Навигация обновлена');

    // Страницы
    if ((await Page.countDocuments()) === 0) {
      await Page.create([
        { title: 'Главная', path: '/', sections: [{ type: 'text', title: 'Владимирский политехнический колледж', content: 'ГАПОУ ВО «ВПК». Качественное образование и успешное будущее' }] },
        { title: 'О колледже', path: '/about', sections: [] },
        { title: 'Абитуриентам', path: '/abiturientam', sections: [] },
        { title: 'Студентам', path: '/studentam', sections: [] },
        { title: 'Родителям', path: '/roditelyam', sections: [] },
        { title: 'Сотрудникам', path: '/sotrudnikam', sections: [] },
        { title: 'IT-Куб', path: '/itcube', sections: [] },
        { title: 'Контакты', path: '/contacts', sections: [] },
      ]);
      console.log('✅ Страницы созданы');
    }

    // Контакты
    if ((await Contact.countDocuments()) === 0) {
      await Contact.create([
        { type: 'address', label: 'Адрес', value: 'г. Владимир, ул. Диктора Левитана, д. 14', icon: 'map-pin', order: 0 },
        { type: 'phone', label: 'Приемная директора', value: '+7 (4922) 32-42-24', icon: 'phone', link: 'tel:+74922324224', order: 1 },
        { type: 'phone', label: 'Приемная комиссия', value: '+7 (4922) 53-12-21', icon: 'phone', link: 'tel:+74922531221', order: 2 },
        { type: 'email', label: 'Email', value: 'vladpk@yandex.ru', icon: 'mail', link: 'mailto:vladpk@yandex.ru', order: 3 },
        { type: 'social', label: 'ВКонтакте', value: 'vk.com/vpk33', icon: 'vk', link: 'https://vk.com/vpk33', order: 4 },
        { type: 'schedule', label: 'График работы', value: 'Пн-Пт: 8:00 - 17:00, Сб: 8:00 - 15:00', icon: 'clock', order: 5 },
      ]);
      console.log('✅ Контакты созданы');
    }

    // Настройки
    if ((await Settings.countDocuments()) === 0) {
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
    }

    // Специальности
    if ((await Specialty.countDocuments()) === 0) {
      await Specialty.create([
        { code: '09.02.01', name: 'Компьютерные сети и системы связи', description: 'Подготовка специалистов в области проектирования, настройки и администрирования компьютерных сетей и систем связи', profile: 'Сетевые технологии', duration: '2 года 10 месяцев', budgetPlaces: 30, paidPlaces: 10, isActive: true, order: 0 },
        { code: '09.02.02', name: 'Компьютерные системы и комплексы', description: 'Подготовка специалистов по сборке, настройке и ремонту компьютерной техники', profile: 'Системная интеграция', duration: '2 года 10 месяцев', budgetPlaces: 25, paidPlaces: 10, isActive: true, order: 1 },
        { code: '09.02.03', name: 'Программирование в компьютерных системах', description: 'Подготовка программистов для разработки программного обеспечения', profile: 'Программирование', duration: '2 года 10 месяцев', budgetPlaces: 35, paidPlaces: 15, isActive: true, order: 2 },
        { code: '20.02.04', name: 'Наземные транспортные средства (машиностроение)', description: 'Подготовка специалистов в области конструирования и производства транспортных средств', profile: 'Машиностроение', duration: '2 года 10 месяцев', budgetPlaces: 20, paidPlaces: 5, isActive: true, order: 3 },
        { code: '22.02.01', name: 'Монтаж и эксплуатация внутренних сантехнических устройств', description: 'Подготовка специалистов по монтажу и обслуживанию инженерных систем зданий', profile: 'Строительство', duration: '2 года 10 месяцев', budgetPlaces: 15, paidPlaces: 5, isActive: true, order: 4 },
      ]);
      console.log('✅ Специальности созданы');
    }

    // Сотрудники
    if ((await Employee.countDocuments()) === 0) {
      await Employee.create([
        { fullName: 'Иванов Сергей Петрович', position: 'Директор', department: 'Руководство', education: 'Высшее, ВГУ', experience: 25, category: 'Высшая', phone: '+7 (4922) 32-42-24', email: 'ivanov@vpk.ru', bio: 'Директор Владимирского политехнического колледжа.', achievements: ['Медаль «За заслуги в образовании»', 'Почётный работник общего образования РФ'], order: 0, isActive: true },
        { fullName: 'Петрова Елена Викторовна', position: 'Заместитель директора по учебной работе', department: 'Руководство', education: 'Высшее, ВГУ', experience: 18, category: 'Высшая', phone: '+7 (4922) 32-42-25', email: 'petrova@vpk.ru', bio: 'Курирует учебную деятельность колледжа.', achievements: ['Почётный работник среднего профессионального образования'], order: 1, isActive: true },
        { fullName: 'Сидоров Алексей Николаевич', position: 'Заведующий кафедрой информатики', department: 'Информатика и вычислительная техника', education: 'Высшее, МГУ', experience: 15, category: 'Высшая', phone: '+7 (4922) 32-42-30', email: 'sidorov@vpk.ru', bio: 'Преподаватель информатики и программирования.', achievements: ['Победитель конкурса «Лучший преподаватель года»', 'Руководитель IT-кружка'], order: 2, isActive: true },
        { fullName: 'Козлова Мария Андреевна', position: 'Преподаватель математики', department: 'Математика и естественные науки', education: 'Высшее, ВГПУ', experience: 12, category: 'Первая', phone: '', email: 'kozlova@vpk.ru', bio: 'Автор методических пособий.', achievements: ['Автор методических пособий', 'Победитель городского конкурса'], order: 3, isActive: true },
        { fullName: 'Морозов Дмитрий Владимирович', position: 'Преподаватель машиностроения', department: 'Машиностроение', education: 'Высшее, МАДИ', experience: 20, category: 'Высшая', phone: '+7 (4922) 32-42-35', email: 'morozov@vpk.ru', bio: 'Специалист по CAD-системам и 3D-моделированию.', achievements: ['Научный руководитель студенческих проектов', 'Сертифицированный специалист SolidWorks'], order: 4, isActive: true },
        { fullName: 'Волкова Ольга Игоревна', position: 'Преподаватель английского языка', department: 'Языковые дисциплины', education: 'Высшее, ВГПУ', experience: 8, category: 'Вторая', phone: '', email: 'volkova@vpk.ru', bio: 'Преподаватель английского языка.', achievements: ['Сертификат Cambridge English', 'Руководитель языкового клуба'], order: 5, isActive: true },
      ]);
      console.log('✅ Сотрудники созданы');
    }

    // Документы
    if ((await Document.countDocuments()) === 0) {
      await Document.create([
        { title: 'Устав ГАПОУ ВО «ВПК»', category: 'Устав', file: '', description: 'Основной документ колледжа', version: '3.0', isPublished: true, order: 0 },
        { title: 'Лицензия на образовательную деятельность', category: 'Лицензии', file: '', description: 'Лицензия на осуществление образовательной деятельности', version: '1.0', isPublished: true, order: 1 },
        { title: 'Государственная аккредитация', category: 'Аккредитация', file: '', description: 'Свидетельство о государственной аккредитации', version: '1.0', isPublished: true, order: 2 },
        { title: 'Правила приёма в колледж', category: 'Приказы', file: '', description: 'Правила приёма обучающихся', version: '1.0', isPublished: true, order: 3 },
        { title: 'Платные образовательные услуги', category: 'Образование', file: '', description: 'Стоимость обучения', version: '1.0', isPublished: true, order: 4 },
      ]);
      console.log('✅ Документы созданы');
    }

    // Мероприятия
    if ((await Event.countDocuments()) === 0) {
      await Event.create([
        { title: 'День открытых дверей', description: 'Приглашаем абитуриентов', date: new Date('2026-03-15'), location: 'Главный корпус' },
        { title: 'Научно-практическая конференция', description: 'Ежегодная конференция по СПО', date: new Date('2026-04-20'), location: 'Актовый зал' },
        { title: 'IT-хакатон', description: 'Соревнование по программированию', date: new Date('2026-05-10'), location: 'Лаборатория IT-Куб' },
      ]);
      console.log('✅ Мероприятия созданы');
    }

    // Новости
    if ((await News.countDocuments()) === 0) {
      await News.create([
        { title: 'День открытых дверей', content: 'Приглашаем абитуриентов!', status: 'published', category: 'Новости' },
        { title: 'Начало приемной кампании', content: 'С 1 июня начинается прием документов.', status: 'published', category: 'Новости' },
      ]);
      console.log('✅ Новости созданы');
    }

    // Hero-секция
    if ((await HeroSection.countDocuments()) === 0) {
      await HeroSection.create({
        key: 'main',
        badge: 'ГАПОУ Владимирской области',
        title: 'Владимирский политехнический',
        titleHighlight: 'колледж',
        subtitle: 'Качественное образование сегодня — профессиональный успех завтра.',
        buttonText: 'Поступить к нам',
        buttonLink: '/abiturientam',
        secondaryButtonText: 'О колледже',
        secondaryButtonLink: '/about',
        isActive: true,
        order: 0,
      });
      console.log('✅ Hero-секция создана');
    }

    console.log('✅ Данные инициализированы');
  } catch (error) {
    console.error('⚠️ Ошибка инициализации данных:', error.message);
  }
};

module.exports = initializeData;