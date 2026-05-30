import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IconArrowLeft, IconCalendar, IconTag } from '@tabler/icons-react'

const fallbackNews = [
  { 
    _id: '1',
    date: '15 мая 2026', 
    title: 'День открытых дверей 2026: программа и нововведения', 
    tag: 'Мероприятие', 
    desc: '20 апреля во Владимирском политехническом колледже пройдёт День открытых дверей. Абитуриентов и родителей ждут экскурсии по ИТ-мастерским, мастер-классы по робототехнике и программированию, встреча с директором.',
    content: `20 апреля во Владимирском политехническом колледже пройдёт День открытых дверей. Абитуриентов и родителей ждут экскурсии по ИТ-мастерским, мастер-классы по робототехнике и программированию, встреча с директором.

Программа мероприятия:
• Торжественное открытие в актовом зале
• Экскурсия по учебным корпусам и лабораториям
• Мастер-классы от преподавателей и студентов
• Презентация специальностей колледжа
• Консультации по поступлению
• Выдача информационных материалов и буклетов

Приходите всей семьёй! Будет интересно и познавательно.`
  },
  { 
    _id: '2',
    date: '10 мая 2026', 
    title: 'Победа студентов в региональном чемпионате «Профессионалы»', 
    tag: 'Достижение', 
    desc: 'Команда ВПК заняла 8 призовых мест в региональном этапе чемпионата «Профессионалы».',
    content: `Команда Владимирского политехнического колледжа блестяще выступила в региональном этапе чемпионата «Профессионалы» (WorldSkills Russia), завоевав 8 призовых мест в различных компетенциях.

Результаты наших студентов:
• «Программирование на Python» — 1 место
• «Сетевое и системное администрирование» — 1 место
• «Веб-технологии» — 2 место
• «ЧПУ-фрезерование» — 2 место
• «Робототехника» — 3 место

Поздравляем победителей и их наставников с блестящим результатом! Финал чемпионата состоится весной следующего года.`
  },
  { 
    _id: '3',
    date: '5 мая 2026', 
    title: 'IT-Куб: летние интенсивные программы для школьников', 
    tag: 'Анонс', 
    desc: 'Центр цифрового образования «IT-Куб» открывает набор на летние интенсивы.',
    content: `Центр цифрового образования «IT-Куб» при Владимирском политехническом колледже открывает набор на летние интенсивные программы для школьников 7-11 классов.

Направления программ:
• Веб-разработка для начинающих
• Основы программирования на Python
• Робототехника и Arduino
• Графический дизайн и мультипликация
• Кибербезопасность
• 3D-моделирование

Продолжительность: 2 недели (июнь-июль)
Стоимость: бесплатно
Количество мест ограничено

Запись по телефону: +7 (4922) 66-65-13`
  },
  { 
    _id: '4',
    date: '28 апреля 2026', 
    title: 'Хакатон по веб-разработке: итоги и проекты', 
    tag: 'Событие', 
    desc: 'Ежегодный хакатон собрал 12 команд студентов колледжа.',
    content: `Ежегодный хакатон по веб-разработке прошёл в Владимирском политехническом колледже. В соревновании приняли участие 12 команд из числа студентов колледжа.

Темы проектов:
• Образовательная платформа для изучения иностранных языков
• Сервис для бронирования учебных аудиторий
• Мобильное приложение для расписания колледжа
• Платформа для организации волонтёрских акций

Победители получили ценные призы от партнёров колледжа и приглашение на стажировку в IT-компании.`
  },
  { 
    _id: '5',
    date: '20 апреля 2026', 
    title: 'Встреча с представителями IT-компаний', 
    tag: 'Мероприятие', 
    desc: 'Студенты выпускных курсов встретились с представителями 15 IT-компаний.',
    content: `В колледже прошла встреча студентов выпускных курсов с представителями 15 IT-компаний региона. Мероприятие было организовано центром карьеры колледжа.

Компании-участники:
• Ведущие IT-компании Владимира и области
• Государственные предприятия в сфере информационных технологий
• Малый и средний бизнес в IT-сфере

Студенты получили информацию о стажировках, вакансиях и требованиях работодателей. Многие уже договорились о прохождении производственной практики.`
  },
  { 
    _id: '6',
    date: '15 апреля 2026', 
    title: 'Экскурсия на Владимирский тракторный завод', 
    tag: 'Практика', 
    desc: 'Студенты специальности «Технология машиностроения» посетили ВТЗ.',
    content: `Студенты специальности «Технология машиностроения» посетили Владимирский тракторный завод (ВТЗ) — одно из крупнейших машиностроительных предприятий региона.

В ходе экскурсии студенты познакомились с:
• Современным станочным парком с ЧПУ
• Линией сборки тракторов
• Лабораторией контроля качества
• Цехом металлоконструкций

Экскурсия помогла студентам увидеть, как применяются на практике знания, полученные в колледже.`
  },
  { 
    _id: '7',
    date: '10 апреля 2026', 
    title: 'Студенческая научно-практическая конференция', 
    tag: 'Наука', 
    desc: 'В колледже прошла ежегодная конференция.',
    content: `В колледже прошла ежегодная студенческая научно-практическая конференция «Актуальные вопросы современной науки и техники».

В работе конференции приняли участие более 50 студентов из различных специальностей. Были представлены доклады по направлениям:
• Информационные технологии и программирование
• Машиностроение и автоматизация
• Экономика и управление
• Энергетика и электротехника

Лучшие доклады будут рекомендованы к публикации в сборнике научных работ колледжа.`
  },
  { 
    _id: '8',
    date: '5 апреля 2026', 
    title: 'Волонтёрская акция «Весенняя неделя добра»', 
    tag: 'Волонтёрство', 
    desc: 'Студенты-волонтёры ВПК провели уборку территории парка.',
    content: `Студенты-волонтёры Владимирского политехнического колледжа провели ежегодную весеннюю волонтёрскую акцию «Весенняя неделя добра».

В рамках акции было организовано:
• Уборка и благоустройство территории городского парка
• Покраска скамеек и ограждений
• Высадка молодых деревьев и цветов
• Установка новых информационных табличек

В акции приняли участие более 80 студентов из различных групп. Акция проводится уже в 5-й раз и стала доброй традицией колледжа.`
  },
]

