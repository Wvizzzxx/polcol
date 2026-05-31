import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageContents, fallbackContent } from '../data/pagesContent'
import { renderIcon } from '../utils/iconMap'

// Уникальные цветовые схемы для каждого раздела
const sectionThemes = {
  sveden: {
    heroStyle: 'from-[#0f172a] via-[#1e293b] to-[#0f172a]',
    heroBgPattern: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
    heroBgSize: '40px 40px',
    badge: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
    dot: 'bg-blue-400',
    accent: 'blue',
    accentBar: 'bg-blue-500',
    accentText: 'text-blue-600',
    accentBg: 'bg-blue-50',
    accentBorder: 'border-blue-100',
    iconColor: 'text-blue-600',
    cardBorder: 'hover:border-blue-200',
    divider: 'from-blue-500 to-blue-600',
  },
  abiturientam: {
    heroStyle: 'from-emerald-950 via-teal-900 to-cyan-950',
    heroBgPattern: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
    heroBgSize: '32px 32px',
    badge: 'bg-emerald-500/15 border-emerald-500/25 text-emerald-300',
    dot: 'bg-emerald-400',
    accent: 'emerald',
    accentBar: 'bg-emerald-500',
    accentText: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-100',
    iconColor: 'text-emerald-600',
    heroIconBg: 'bg-emerald-600 border-emerald-500',
    cardBorder: 'hover:border-emerald-200',
    divider: 'from-emerald-500 to-teal-500',
  },
  studentam: {
    heroStyle: 'from-teal-900 via-emerald-800 to-green-900',
    heroBgPattern: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
    heroBgSize: '60px 60px',
    badge: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
    dot: 'bg-emerald-400',
    accent: 'teal',
    accentBar: 'bg-teal-500',
    accentText: 'text-teal-600',
    accentBg: 'bg-teal-50',
    accentBorder: 'border-teal-100',
    iconColor: 'text-teal-600',
    cardBorder: 'hover:border-teal-200',
    divider: 'from-teal-500 to-emerald-500',
  },
  roditelyam: {
    heroStyle: 'from-amber-800 via-orange-700 to-rose-800',
    heroBgPattern: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0)',
    heroBgSize: '24px 24px',
    badge: 'bg-amber-500/20 border-amber-400/30 text-amber-200',
    dot: 'bg-amber-400',
    accent: 'amber',
    accentBar: 'bg-amber-500',
    accentText: 'text-amber-600',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-100',
    iconColor: 'text-amber-600',
    cardBorder: 'hover:border-amber-200',
    divider: 'from-amber-500 to-orange-500',
  },
  sotrudnikam: {
    heroStyle: 'from-slate-900 via-indigo-900 to-violet-950',
    heroBgPattern: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.07) 30px, rgba(255,255,255,0.07) 31px)',
    heroBgSize: null,
    badge: 'bg-indigo-500/15 border-indigo-500/25 text-indigo-300',
    dot: 'bg-indigo-400',
    accent: 'indigo',
    accentBar: 'bg-indigo-500',
    accentText: 'text-indigo-600',
    accentBg: 'bg-indigo-50',
    accentBorder: 'border-indigo-100',
    iconColor: 'text-indigo-600',
    cardBorder: 'hover:border-indigo-200',
    divider: 'from-indigo-500 to-violet-500',
  },
  itCube: {
    heroStyle: 'from-[#0a0e27] via-[#0f1629] to-[#0a0e27]',
    heroBgPattern: 'radial-gradient(circle at 1px 1px, rgba(0,255,136,0.12) 1px, transparent 0)',
    heroBgSize: '24px 24px',
    badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    dot: 'bg-emerald-400',
    accent: 'emerald',
    accentBar: 'bg-emerald-500',
    accentText: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-100',
    iconColor: 'text-emerald-600',
    cardBorder: 'hover:border-emerald-200',
    divider: 'from-emerald-500 to-cyan-500',
  },
  default: {
    heroStyle: 'from-official-900 via-official-800 to-official-900',
    heroBgPattern: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
    heroBgSize: '40px 40px',
    badge: 'bg-accent-50 border-accent-100 text-accent-dark',
    dot: 'bg-accent',
    accent: 'blue',
    accentBar: 'bg-accent',
    accentText: 'text-accent-dark',
    accentBg: 'bg-accent-50',
    accentBorder: 'border-accent-100',
    iconColor: 'text-accent-dark',
    cardBorder: 'hover:border-accent/30',
    divider: 'from-accent to-accent-dark',
  },
}

