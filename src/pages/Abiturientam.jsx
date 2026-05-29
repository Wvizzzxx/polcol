import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IconClipboardText, IconCoin, IconCompass, IconConfetti, IconDeviceLaptop, IconDoor, IconFileText, IconHeartHandshake, IconHome, IconReport, IconSchool, IconSpeakerphone, IconTrophy } from '@tabler/icons-react';
import { renderIcon } from '../utils/iconMap'
import { img } from '../utils/imageUrl'

const sections = [
  { 
    title: 'Приемная комиссия', 
    path: '/abiturientam/priemnaya-komissiya', 
    Icon: IconClipboardText, 
    desc: 'Информация о работе приемной комиссии, сроках, необходимых документах и правилах приема',
    details: ['Сроки приема документов', 'Перечень специальностей', 'Количество бюджетных мест', 'Документы для поступления']
  },
  { 
    title: 'День открытых дверей', 
    path: '/abiturientam/den-otkrytykh-dverej', 
    Icon: IconDoor, 
    desc: 'Приходите знакомиться с колледжем, преподавателями и образовательными программами',
    details: ['Экскурсия по колледжу', 'Мастер-классы', 'Встреча с преподавателями', 'Знакомство с лабораториями']
  },
  { 
    title: 'Специальности', 
    path: '/abiturientam/spetsialnosti', 
    Icon: IconSchool, 
    desc: 'Полный список направлений подготовки и специальностей колледжа',
    details: ['Информационные технологии', 'Машиностроение', 'Экономика и управление', 'Сфера услуг']
  },
  { 
    title: 'Общежитие', 
    path: '/abiturientam/obshhezhitie-dlya-inogorodnikh-studentov', 
    Icon: IconHome, 
    desc: 'Информация о предоставлении общежития для иногородних студентов',
    details: ['Условия проживания', 'Порядок заселения', 'Стоимость проживания', 'Правила внутреннего распорядка']
  },
  { 
    title: 'Профориентация', 
    path: '/abiturientam/proforientatsiya', 
    Icon: IconCompass, 
    desc: 'Помощь в выборе будущей профессии, тестирование и консультации',
    details: ['Тестирование на профпригодность', 'Консультации специалистов', 'Экскурсии на предприятия', 'Мастер-классы']
  },
  { 
    title: 'Объявления', 
    path: '/abiturientam/obyavleniya', 
    Icon: IconSpeakerphone, 
    desc: 'Актуальные объявления и важная информация для поступающих',
    details: ['Важные даты приемной кампании', 'Изменения в правилах приема', 'Дополнительные наборы', 'Конкурсные списки']
  },
  { 
    title: 'Образовательное кредитование', 
    path: '/obrazovatelnoe-kreditovanie', 
    Icon: IconCoin, 
    desc: 'Возможность получить качественное образование в кредит на выгодных условиях',
    details: ['Государственная поддержка', 'Льготная ставка', 'Отсрочка платежа', 'Удобные условия погашения']
  },
  { 
    title: 'Виртуальный кабинет', 
    path: '/virtualnyy-kabinet-proforientatsii', 
    Icon: IconDeviceLaptop, 
    desc: 'Виртуальный кабинет по профориентации с полезными материалами и тестами',
    details: ['Онлайн-тестирование', 'Видеоматериалы', 'Профессиограммы', 'Виртуальные экскурсии']
  },
]

const timeline = [
  { month: 'ИЮНЬ', event: 'Начало приёма документов', Icon: IconFileText, accent: 'bg-emerald-500' },
  { month: 'ИЮЛЬ', event: 'Приём оригиналов аттестатов', Icon: IconReport, accent: 'bg-teal-500' },
  { month: 'АВГУСТ', event: 'Зачисление на бюджет', Icon: IconSchool, accent: 'bg-cyan-500' },
  { month: 'СЕНТЯБРЬ', event: 'Начало занятий!', Icon: IconConfetti, accent: 'bg-emerald-600' },
]

