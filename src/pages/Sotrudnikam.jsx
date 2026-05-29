import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IconBook2, IconBuilding, IconBulb, IconChartBar, IconClipboardText, IconFileText, IconSchool, IconSpeakerphone, IconTent, IconTrendingUp, IconTrophy, IconUsers } from '@tabler/icons-react';
import { renderIcon } from '../utils/iconMap'

const sections = [
  { title: 'Аттестация', path: '/sotrudnikam/attestatsii', Icon: IconClipboardText, desc: 'График и порядок проведения аттестации', featured: true },
  { title: 'Документы', path: '/sotrudnikam/dokumenty', Icon: IconFileText, desc: 'Коллективный договор, правила, инструкции' },
  { title: 'Методические материалы', path: '/sotrudnikam/metodicheskie-materialy', Icon: IconBook2, desc: 'Разработки уроков, УМК, презентации' },
  { title: 'Объявления', path: '/sotrudnikam/obyavleniya', Icon: IconSpeakerphone, desc: 'Педсоветы, семинары, КПК' },
  { title: 'Мероприятия', path: '/sotrudnikam/meropriyatiya', Icon: IconTent, desc: 'Педагогические советы, мастер-классы' },
  { title: 'Конкурс «Мастер года»', path: '/sotrudnikam/konkurs-master-goda', Icon: IconTrophy, desc: 'Профессиональное мастерство среди педагогов' },
  { title: 'Музей колледжа', path: '/sotrudnikam/muzey', Icon: IconBuilding, desc: 'Экспозиции истории колледжа' },
  { title: 'Передовые технологии', path: '/sotrudnikam/peredovye-pedagogicheskie-tekhnologii', Icon: IconBulb, desc: 'Цифровые платформы, геймификация' },
  { title: 'Обучение сотрудников', path: '/sotrudnikam/obuchenie-sotrudnikov', Icon: IconSchool, desc: 'Повышение квалификации, стажировки' },
  { title: 'ВСОКО', path: '/sotrudnikam/vnutrennyaya-sistema-otsenki-kachestva-obrazovaniya', Icon: IconChartBar, desc: 'Мониторинг качества образования' },
]

export default function Sotrudnikam() {
  return (
    <div>
      {/* ==================== HERO — СТРОГИЙ ПРОФЕССИОНАЛЬНЫЙ ==================== */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-950">
          {/* Горизонтальные линии — «офисный» паттерн */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,1) 30px, rgba(255,255,255,1) 31px)' }} />
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 12, repeat: Infinity }} className="absolute -top-40 right-0 w-[600px] h-[600px] bg-indigo-500/8 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="mb-6">
                  {renderIcon(IconSchool, 'w-16 h-16 text-white drop-shadow')}
              </motion.div>
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-sm font-bold tracking-wider uppercase mb-6"
              ><IconSchool className="inline w-5 h-5 align-text-bottom" /> Сотрудникам
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6"
              >
                Профессионалы<br/>
                <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300 bg-clip-text text-transparent">
                  создают
                </span><br/>
                будущее
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.25 }}
                className="text-lg text-indigo-100/50 max-w-lg mb-8 leading-relaxed"
              >
                Методическое обеспечение, аттестация, повышение квалификации — всё для успешной профессиональной деятельности
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Link to="/sotrudnikam/metodicheskie-materialy" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  Методические материалы
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link to="/sotrudnikam/attestatsii" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                  Аттестация
                </Link>
              </motion.div>
            </div>

            {/* Правая — dashboard-стиль со статистикой */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-white/80 text-sm font-bold tracking-wider uppercase mb-6">Портал сотрудника</h3>
                
                {/* Статистика в виде панели */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { val: '150+', label: 'Сотрудников', Icon: IconUsers, trend: '+12 за год' },
                    { val: '70%', label: 'Высшая категория', Icon: IconTrophy, trend: 'стабильно' },
                    { val: '20+', label: 'Канд. наук', Icon: IconSchool, trend: '+3 за год' },
                    { val: '95%', label: 'Прошли КПК', Icon: IconTrendingUp, trend: 'ежегодно' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <s.Icon className="w-5 h-5 text-indigo-400" />
                        <span className="text-[10px] text-emerald-400 font-medium">{s.trend}</span>
                      </div>
                      <p className="text-white font-extrabold text-2xl">{s.val}</p>
                      <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Быстрые ссылки */}
                <div className="space-y-2">
                  {[
                    { Icon: IconClipboardText, title: 'Аттестация', path: '/sotrudnikam/attestatsii' },
                    { Icon: IconBook2, title: 'Методические материалы', path: '/sotrudnikam/metodicheskie-materialy' },
                    { Icon: IconSchool, title: 'Повышение квалификации', path: '/sotrudnikam/obuchenie-sotrudnikov' },
                  ].map((link, i) => (
                    <Link key={i} to={link.path} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 hover:bg-white/10 transition-all group">
                      <link.Icon className="w-5 h-5 text-indigo-400" />
                      <span className="text-white/70 text-sm font-medium group-hover:text-indigo-300 transition-colors">{link.title}</span>
                      <svg className="w-4 h-4 text-indigo-400 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== ВСЕ РАЗДЕЛЫ — КОМПАКТНЫЙ СПИСОК ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3">
              Все разделы
            </span>
            <h2 className="text-3xl font-extrabold text-official">Профессиональные ресурсы</h2>
          </motion.div>

          {/* Список в 2 колонки — деловой стиль */}
          <div className="grid md:grid-cols-2 gap-3">
            {sections.map((item, idx) => (
              <motion.div 
                key={item.path}
                initial={{ opacity: 0, y: 10 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.03 }}
              >
                <Link to={item.path} className="group flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-5 py-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                    <item.Icon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-official text-sm group-hover:text-indigo-700 transition-colors">{item.title}</h3>
                      {item.featured && (
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full">Актуально</span>
                      )}
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ФОТО — СТРОГАЯ ГАЛЕРЕЯ ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3">
              Наш колледж
            </span>
            <h2 className="text-3xl font-extrabold text-official">Современная база для работы</h2>
          </motion.div>

          {/* Полоса из 4 фото — горизонтальная */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: '/images/фотокабинета.webp', title: 'Кабинеты' },
              { src: '/images/фотокабинета2.webp', title: 'Лаборатории' },
              { src: '/images/фотоколледжа2.jpg', title: 'Здание' },
              { src: '/images/фотоколледжа3.webp', title: 'Корпуса' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.08 }}
                className="rounded-xl overflow-hidden shadow-lg group"
              >
                <div className="relative h-40">
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent" />
                  <p className="absolute bottom-2 left-3 text-white font-bold text-xs">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-extrabold mb-3">Нужна помощь?</h2>
            <p className="text-indigo-200/50 mb-8">Обратитесь в учебную часть или методический отдел</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contacts" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-all">
                Контакты
              </Link>
              <Link to="/" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                На главную
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}