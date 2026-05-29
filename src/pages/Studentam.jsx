import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IconBell, IconBook2, IconBriefcase, IconBuilding, IconCalendar, IconConfetti, IconFileText, IconHeartHandshake, IconMedal, IconPencil, IconRocket, IconSchool, IconTool, IconTrophy, IconUsers } from '@tabler/icons-react';
import { renderIcon } from '../utils/iconMap'

const quickAccess = [
  { Icon: IconCalendar, title: 'Расписание занятий', path: '/studentam/raspisanie-zanyatij', desc: 'Актуальное расписание по группам' },
  { Icon: IconBell, title: 'Расписание звонков', path: '/studentam/raspisanie-zvonkov', desc: 'Время начала и окончания пар' },
  { Icon: IconPencil, title: 'Аттестация', path: '/studentam/promezhutochnaya-i-itogovaya-attestatsiya', desc: 'Зачёты и экзамены' },
]

const sections = [
  { title: 'Расписание занятий', path: '/studentam/raspisanie-zanyatij', Icon: IconCalendar, desc: 'Актуальное расписание занятий по группам и преподавателям', color: 'bg-blue-500' },
  { title: 'Расписание звонков', path: '/studentam/raspisanie-zvonkov', Icon: IconBell, desc: 'Время начала и окончания учебных пар', color: 'bg-amber-500' },
  { title: 'Документы', path: '/studentam/dokumenty', Icon: IconFileText, desc: 'Необходимые документы, бланки, заявления', color: 'bg-gray-500' },
  { title: 'Практика', path: '/studentam/praktika', Icon: IconTool, desc: 'Учебная и производственная практика', color: 'bg-emerald-500' },
  { title: 'Студенческая жизнь', path: '/studentam/studencheskaya-zhizn', Icon: IconConfetti, desc: 'Мероприятия, кружки, секции', color: 'bg-pink-500' },
  { title: 'Студенческий совет', path: '/studentam/studencheskiy-sovet', Icon: IconUsers, desc: 'Орган студенческого самоуправления', color: 'bg-indigo-500' },
  { title: 'Трудоустройство', path: '/studentam/trudoustrojstvo-vypusknikov', Icon: IconBriefcase, desc: 'Помощь в трудоустройстве', color: 'bg-teal-500' },
  { title: 'Олимпиады', path: '/studentam/olimpiady-i-konkursy', Icon: IconTrophy, desc: 'Участие в олимпиадах и конкурсах', color: 'bg-orange-500' },
  { title: 'Методические материалы', path: '/studentam/metodicheskie-materialy', Icon: IconBook2, desc: 'Методические пособия и учебные материалы', color: 'bg-violet-500' },
  { title: 'Волонтёрство', path: '/studentam/volonterskoe-dvizhenie', Icon: IconHeartHandshake, desc: 'Добровольческая деятельность', color: 'bg-rose-500' },
  { title: 'Центр карьеры', path: '/studentam/tsentr-karery', Icon: IconRocket, desc: 'Профориентация и стажировки', color: 'bg-cyan-500' },
  { title: 'Заочное обучение', path: '/studentam/zaochnoe-obuchenie', Icon: IconPencil, desc: 'Информация для заочников', color: 'bg-slate-500' },
]

