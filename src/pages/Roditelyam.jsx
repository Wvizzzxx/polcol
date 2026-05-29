import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IconBook2, IconBuildingHospital, IconChefHat, IconClipboardText, IconClock, IconDoor, IconFileText, IconHome, IconMail, IconPhone, IconSchool, IconSpeakerphone, IconTent } from '@tabler/icons-react';
import { renderIcon } from '../utils/iconMap'
import { img } from '../utils/imageUrl'

const sections = [
  { title: 'Питание и здоровье', path: '/roditelyam/pitanie-i-zdorovye', Icon: IconChefHat, desc: 'Организация горячего питания, медицинский кабинет', featured: true },
  { title: 'Воспитательная работа', path: '/roditelyam/vospitatelynaya-rabota', Icon: IconBook2, desc: 'Воспитательная деятельность, гражданско-патриотическое воспитание' },
  { title: 'Классные руководители', path: '/roditelyam/klassnye-rukovoditeli', Icon: IconSchool, desc: 'Персональный куратор за каждой группой, график приёма' },
  { title: 'Мероприятия', path: '/roditelyam/meropriyatiya', Icon: IconTent, desc: 'Праздники, совместные экскурсии, спортивные дни' },
  { title: 'Объявления', path: '/roditelyam/obyavleniya', Icon: IconSpeakerphone, desc: 'График собраний, важные изменения, события' },
  { title: 'Документы', path: '/roditelyam/dokumenty', Icon: IconFileText, desc: 'Договоры, согласия, бланки заявлений' },
  { title: 'День открытых дверей', path: '/roditelyam/den-otkrytykh-dverey', Icon: IconDoor, desc: 'Встречи для родителей будущих студентов' },
]

const contacts = [
  { Icon: IconPhone, label: 'Куратор', value: '8 (4922) 32-20-90' },
  { Icon: IconClock, label: 'Приём', value: 'вт, чт 14:00–16:00' },
  { Icon: IconMail, label: 'Email', value: 'vosp@polcol.ru' },
]