export default function NewsDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    
    // Try fetching from API first
    fetch(`/api/news/${id}`)
      .then((res) => {
        if (cancelled) return null
        return res.ok ? res.json() : null
      })
      .then((data) => {
        if (cancelled) return
        if (data && data.title) {
          setArticle({
            _id: data._id,
            title: data.title,
            desc: data.excerpt || data.content?.slice(0, 200) || '',
            tag: Array.isArray(data.tags) ? data.tags[0] : data.tag || 'Новость',
            date: data.createdAt ? new Date(data.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
            content: data.content || data.body || data.excerpt || '',
          })
        } else {
          // Fallback to static data
          const found = fallbackNews.find((n) => n._id === id)
          if (found) setArticle(found)
        }
      })
      .catch(() => {
        if (cancelled) return
        const found = fallbackNews.find((n) => n._id === id)
        if (found) setArticle(found)
      })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Статья не найдена</p>
        <Link to="/news" className="text-accent-dark font-semibold hover:underline">
          ← Вернуться к новостям
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-official-900 via-official-800 to-official-900">
          <div className="absolute inset-0 official-pattern opacity-50" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/news" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 text-sm">
              <IconArrowLeft className="w-4 h-4" />
              Все новости
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold flex items-center gap-1.5">
                <IconTag className="w-3 h-3" />
                {article.tag}
              </span>
              <span className="text-white/50 text-xs flex items-center gap-1.5">
                <IconCalendar className="w-3 h-3" />
                {article.date}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {article.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {article.content.split('\n').filter(Boolean).map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-4 text-base">
                {paragraph}
              </p>
            ))}
          </motion.article>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gray-100"
          >
            <Link 
              to="/news" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-official-50 text-official font-semibold rounded-xl hover:bg-official-100 transition-all text-sm border border-official-100 hover:-translate-y-0.5"
            >
              <IconArrowLeft className="w-4 h-4" />
              Вернуться к новостям
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}