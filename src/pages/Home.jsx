import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconDeviceLaptop, IconGlobe, IconSettings, IconPrinter, IconSettings2, IconScale, IconHome } from '@tabler/icons-react';
import { renderIcon } from '../utils/iconMap';
import { img } from '../utils/imageUrl';
import AdmissionTimer from '../components/AdmissionTimer';
import LazyImage from '../components/LazyImage';
import { useHeroes, useNews, useSpecialties } from '../hooks/useCmsData';

const defaultNavItems = [
  { slug: 'abiturientam', title: 'Абитуриентам', icon: 'hat.svg', desc: 'Поступление, специальности, документы', color: 'from-official to-official-600' },
  { slug: 'studentam', title: 'Студентам', icon: 'book.svg', desc: 'Расписание, обучение, мероприятия', color: 'from-official-500 to-official-700' },
  { slug: 'roditelyam', title: 'Родителям', icon: 'group.svg', desc: 'Питание, здоровье, воспитание', color: 'from-accent-dark to-accent' },
  { slug: 'sotrudnikam', title: 'Сотрудникам', icon: 'college.svg', desc: 'Документы, методика, аттестация', color: 'from-official-light to-official' },
];

const defaultSpecialties = [
  { code: '09.02.07', name: 'Информационные системы и программирование', Icon: IconDeviceLaptop, color: 'from-official to-official-600' },
  { code: '09.02.06', name: 'Сетевое и системное администрирование', Icon: IconGlobe, color: 'from-official-500 to-official-700' },
  { code: '15.02.08', name: 'Технология машиностроения', Icon: IconSettings, color: 'from-gray-600 to-gray-800' },
  { code: '15.02.10', name: 'Мехатроника и мобильная робототехника', Icon: IconPrinter, color: 'from-official-light to-official' },
  { code: '38.02.01', name: 'Экономика и бухгалтерский учет', Icon: IconSettings2, color: 'from-accent-dark to-accent' },
  { code: '09.02.05', name: 'Прикладная информатика', Icon: IconScale, color: 'from-official to-official-light' },
];