export default function Abiturientam() {
  return (
    <div>
      {/* ==================== HERO — ПОЛНОЭКРАННЫЙ С ГРАДИЕНТОМ ==================== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          {/* Анимированные круги */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-emerald-500/10" 
          />
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }} 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-cyan-500/10" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }} 
            transition={{ duration: 8, repeat: Infinity }} 
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[100px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ duration: 10, repeat: Infinity }} 
            className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Левая колонка — текст */}
            <div>
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex-shrink-0 mb-6">
                  {renderIcon(IconDoor, 'w-16 h-16 text-white drop-shadow')}
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-sm font-semibold tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Приём 2026
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.15 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6"
              >
                Твой путь<br/>
                <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  начинается здесь
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3 }}
                className="text-lg text-emerald-100/60 max-w-lg leading-relaxed mb-10"
              >
                Владимирский политехнический колледж — 12 специальностей, 
                500+ бюджетных мест, 95% трудоустройство. Стань частью нашей команды!
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-4"
              >
                <Link 
                  to="/abiturientam/priemnaya-komissiya" 
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/25 text-lg"
                >
                  Подать документы
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  to="/abiturientam/spetsialnosti" 
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  Все специальности
                </Link>
              </motion.div>
            </div>

            {/* Правая колонка — карточки-пруфы */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.5 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {/* Большая карточка */}
              <div className="col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">500+</h3>
                <p className="text-emerald-300/70 text-sm">Бюджетных мест</p>
              </div>
              
              {/* Маленькие карточки */}
              {[
                { value: '12', label: 'Специальностей', color: 'from-emerald-400 to-teal-400' },
                { value: '95%', label: 'Трудоустройство', color: 'from-cyan-400 to-blue-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all">
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
                  <p className="text-white/50 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== ТАЙМЛАЙН ПРИЁМНОЙ КАМПАНИИ ==================== */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Декор */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold tracking-wider uppercase mb-4">
              Календарь поступления
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-official">
              Ключевые даты
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Линия соединения */}
                {idx < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-emerald-200 to-transparent z-0" />
                )}
                
                <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-6 text-center hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group-hover:-translate-y-1">
                  <div className={`w-14 h-14 ${item.accent} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <item.Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-emerald-600 font-bold text-sm tracking-wider uppercase mb-2">{item.month}</p>
                  <p className="text-official font-semibold text-sm">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== РАЗДЕЛЫ — МОЗАИКА С ИКОНКАМИ ==================== */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold tracking-wider uppercase mb-4">
              Полезные разделы
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-official mb-3">
              Всё для поступления
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Подробные материалы по каждому направлению помогут сделать правильный выбор
            </p>
          </motion.div>

          {/* Мозаика: 2 больших + 6 маленьких */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Большая карточка — Специальности */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2"
            >
              <Link to="/abiturientam/spetsialnosti" className="group block h-full bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl"><IconSchool className="inline w-5 h-5 align-text-bottom" /></span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Специальности</h3>
                  <p className="text-emerald-100/70 mb-6 max-w-md">12 направлений подготовки от IT до машиностроения — выбери своё будущее</p>
                  <div className="flex flex-wrap gap-2">
                    {['Программирование', 'Робототехника', 'Экономика', 'Дизайн'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Остальные карточки */}
            {sections.filter(s => s.title !== 'Специальности').slice(0, 5).map((item, idx) => (
              <motion.div 
                key={item.path}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={item.path} className="group block bg-white border border-gray-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                      <item.Icon className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-official text-sm mb-1 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ПРЕИМУЩЕСТВА — ВИДЕЛИЗАЦИЯ ==================== */}
      <section className="py-20 bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950 text-white relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-4">
              Преимущества
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Почему ВПК?
            </h2>
            <p className="text-emerald-200/50 max-w-2xl mx-auto">
              Мы создаём условия для вашего успеха
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: IconTrophy, title: 'Качество', value: '95%', desc: 'выпускников трудоустраиваются по специальности', gradient: 'from-emerald-500 to-teal-500' },
              { Icon: IconDeviceLaptop, title: 'База', value: '8', desc: 'современных IT-мастерских и лабораторий', gradient: 'from-cyan-500 to-blue-500' },
              { Icon: IconHeartHandshake, title: 'Партнёры', value: '50+', desc: 'предприятий и организаций региона', gradient: 'from-teal-500 to-emerald-500' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                  <item.Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-4xl font-extrabold text-white mb-1">{item.value}</p>
                <p className="text-emerald-300 font-semibold text-sm mb-2">{item.title}</p>
                <p className="text-emerald-200/50 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ФОТО ГАЛЕРЕЯ — НЕСТАНДАРТНАЯ СЕТКА ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold tracking-wider uppercase mb-4">
              Жизнь колледжа
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-official">
              Учись у нас — это интересно!
            </h2>
          </motion.div>

          {/* Нестандартная сетка: 1 большая + 2 маленьких + 2 маленьких + 1 большая */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="col-span-2 rounded-2xl overflow-hidden shadow-xl group">
              <div className="relative h-64 md:h-80">
                <img src={img('/images/polcol/035_AVG_9304.jpg')} alt="Учебный процесс" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-xl">Практические занятия</p>
                  <p className="text-emerald-200/70 text-sm">Современные лаборатории и оборудование</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl overflow-hidden shadow-xl group">
              <div className="relative h-64 md:h-80">
                <img src={img('/images/polcol/040_AVG_9601.jpg')} alt="Лабораторная работа" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm">Лабораторные</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden shadow-xl group">
              <div className="relative h-48">
                <img src={img('/images/polcol/074_j4S9Qv_USrQ.jpg')} alt="Кампус" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm">Наш кампус</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden shadow-xl group">
              <div className="relative h-48">
                <img src={img('/images/polcol/066_2116_vladimirskiy_politehnicheskiy_kolledzh_5a265b9f0b05.jpg')} alt="Главный вход" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm">Главный вход</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="col-span-2 rounded-2xl overflow-hidden shadow-xl group">
              <div className="relative h-64 md:h-80">
                <img src={img('/images/polcol/027_Molodezh.jpg')} alt="Добрые дела" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-xl">Добрые дела</p>
                  <p className="text-rose-200/70 text-sm">Волонтёрство и социальные проекты</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CTA — ЯРКИЙ БАННЕР ==================== */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <motion.div 
          animate={{ x: [0, 50, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" 
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Готов поступать?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Приёмная комиссия работает ежедневно. Приходи, звони или пиши — мы поможем!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/abiturientam/priemnaya-komissiya" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl hover:bg-emerald-50 transition-all hover:-translate-y-1 hover:shadow-xl text-lg"
              >
                В приёмную комиссию
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                to="/contacts" 
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-2xl hover:bg-white/15 transition-all"
              >
                Задать вопрос
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}