export default function Roditelyam() {
  return (
    <div>
      {/* ==================== HERO — ТЁПЛЫЙ СЕМЕЙНЫЙ СТИЛЬ ==================== */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Тёплый градиент */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-orange-700 to-rose-800">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[120px]" />
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-rose-400/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Левая колонка */}
            <div>
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="mb-6">
                  {renderIcon(IconHome, 'w-16 h-16 text-white drop-shadow')}
              </motion.div>
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-sm font-bold tracking-wider uppercase mb-6"
              ><IconHome className="inline w-5 h-5 align-text-bottom" /> Родителям
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6"
              >
                Забота о<br/>
                <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                  ваших детях
                </span><br/>
                — наш приоритет
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.25 }}
                className="text-lg text-amber-100/60 max-w-lg mb-8 leading-relaxed"
              >
                Будьте в курсе жизни вашего ребёнка в колледже: питание, воспитание, безопасность и всё, что важно знать родителям
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Link to="/roditelyam/klassnye-rukovoditeli" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-amber-800 font-bold rounded-xl hover:bg-amber-50 transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  Связаться с куратором
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link to="/roditelyam/obyavleniya" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                  Объявления
                </Link>
              </motion.div>
            </div>

            {/* Правая колонка — контакт-карточка */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-8">
                <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                  <span className="text-2xl"><IconClipboardText className="inline w-5 h-5 align-text-bottom" /></span>
                  Полезная информация
                </h3>
                
                <div className="space-y-4 mb-6">
                  {contacts.map((c, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                      <c.Icon className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="text-amber-300/70 text-xs font-semibold uppercase tracking-wider">{c.label}</p>
                        <p className="text-white font-semibold text-sm">{c.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                  {[
                    { val: '95%', label: 'Трудоустройство' },
                    { val: '120', label: 'Мест в столовой' },
                    { val: '24/7', label: 'Охрана' },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <p className="text-amber-300 font-extrabold text-xl">{s.val}</p>
                      <p className="text-white/40 text-[10px] mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== ВАЖНЫЕ ТЕМЫ — ВЫДЕЛЕННЫЕ КАРТОЧКИ ==================== */}
      <section className="py-16 bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-3">
              Наиболее важное
            </span>
            <h2 className="text-3xl font-extrabold text-official">Обратите внимание</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { Icon: IconChefHat, title: 'Питание', desc: 'Столовая работает ежедневно. Горячее питание, комплексные обеды по доступным ценам', path: '/roditelyam/pitanie-i-zdorovye', gradient: 'from-orange-500 to-amber-500' },
              { Icon: IconBuildingHospital, title: 'Медкабинет', desc: 'Медицинский кабинет работает в учебные дни. Помощь и консультации', path: '/roditelyam/pitanie-i-zdorovye', gradient: 'from-rose-500 to-pink-500' },
              { Icon: IconClipboardText, title: 'Собрания', desc: 'График родительских собраний на весь учебный год', path: '/roditelyam/obyavleniya', gradient: 'from-amber-500 to-yellow-500' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={item.path} className="group block bg-white rounded-2xl border-2 border-amber-100 hover:border-amber-300 p-6 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <item.Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-official mb-2 group-hover:text-amber-700 transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ВСЕ РАЗДЕЛЫ — ДВУХКОЛОНОЧНАЯ СЕТКА ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold tracking-wider uppercase mb-3">
              Все разделы
            </span>
            <h2 className="text-3xl font-extrabold text-official">Полная информация</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {sections.map((item, idx) => (
              <motion.div 
                key={item.path}
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.04 }}
              >
                <Link to={item.path} className="group flex items-start gap-5 bg-white border border-gray-100 rounded-2xl p-6 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-200 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                    <item.Icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-official text-base group-hover:text-amber-700 transition-colors">{item.title}</h3>
                      {item.featured && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase">Важно</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ФОТО — ТЁПЛАЯ ГАЛЕРЕЯ ==================== */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-3">
              Жизнь колледжа
            </span>
            <h2 className="text-3xl font-extrabold text-official">Ваш ребёнок в надёжных руках</h2>
          </motion.div>

          {/* Асимметричная сетка: 1 высокая + 2 маленьких */}
          <div className="grid md:grid-cols-3 gap-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:row-span-2 rounded-2xl overflow-hidden shadow-xl group">
              <div className="relative h-full min-h-[320px]">
                <img src={img('/images/polcol/041_AVG_9475.jpg')} alt="Учебный процесс" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg">Учебный процесс</p>
                  <p className="text-amber-200/70 text-sm">Качественное образование на современном оборудовании</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl overflow-hidden shadow-xl group">
              <div className="relative h-48">
                <img src={img('/images/polcol/042_AVG_9472.jpg')} alt="Волонтёрство" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm">Социальная активность</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="rounded-2xl overflow-hidden shadow-xl group">
              <div className="relative h-48">
                <img src={img('/images/polcol/034_college2.jpg')} alt="Кампус" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm">Безопасная среда</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-2 rounded-2xl overflow-hidden shadow-xl group">
              <div className="relative h-56">
                <img src={img('/images/polcol/074_j4S9Qv_USrQ.jpg')} alt="Здание колледжа" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg">Наш дом</p>
                  <p className="text-amber-200/70 text-sm">Комфортные условия обучения и проживания</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CTA — КОНТАКТНЫЙ БЛОК ==================== */}
      <section className="py-20 bg-gradient-to-br from-amber-800 via-orange-700 to-rose-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Есть вопросы?</h2>
            <p className="text-amber-200/60 text-lg mb-8 max-w-xl mx-auto">
              Свяжитесь с классным руководителем или отделом воспитательной работы — мы всегда готовы помочь
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/roditelyam/klassnye-rukovoditeli" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-800 font-bold rounded-xl hover:bg-amber-50 transition-all hover:-translate-y-0.5 hover:shadow-xl text-lg">
                Классные руководители
              </Link>
              <Link to="/contacts" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                Контакты колледжа
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}