export default function Studentam() {
  return (
    <div>
      {/* ==================== HERO — МИНИМАЛИСТИЧНЫЙ С БОЛЬШОЙ ТИПОГРАФИКОЙ ==================== */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-800 to-green-900">
        {/* Сетка-фон */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Левая часть — контент (3 колонки) */}
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="mb-6">
                  {renderIcon(IconSchool, 'w-16 h-16 text-white drop-shadow')}
              </motion.div>
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-widest uppercase mb-6"
              >
                Студентам ВПК
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1] mb-6"
              >
                Учись.<br/>
                <span className="text-emerald-300">Соревнуйся.</span><br/>
                Побеждай.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.25 }}
                className="text-lg text-emerald-100/60 max-w-lg mb-8 leading-relaxed"
              >
                Вся необходимая информация для успешного обучения: расписание, документы, практика и олимпиады
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Link to="/studentam/raspisanie-zanyatij" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  Мое расписание
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link to="/studentam/studencheskaya-zhizn" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                  Студенческая жизнь
                </Link>
              </motion.div>
            </div>

            {/* Правая часть — быстрые карточки (2 колонки) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 space-y-3"
            >
              {quickAccess.map((link, i) => (
                <Link key={i} to={link.path} className="flex items-center gap-4 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/15 hover:border-emerald-400/30 transition-all group">
                  <link.Icon className="w-7 h-7 text-emerald-400" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-sm group-hover:text-emerald-300 transition-colors">{link.title}</h3>
                    <p className="text-white/40 text-xs truncate">{link.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              ))}
              {/* Счётчик */}
              <div className="bg-emerald-500/15 backdrop-blur-sm border border-emerald-500/25 rounded-2xl p-5 flex items-center justify-around">
                {[
                  { val: '2500+', label: 'Студентов' },
                  { val: '150+', label: 'Преподавателей' },
                  { val: '10+', label: 'Кружков' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-emerald-300 font-extrabold text-xl">{s.val}</p>
                    <p className="text-white/40 text-[10px] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== ВСЕ РАЗДЕЛЫ — КОМПАКТНЫЙ СПИСОК С ИКОНКАМИ ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold tracking-wider uppercase mb-3">
                Все разделы
              </span>
              <h2 className="text-3xl font-extrabold text-official">Сервисы и материалы</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((item, idx) => (
              <motion.div 
                key={item.path}
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.03 }}
              >
                <Link to={item.path} className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-200">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md`}>
                    <item.Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-official text-sm group-hover:text-teal-600 transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-xs truncate">{item.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ФОТО — ГОРИЗОНТАЛЬНАЯ ЛЕНТА ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold tracking-wider uppercase mb-3">
              Наша жизнь
            </span>
            <h2 className="text-3xl font-extrabold text-official">Занятия, практика и добрые дела</h2>
          </motion.div>

          {/* Горизонтальная лента — непрерывный скролл */}
          <div className="flex gap-5 overflow-hidden">
            {[
              { src: '/images/занятия.jpg', title: 'Учебный процесс', color: 'from-teal-600' },
              { src: '/images/добрые дела.jpg', title: 'Добрые дела', color: 'from-emerald-600' },
              { src: '/images/заняти2.jpg', title: 'Лабораторная работа', color: 'from-cyan-600' },
              { src: '/images/фотоколледжа3.webp', title: 'Наш кампус', color: 'from-green-600' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 w-72 rounded-2xl overflow-hidden shadow-lg group"
              >
                <div className="relative h-48">
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} to-transparent opacity-60`} />
                  <p className="absolute bottom-3 left-4 text-white font-bold text-sm">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ЧЕМПИОНАТНОЕ ДВИЖЕНИЕ — АКЦЕНТНЫЙ БЛОК ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-emerald-100 text-xs font-bold tracking-wider uppercase mb-4"><IconTrophy className="inline w-5 h-5 align-text-bottom" /> Чемпионатное движение
                </span>
                <h2 className="text-3xl font-extrabold mb-4">WorldSkills и «Профессионалы»</h2>
                <p className="text-emerald-100/70 mb-6 leading-relaxed">
                  Участвуй в чемпионатах профессионального мастерства, докажи свой уровень 
                  и получи признание работодателей. Наши студенты — постоянные призёры 
                  региональных и всероссийских чемпионатов.
                </p>
                <Link to="/studentam/chempionatnoe-dvizhenie" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-all">
                  Узнать больше
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '15+', label: 'Компетенций', Icon: IconTool },
                  { val: '30+', label: 'Участников', Icon: IconUsers },
                  { val: '5', label: 'Призовых мест', Icon: IconMedal },
                  { val: '1', label: 'Региональный центр', Icon: IconBuilding },
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <s.Icon className="w-6 h-6 text-white mb-1" />
                    <p className="text-white font-extrabold text-xl">{s.val}</p>
                    <p className="text-emerald-200/60 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-16 bg-gradient-to-br from-teal-900 via-emerald-800 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-extrabold mb-3">Не нашёл нужное?</h2>
            <p className="text-emerald-200/60 mb-8">Свяжитесь с администрацией — мы поможем найти ответ</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contacts" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-all">
                Контакты колледжа
              </Link>
              <Link to="/" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                На главную
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}