const Home = () => {
  const heroes = useHeroes();
  const newsItems = useNews();
  const specialtiesData = useSpecialties();
  
  // Hero из CMS или дефолтный
  const hero = heroes.find(h => h.key === 'main') || {};
  const heroTitle = hero.title || 'Владимирский политехнический';
  const heroHighlight = hero.titleHighlight || 'колледж';
  const heroBadge = hero.badge || 'ГАПОУ Владимирской области';
  const heroSubtitle = hero.subtitle || 'Качественное образование сегодня — профессиональный успех завтра. Региональный центр по подготовке специалистов ИТ-сферы и машиностроения';
  const heroBtnText = hero.buttonText || 'Поступить к нам';
  const heroBtnLink = hero.buttonLink || '/abiturientam';
  const heroSecBtnText = hero.secondaryButtonText || 'О колледже';
  const heroSecBtnLink = hero.secondaryButtonLink || '/about';

  // Новости из CMS (последние 3)
  const displayNews = newsItems.slice(0, 3);
  const hasNews = displayNews.length > 0;

  // Специальности из CMS или дефолтные
  const displaySpecialties = specialtiesData.length > 0
    ? specialtiesData.slice(0, 6).map(s => ({
        code: s.code,
        name: s.name,
        Icon: IconDeviceLaptop,
        color: 'from-official to-official-600',
      }))
    : defaultSpecialties;

  return (
    <div className="bg-[var(--color-bg)]">
      {/* Hero-секция */}
      <section className="relative overflow-hidden bg-gradient-to-br from-official-900 via-official-800 to-official-900 min-h-[520px] flex items-center w-full">
        {hero.backgroundImage && (
          <div className="absolute inset-0">
            <img src={hero.backgroundImage} alt="" className="w-full h-full object-cover opacity-20" />
          </div>
        )}
        <div className="absolute inset-0 official-pattern opacity-30" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-official-600/20 blur-3xl" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex-shrink-0 mb-6">
                {renderIcon(IconHome, 'w-16 h-16 text-white drop-shadow')}
              </motion.div>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="badge-accent mb-4 inline-block">
                {heroBadge}
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight break-words">
                {heroTitle}<br />
                <span className="text-gradient">{heroHighlight}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
                {heroSubtitle}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
                <Link to={heroBtnLink} className="btn-accent">
                  {heroBtnText}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link to={heroSecBtnLink} className="btn-outline">
                  {heroSecBtnText}
                </Link>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="hidden lg:block">
              <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <LazyImage src={img('/images/polcol/066_2116_vladimirskiy_politehnicheskiy_kolledzh_5a265b9f0b05.jpg')} alt="Владимирский политехнический колледж" className="w-full h-80" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <img src={img('/images/logo.png')} alt="Логотип" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <p className="font-bold text-official text-sm">ГАПОУ ВО «ВПК»</p>
                    <p className="text-gray-400 text-xs">С 1944 года</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Декоративный фоновый паттерн */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>
      </section>

      {/* Секция Таймера приёмной комиссии */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AdmissionTimer />
        </div>
      </section>

      {/* Секция Карточек навигации */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="accent-line-center mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-official mb-2">Разделы сайта</h2>
            <p className="text-gray-500">Выберите раздел, чтобы получить нужную информацию</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {defaultNavItems.map(({ slug, title, icon, desc, color }, idx) => (
              <motion.div key={slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <Link
                  to={`/${slug}`}
                  className="group block bg-white border border-gray-100 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:border-transparent hover:-translate-y-2 h-full"
                >
                  <div className={`w-20 h-20 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <img src={img(`/img/${icon}`)} alt={title} className="w-10 h-10 object-contain brightness-0 invert" />
                  </div>
                  <h3 className="text-lg font-bold text-official mb-2">{title}</h3>
                  <p className="text-sm text-gray-400">{desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция "О колледже" */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl relative">
                <img src={img('/images/polcol/034_college2.jpg')} alt="Владимирский политехнический колледж" className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-official-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-bold text-lg">Октябрьский проспект, 11</p>
                  <p className="text-white/70 text-sm">г. Владимир</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
              <div className="accent-line mb-4" />
              <span className="badge-official mb-3 inline-block">О нас</span>
              <h2 className="text-2xl md:text-3xl font-bold text-official mb-4">О колледже</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                В самом центре города Владимира расположился Владимирский политехнический колледж — современный студенческий кампус с учебным корпусом, общежитием, столовой и учебными мастерскими. За 80 лет существования колледж дал путёвку в профессиональную жизнь более 25 тысячам специалистов.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Колледж является региональным центром по подготовке специалистов ИТ-сферы и машиностроения. На базе колледжа работают восемь современных ИТ-мастерских. Колледж первым в области получил грант в рамках федерального проекта «Цифровая образовательная среда».
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { val: '80+', label: 'Лет' },
                  { val: '25К+', label: 'Выпускников' },
                  { val: '8', label: 'ИТ-мастерских' },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-2 rounded-lg bg-official-50 border border-official-100 text-center">
                    <p className="text-accent-dark font-bold text-lg">{s.val}</p>
                    <p className="text-gray-400 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-official">
                Подробнее о колледже
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Секция Направления обучения */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="accent-line-center mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-official mb-2">Направления обучения</h2>
            <p className="text-gray-500">Выберите специальность и начните карьеру уже сейчас</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displaySpecialties.map((spec, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <Link to="/abiturientam/spetsialnosti" className="block bg-white border border-gray-100 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:border-transparent hover:-translate-y-1 group h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${spec.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <spec.Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-official-50 text-official text-xs font-bold rounded-full mb-3 border border-official-100">
                    {spec.code}
                  </div>
                  <h3 className="text-base font-bold text-official mb-3 leading-snug group-hover:text-accent-dark transition-colors">
                    {spec.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-dark group-hover:text-accent transition-colors duration-200">
                    Подробнее
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-10">
            <Link to="/abiturientam/spetsialnosti" className="btn-official">
              Все специальности
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Секция Новости и события */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="accent-line-center mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-official mb-2">Жизнь колледжа</h2>
            <p className="text-gray-500">Узнайте, как проходят занятия, мероприятия и добрые дела наших студентов</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hasNews ? (
              displayNews.map((item, idx) => (
                <motion.div key={item._id || idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                  <Link to={`/news/${item._id}`} className="block rounded-2xl overflow-hidden shadow-lg bg-white h-full hover:shadow-xl transition-shadow">
                    {item.coverImage ? (
                      <LazyImage src={item.coverImage} alt={item.title} className="w-full h-48" />
                    ) : (
                      <LazyImage src={img('/images/polcol/035_AVG_9304.jpg')} alt={item.title} className="w-full h-48" />
                    )}
                    <div className="p-5">
                      <h3 className="font-bold text-official mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{item.content?.substring(0, 120)}...</p>
                      {item.date && (
                        <p className="text-xs text-gray-400 mt-2">{new Date(item.date).toLocaleDateString('ru-RU')}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}>
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-white h-full">
                    <LazyImage src={img('/images/polcol/035_AVG_9304.jpg')} alt="Учебный процесс в колледже" className="w-full h-48" />
                    <div className="p-5">
                      <h3 className="font-bold text-official mb-2">Учебный процесс</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Современные лаборатории и кабинеты, оснащённые новейшим оборудованием для качественного обучения</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-white h-full">
                    <LazyImage src={img('/images/polcol/027_Molodezh.jpg')} alt="Добрые дела студентов" className="w-full h-48" />
                    <div className="p-5">
                      <h3 className="font-bold text-official mb-2">Добрые дела</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Наши студенты активно участвуют в волонтёрских акциях и социальных проектах</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-white h-full">
                    <LazyImage src={img('/images/polcol/074_j4S9Qv_USrQ.jpg')} alt="Кампус колледжа" className="w-full h-48" />
                    <div className="p-5">
                      <h3 className="font-bold text-official mb-2">Наш кампус</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Историческое здание колледжа, оснащённое по современным стандартам комфорта и безопасности</p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-10">
            <Link to="/news" className="btn-official">
              Все новости
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
