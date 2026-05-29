import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IconSchool, IconArrowRight, IconUsers, IconCoin, IconClock } from '@tabler/icons-react'
import SpecialtyCard3D from '../components/SpecialtyCard3D'

const ALL_SPECIALTIES = [
  { code: '09.02.07', name: 'Информационные системы и программирование', minScore: 4.5, budget: 30, paid: 10 },
  { code: '09.02.06', name: 'Сетевое и системное администрирование', minScore: 4.3, budget: 25, paid: 10 },
  { code: '09.02.05', name: 'Прикладная информатика', minScore: 4.3, budget: 25, paid: 10 },
  { code: '15.02.08', name: 'Технология машиностроения', minScore: 4.0, budget: 20, paid: 10 },
  { code: '15.02.10', name: 'Мехатроника и мобильная робототехника', minScore: 4.2, budget: 20, paid: 10 },
  { code: '38.02.01', name: 'Экономика и бухгалтерский учёт', minScore: 4.0, budget: 25, paid: 10 },
  { code: '09.02.02', name: 'Компьютерные системы и комплексы', minScore: 4.0, budget: 20, paid: 10 },
  { code: '08.02.01', name: 'Строительство и эксплуатация зданий и сооружений', minScore: 3.7, budget: 15, paid: 5 },
  { code: '10.02.04', name: 'Электрооборудование', minScore: 3.7, budget: 15, paid: 5 },
  { code: '23.02.03', name: 'Монтаж и эксплуатация внутренних систем', minScore: 3.7, budget: 15, paid: 5 },
  { code: '19.02.09', name: 'Гостиничный бизнес', minScore: 3.5, budget: 15, paid: 10 },
  { code: '43.02.10', name: 'Гостеприимство', minScore: 3.5, budget: 10, paid: 10 },
]

export default function Specialties() {
  return (
    <div>
      {/* HERO */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-official-900 via-official-800 to-official-900">
        <div className="absolute inset-0 official-pattern opacity-30" />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex justify-center mb-6">
            <IconSchool className="w-16 h-16 text-white drop-shadow" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <span className="badge-accent inline-block">Направления обучения</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Специальности колледжа
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto">
            Выберите направление обучения. Нажмите на карточку, чтобы узнать подробности о специальности
          </motion.p>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { Icon: IconSchool, val: '12', label: 'Специальностей', color: 'text-blue-500' },
              { Icon: IconUsers, val: '250+', label: 'Бюджетных мест', color: 'text-emerald-500' },
              { Icon: IconCoin, val: '90+', label: 'Платных мест', color: 'text-amber-500' },
              { Icon: IconClock, val: '2-5 лет', label: 'Срок обучения', color: 'text-violet-500' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <s.Icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
                <p className="font-extrabold text-2xl text-official">{s.val}</p>
                <p className="text-gray-400 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALTIES GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-dark text-xs font-semibold tracking-wider uppercase mb-3">
              Все специальности
            </span>
            <h2 className="text-3xl font-extrabold text-official">Нажмите на карточку для подробностей</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_SPECIALTIES.map((spec, idx) => (
              <SpecialtyCard3D 
                key={spec.code} 
                specialty={spec} 
                index={idx} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-official-900 via-official-800 to-official-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-extrabold mb-3">Определились со специальностью?</h2>
            <p className="text-white/60 mb-8">Рассчитайте свои шансы с помощью калькулятора или подайте документы</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/calculator" className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-bold rounded-xl hover:bg-accent-dark transition-all">
                Калькулятор поступления
                <IconArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/abiturientam/priemnaya-komissiya" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                Подать документы
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}