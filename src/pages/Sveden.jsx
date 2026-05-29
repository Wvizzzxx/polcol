import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IconBook2, IconBuilding, IconChartBar, IconChefHat, IconCircleCheck, IconClipboardText, IconCoin, IconCreditCard, IconFileText, IconGlobe, IconHeartHandshake, IconMedal, IconReport, IconScale, IconSchool, IconSpeakerphone, IconTool, IconUsers } from '@tabler/icons-react';
import { renderIcon } from '../utils/iconMap'

const sections = [
  { title: 'Основные сведения', path: '/sveden/common', Icon: IconClipboardText, desc: 'Полная информация об образовательной организации' },
  { title: 'Структура и органы управления', path: '/sveden/struct', Icon: IconBuilding, desc: 'Структурные подразделения, органы управления' },
  { title: 'Документы', path: '/sveden/document', Icon: IconFileText, desc: 'Устав, лицензии, свидетельства об аккредитации' },
  { title: 'Образование', path: '/sveden/education', Icon: IconSchool, desc: 'Реализуемые образовательные программы' },
  { title: 'Образовательные стандарты', path: '/sveden/eduStandarts', Icon: IconBook2, desc: 'ФГОС СПО, профессиональные стандарты' },
  { title: 'Руководство', path: '/sveden/managers', Icon: IconUsers, desc: 'Директор, заместители, контакты' },
  { title: 'Педагогический состав', path: '/sveden/employees', Icon: IconSchool, desc: 'Образование, стаж, категории преподавателей' },
  { title: 'Материально-техническое обеспечение', path: '/sveden/dsreda', Icon: IconTool, desc: 'Лаборатории, мастерские, оборудование' },
  { title: 'Стипендии и меры поддержки', path: '/sveden/grants', Icon: IconCoin, desc: 'Виды стипендий, социальная поддержка' },
  { title: 'Платные образовательные услуги', path: '/sveden/paid_edu', Icon: IconCreditCard, desc: 'Стоимость обучения, порядок оплаты' },
  { title: 'Финансово-хозяйственная деятельность', path: '/sveden/budget', Icon: IconChartBar, desc: 'Финансовые отчёты, план ФХД' },
  { title: 'Вакантные места', path: '/sveden/vacant', Icon: IconSpeakerphone, desc: 'Места для приёма и перевода' },
  { title: 'Международное сотрудничество', path: '/sveden/cooperation', Icon: IconGlobe, desc: 'Международная деятельность, партнёры' },
  { title: 'Организация питания', path: '/sveden/food', Icon: IconChefHat, desc: 'Столовая, буфет, меню' },
  { title: 'Законодательная карта', path: '/sveden/legMap', Icon: IconScale, desc: 'Нормативно-правовая база образования' },
]

const importantDocs = [
  { title: 'Устав колледжа', Icon: IconReport, path: '/sveden/document' },
  { title: 'Лицензия', Icon: IconCircleCheck, path: '/sveden/document' },
  { title: 'Аккредитация', Icon: IconMedal, path: '/akkreditatsiya' },
  { title: 'Коллективный договор', Icon: IconHeartHandshake, path: '/sotrudnikam/dokumenty' },
]

export default function Sveden() {
  return (
    <div>
      {/* ==================== HERO — СТРОГИЙ ОФИЦИАЛЬНЫЙ ==================== */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        {/* Сетка */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Герб-стиль декор */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.03]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex justify-center mb-6">
              {renderIcon(IconClipboardText, 'w-16 h-16 text-white drop-shadow')}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-bold tracking-wider uppercase mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Сведения об ОО
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 text-center"
          >
            Сведения об<br/>образовательной организации
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto text-center"
          >
            Полная и достоверная информация в соответствии с требованиями законодательства РФ
          </motion.p>
        </div>
      </section>

      {/* ==================== ВАЖНЫЕ ДОКУМЕНТЫ — ПЛЮС-МИНУС КАРТОЧКИ ==================== */}
      <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {importantDocs.map((doc, idx) => (
            <motion.div 
              key={doc.title}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: idx * 0.08 }}
            >
              <Link to={doc.path} className="group block bg-white rounded-2xl p-5 text-center border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
                <doc.Icon className="w-6 h-6 text-blue-500 mb-2" />
                <h3 className="font-bold text-official text-sm group-hover:text-blue-600 transition-colors">{doc.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==================== ВСЕ РАЗДЕЛЫ — СТРОГАЯ СЕТКА ==================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
              Разделы
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-official">
              Все сведения об организации
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((item, idx) => (
              <motion.div 
                key={item.path}
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.03 }}
              >
                <Link to={item.path} className="group block bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                      <item.Icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-official text-sm mb-1 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ИНФОРМАЦИЯ ДЛЯ ЗАИНТЕРЕСОВАННЫХ СТОРОН ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-blue-300 text-xs font-bold tracking-wider uppercase mb-4">
                  Информация для заинтересованных сторон
                </span>
                <h2 className="text-2xl font-bold mb-4">Прозрачность и открытость</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Колледж обеспечивает доступность информации о своей деятельности 
                  в соответствии с требованиями законодательства. Все необходимые документы 
                  размещены на официальном сайте.
                </p>
                <Link to="/sveden/common" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-800 font-bold rounded-xl hover:bg-gray-100 transition-all">
                  Подробнее
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '15', label: 'Разделов информации', Icon: IconClipboardText },
                  { val: '50+', label: 'Документов', Icon: IconFileText },
                  { val: '12', label: 'Специальностей', Icon: IconSchool },
                  { val: '80+', label: 'Лет истории', Icon: IconBuilding },
                ].map((s, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 text-center">
                    <s.Icon className="w-5 h-5 text-blue-400 mb-1" />
                    <p className="text-white font-extrabold text-xl">{s.val}</p>
                    <p className="text-gray-500 text-[10px] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}