function getTheme(path) {
  if (path.startsWith('/sveden')) return sectionThemes.sveden
  if (path.startsWith('/abiturientam') || path.startsWith('/obrazovatelnoe-kreditovanie') || path.startsWith('/postuplenie')) return sectionThemes.abiturientam
  if (path.startsWith('/studentam')) return sectionThemes.studentam
  if (path.startsWith('/roditelyam')) return sectionThemes.roditelyam
  if (path.startsWith('/sotrudnikam') || path.startsWith('/vnutrennyaya-sistema-otsenki-kachestva')) return sectionThemes.sotrudnikam
  if (path.startsWith('/it-cube')) return sectionThemes.itCube
  if (path.startsWith('/o-kolledzhe')) return sectionThemes.sveden
  return sectionThemes.default
}

export default function SubPage() {
  const location = useLocation()
  const path = location.pathname
  const theme = getTheme(path)

  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const encodedPath = encodeURIComponent(path)
    const staticData = pageContents[path]
    
    // If we have static data with icons, use it as primary source
    // API data is used only to supplement content (text, items, etc.)
    if (staticData) {
      setContent(staticData)
      setLoading(false)
      return () => { cancelled = true }
    }
    
    fetch(`/api/pages/by-path?path=${encodedPath}`)
      .then((res) => {
        if (cancelled) return null
        return res.ok ? res.json() : null
      })
      .then((data) => {
        if (cancelled) return
        if (data && data.sections && data.sections.length > 0) {
          setContent(data)
        } else {
          setContent(fallbackContent)
        }
      })
      .catch(() => {
        if (!cancelled) setContent(fallbackContent)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [path])

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const { title, subtitle, badge, hero, sections } = content

  const pathParts = path.split('/').filter(Boolean)
  
  const breadcrumbLabels = {
    'sveden': 'Сведения об ОО',
    'abiturientam': 'Абитуриентам',
    'studentam': 'Студентам',
    'roditelyam': 'Родителям',
    'sotrudnikam': 'Сотрудникам',
    'it-cube': 'IT-Куб',
    'news': 'Новости',
    'contacts': 'Контакты',
    'about': 'О колледже',
    'calculator': 'Калькулятор',
    'specialties': 'Специальности',
    'priemnaya-komissiya': 'Приёмная комиссия',
    'den-otkrytykh-dverej': 'День открытых дверей',
    'spetsialnosti': 'Специальности',
    'obshhezhitie-dlya-inogorodnikh-studentov': 'Общежитие',
    'proforientatsiya': 'Профориентация',
    'test-na-professionalnoe-samoopredelenie': 'Тест на профсамоопределение',
    'obyavleniya': 'Объявления',
    'napravleniya-obucheniya': 'Направления обучения',
    'spisok-postupleniya': 'Список поступления',
    'o-kolledzhe': 'О колледже',
    'raspisanie-zanyatij': 'Расписание занятий',
    'raspisanie-zvonkov': 'Расписание звонков',
    'dokumenty': 'Документы',
    'promezhutochnaya-i-itogovaya-attestatsiya': 'Аттестация',
    'praktika': 'Практика',
    'studencheskaya-zhizn': 'Студенческая жизнь',
    'studencheskiy-sovet': 'Студенческий совет',
    'trudoustrojstvo-vypusknikov': 'Трудоустройство выпускников',
    'metodicheskie-materialy': 'Методические материалы',
    'olimpiady-i-konkursy': 'Олимпиады и конкурсы',
    'volonterskoe-dvizhenie': 'Волонтёрское движение',
    'tsentr-karery': 'Центр карьеры',
    'zaochnoe-obuchenie': 'Заочное обучение',
    'chempionatnoe-dvizhenie': 'Чемпионатное движение',
    'pitanie-i-zdorovye': 'Питание и здоровье',
    'vospitatelynaya-rabota': 'Воспитательная работа',
    'klassnye-rukovoditeli': 'Классные руководители',
    'meropriyatiya': 'Мероприятия',
    'den-otkrytykh-dverey': 'День открытых дверей',
    'attestatsii': 'Аттестации',
    'konkurs-master-goda': 'Конкурс «Мастер года»',
    'muzey': 'Музей',
    'peredovye-pedagogicheskie-tekhnologii': 'Передовые технологии',
    'obuchenie-sotrudnikov': 'Обучение сотрудников',
    'vnutrennyaya-sistema-otsenki-kachestva-obrazovaniya': 'Внутренняя система оценки',
    'o-tsentre': 'О центре',
    'novosti': 'Новости',
    'napravleniya-i-programmy': 'Направления и программы',
    'pedagogi': 'Педагоги',
    'raspisanie': 'Расписание',
    'kontakty': 'Контакты',
    'common': 'Общие сведения',
    'struct': 'Структура',
    'education': 'Образование',
    'eduStandarts': 'ФГОС',
    'managers': 'Руководство',
    'employees': 'Сотрудники',
    'dsreda': 'Образовательная среда',
    'grants': 'Стипендии',
    'paid_edu': 'Платные услуги',
    'budget': 'Бюджет',
    'vacant': 'Вакансии',
    'cooperation': 'Сотрудничество',
    'food': 'Питание',
    'legMap': 'Карта',
    'dostizheniya': 'Достижения',
    'foto-i-videomaterialy': 'Фото и видео',
    'sotrudnichestvo': 'Сотрудничество',
    'document': 'Документы',
  }

  const breadcrumbs = pathParts.map((part, i) => ({
    label: breadcrumbLabels[part] || part.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    path: '/' + pathParts.slice(0, i + 1).join('/'),
  }))

  return (
    <div>
      <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden w-full">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.heroStyle}`}>
          {theme.heroBgPattern && (
            <div className="absolute inset-0" style={{ backgroundImage: theme.heroBgPattern, backgroundSize: theme.heroBgSize || '40px 40px' }} />
          )}
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
            {hero && (
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex-shrink-0">
                {renderIcon(hero, 'w-16 h-16 text-white drop-shadow')}
              </motion.div>
            )}
            <div className="flex-1">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className={`inline-flex items-center gap-2 font-semibold tracking-wider uppercase text-sm mb-3 ${theme.badge} px-4 py-1.5 rounded-full border`}>
                  <span className={`w-2 h-2 rounded-full ${theme.dot} animate-pulse`} />
                  {badge || 'Информация'}
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 break-words">
                {title}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`text-base text-white/60 max-w-3xl`}>
                {subtitle}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li><Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">Главная</Link></li>
              {breadcrumbs.map((bc, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-gray-300">/</span>
                  {i < breadcrumbs.length - 1 ? (
                    <Link to={bc.path} className="text-gray-400 hover:text-gray-600 transition-colors">{bc.label}</Link>
                  ) : (
                    <span className="text-official font-medium">{bc.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-5xl mx-auto space-y-10">
            {sections.map((section, idx) => (
              <SectionBlock key={idx} section={section} idx={idx} theme={theme} sectionCount={sections.length} heroIcon={hero} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <Link to="/" className={`inline-flex items-center gap-2 px-6 py-3 ${theme.accentBg} ${theme.accentText} font-semibold rounded-xl hover:opacity-80 transition-all text-sm border ${theme.accentBorder} hover:-translate-y-0.5 hover:shadow-md`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              На главную
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function SectionBlock({ section, idx, theme, sectionCount, heroIcon }) {
  const { type, title, content, items, image, images, icon } = section

  // FALLBACK: если у секции нет своей icon, используем heroIcon страницы
  const sectionIcon = icon || heroIcon || null

  const renderSectionTitle = (titleText, titleIcon, size = 'default') => {
    if (!titleText) return null
    const iconSize = size === 'large' ? 'w-12 h-12' : 'w-10 h-10'
    const imgSize = size === 'large' ? 'w-6 h-6' : 'w-5 h-5'
    return (
      <div className="flex items-center gap-3 mb-4">
        {titleIcon ? (
          <span className="flex-shrink-0">
            {renderIcon(titleIcon, `${imgSize} ${theme.iconColor}`)}
          </span>
        ) : (
          <span className={`w-1 h-6 rounded-full ${theme.accentBar}`} />
        )}
        <h2 className={`font-bold text-official ${size === 'large' ? 'text-xl' : 'text-lg'}`}>{titleText}</h2>
      </div>
    )
  }

  const isEven = idx % 2 === 0

  if (type === 'text') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.05 }}
      >
        <div className={`rounded-2xl ${isEven ? 'bg-white border border-gray-100' : `${theme.accentBg} border ${theme.accentBorder}`} overflow-hidden`}>
          {image ? (
            <div className="md:flex items-stretch">
              <div className="md:w-1/3 lg:w-2/5 flex-shrink-0">
                <img src={image} alt={title || ''} className="w-full h-48 md:h-full object-cover" />
              </div>
              <div className="p-6 md:p-8 flex-1">
                {renderSectionTitle(title, sectionIcon, 'large')}
                <div className="text-gray-600 leading-relaxed text-sm space-y-3">
                  {content.split('\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 md:p-8">
              {renderSectionTitle(title, sectionIcon, 'large')}
              <div className="text-gray-600 leading-relaxed text-sm space-y-3">
                {content.split('\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  if (type === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.05 }}
      >
        <div className={`rounded-2xl ${theme.accentBg} border ${theme.accentBorder} p-6 md:p-8`}>
          {renderSectionTitle(title, sectionIcon, 'large')}
          <div className="grid md:grid-cols-2 gap-2.5">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-3.5 border border-gray-100 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 group">
                <div className={`w-7 h-7 rounded-lg ${theme.accentBg} border ${theme.accentBorder} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <svg className={`w-3.5 h-3.5 ${theme.accentText}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm flex-1 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
          {images && images.length > 0 && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
              {images.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden h-36 shadow-sm">
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  if (type === 'info') {
    const isLarge = items.length > 4
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.05 }}
      >
        <div className="rounded-2xl bg-white border border-gray-100 p-6 md:p-8 shadow-sm">
          {renderSectionTitle(title, sectionIcon, 'large')}
          <div className={`grid ${isLarge ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-3`}>
            {items.map((item, i) => (
              <div key={i} className={`p-4 rounded-xl border transition-all duration-200 ${theme.accentBg} ${theme.accentBorder} hover:shadow-md hover:-translate-y-0.5`}>
                <p className={`text-xs font-bold ${theme.accentText} uppercase tracking-wider mb-1`}>{item.label}</p>
                <p className="text-official font-semibold text-sm leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  if (type === 'cards') {
    const cardCount = items?.length || 0
    const colsClass = cardCount >= 6 ? 'md:grid-cols-3' : 'md:grid-cols-2'

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.05 }}
      >
        <div className={`rounded-2xl ${isEven ? 'bg-white border border-gray-100' : 'bg-gradient-to-br from-gray-50 to-white border border-gray-100'} p-6 md:p-8 shadow-sm`}>
          {renderSectionTitle(title, sectionIcon, 'large')}
          <div className={`grid ${colsClass} gap-4`}>
            {items.map((item, i) => {
              const hasIcon = item.Icon || item.icon
              const IconComponent = item.Icon || item.icon
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:-translate-y-1 transition-all duration-200 group hover:shadow-lg"
                >
                  {hasIcon && (
                    <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                      {renderIcon(IconComponent, `w-8 h-8 ${theme.iconColor}`)}
                    </div>
                  )}
                  <h3 className={`font-bold text-official text-sm mb-1.5 group-hover:${theme.accentText} transition-colors`}>{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full transition-all duration-300" />
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    )
  }

  return null
}