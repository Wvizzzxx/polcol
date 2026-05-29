import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconNews } from '@tabler/icons-react'
import { renderIcon } from '../utils/iconMap'

const fallbackNews = [
  { date: '15 мая 2026', title: 'День открытых дверей 2026: программа и нововведения', tag: 'Мероприятие', desc: '20 апреля во Владимирском политехническом колледже пройдёт День открытых дверей. Абитуриентов и родителей ждут экскурсии по ИТ-мастерским, мастер-классы по робототехнике и программированию, встреча с директором.' },
  { date: '10 мая 2026', title: 'Победа студентов в региональном чемпионате «Профессионалы»', tag: 'Достижение', desc: 'Команда ВПК заняла 8 призовых мест в региональном этапе чемпионата «Профессионалы».' },
  { date: '5 мая 2026', title: 'IT-Куб: летние интенсивные программы для школьников', tag: 'Анонс', desc: 'Центр цифрового образования «IT-Куб» открывает набор на летние интенсивы.' },
  { date: '28 апреля 2026', title: 'Хакатон по веб-разработке: итоги и проекты', tag: 'Событие', desc: 'Ежегодный хакатон собрал 12 команд студентов колледжа.' },
  { date: '20 апреля 2026', title: 'Встреча с представителями IT-компаний', tag: 'Мероприятие', desc: 'Студенты выпускных курсов встретились с представителями 15 IT-компаний.' },
  { date: '15 апреля 2026', title: 'Экскурсия на Владимирский тракторный завод', tag: 'Практика', desc: 'Студенты специальности «Технология машиностроения» посетили ВТЗ.' },
  { date: '10 апреля 2026', title: 'Студенческая научно-практическая конференция', tag: 'Наука', desc: 'В колледже прошла ежегодная конференция.' },
  { date: '5 апреля 2026', title: 'Волонтёрская акция «Весенняя неделя добра»', tag: 'Волонтёрство', desc: 'Студенты-волонтёры ВПК провели уборку территории парка.' },
]

const categories = ['Все', 'Мероприятие', 'Достижение', 'Анонс', 'Событие', 'Наука', 'Волонтёрство']

export default function News() {
  const [news, setNews] = useState(fallbackNews)
  const [activeCategory, setActiveCategory] = useState('Все')

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.news || data.items || []
        if (items.length > 0) {
          const mapped = items.map((item) => ({
            _id: item._id,
            title: item.title,
            desc: item.excerpt || item.content?.slice(0, 150) || '',
            tag: Array.isArray(item.tags) ? item.tags[0] : item.tag || 'Новость',
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
          }))
          setNews(mapped)
        }
      })
      .catch(() => { /* используем fallback */ })
  }, [])

  const filtered = activeCategory === 'Все'
    ? news
    : news.filter((item) => item.tag === activeCategory)

  return (
    <div>
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-official-900 via-official-800 to-official-900">
          <div className="absolute inset-0 official-pattern opacity-50" />
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-20 right-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex justify-center mb-6">
              {renderIcon(IconNews, 'w-16 h-16 text-white drop-shadow')}
          </motion.div>
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="badge-accent mb-4 inline-block">Новости</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Новости колледжа
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/70 max-w-2xl mx-auto">
              Актуальные события, достижения, объявления и важная информация из жизни колледжа
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 section-official">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  cat === activeCategory ? 'bg-official text-white' : 'bg-official-50 text-official hover:bg-official-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((item, idx) => (
              <motion.div
                key={item._id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="card-official rounded-xl p-6 hover:border-accent cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="badge-official text-xs">{item.tag}</span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <h3 className="text-base font-bold text-official mb-2 hover:text-accent-dark transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{item.desc}</p>
                <div className="mt-3">
                  <span className="text-accent-dark text-xs font-semibold inline-flex items-center gap-1 transition-all hover:gap-2">
                    Читать далее →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}