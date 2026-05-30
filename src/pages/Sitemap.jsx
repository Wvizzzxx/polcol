import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  IconSchool, IconUsers, IconHome, IconBuilding, IconNews, 
  IconPhone, IconClipboardText, IconBook2, IconTarget, IconGlobe,
  IconFileText, IconHeartHandshake, IconCoin, IconChartBar, 
  IconSpeakerphone, IconUser, IconTool, IconFolder, IconCompass,
  IconDoor, IconCalendar, IconCode, IconBriefcase
} from '@tabler/icons-react'

const sections = [
  {
    title: 'Главная',
    links: [
      { label: 'Главная страница', path: '/', icon: IconHome },
      { label: 'О колледже', path: '/about', icon: IconBuilding },
      { label: 'Контакты', path: '/contacts', icon: IconPhone },
      { label: 'Новости', path: '/news', icon: IconNews },
    ]
  },
  {
    title: 'Абитуриентам',
    links: [
      { label: 'Абитуриентам', path: '/abiturientam', icon: IconSchool },
      { label: 'Приёмная комиссия', path: '/abiturientam/priemnaya-komissiya', icon: IconClipboardText },
      { label: 'Специальности', path: '/abiturientam/spetsialnosti', icon: IconTarget },
      { label: 'День открытых дверей', path: '/abiturientam/den-otkrytykh-dverej', icon: IconDoor },
      { label: 'Общежитие', path: '/abiturientam/obshhezhitie-dlya-inogorodnikh-studentov', icon: IconHome },
      { label: 'Профориентация', path: '/abiturientam/proforientatsiya', icon: IconCompass },
      { label: 'Объявления', path: '/abiturientam/obyavleniya', icon: IconSpeakerphone },
    ]
  },
  {
    title: 'Студентам',
    links: [
      { label: 'Студентам', path: '/studentam', icon: IconUsers },
      { label: 'Расписание занятий', path: '/studentam/raspisanie-zanyatij', icon: IconCalendar },
      { label: 'Расписание звонков', path: '/studentam/raspisanie-zvonkov', icon: IconCalendar },
      { label: 'Документы', path: '/studentam/dokumenty', icon: IconFileText },
      { label: 'Практика', path: '/studentam/praktika', icon: IconTool },
      { label: 'Студенческая жизнь', path: '/studentam/studencheskaya-zhizn', icon: IconSchool },
      { label: 'Трудоустройство', path: '/studentam/trudoustrojstvo-vypusknikov', icon: IconBriefcase },
      { label: 'Олимпиады и конкурсы', path: '/studentam/olimpiady-i-konkursy', icon: IconTarget },
    ]
  },
  {
    title: 'Родителям',
    links: [
      { label: 'Родителям', path: '/roditelyam', icon: IconUsers },
      { label: 'Питание и здоровье', path: '/roditelyam/pitanie-i-zdorovye', icon: IconHeartHandshake },
      { label: 'Документы', path: '/roditelyam/dokumenty', icon: IconFileText },
    ]
  },
  {
    title: 'Сотрудникам',
    links: [
      { label: 'Сотрудникам', path: '/sotrudnikam', icon: IconUser },
      { label: 'Аттестации', path: '/sotrudnikam/attestatsii', icon: IconClipboardText },
      { label: 'Методические материалы', path: '/sotrudnikam/metodicheskie-materialy', icon: IconBook2 },
      { label: 'Документы', path: '/sotrudnikam/dokumenty', icon: IconFileText },
    ]
  },
  {
    title: 'Сведения об ОО',
    links: [
      { label: 'Сведения об ОО', path: '/sveden', icon: IconBuilding },
      { label: 'Основные сведения', path: '/sveden/common', icon: IconFileText },
      { label: 'Структура', path: '/sveden/struct', icon: IconFolder },
      { label: 'Документы', path: '/sveden/document', icon: IconFileText },
      { label: 'Образование', path: '/sveden/education', icon: IconSchool },
      { label: 'ФГОС', path: '/sveden/eduStandarts', icon: IconBook2 },
      { label: 'Руководство', path: '/sveden/managers', icon: IconUser },
      { label: 'Педагоги', path: '/sveden/employees', icon: IconUsers },
      { label: 'Стипендии', path: '/sveden/grants', icon: IconCoin },
      { label: 'Платные услуги', path: '/sveden/paid_edu', icon: IconCoin },
      { label: 'Бюджет', path: '/sveden/budget', icon: IconChartBar },
      { label: 'Вакансии', path: '/sveden/vacant', icon: IconSpeakerphone },
      { label: 'Сотрудничество', path: '/sveden/cooperation', icon: IconGlobe },
      { label: 'Питание', path: '/sveden/food', icon: IconHome },
    ]
  },
  {
    title: 'IT-Куб',
    links: [
      { label: 'IT-Куб', path: '/it-cube', icon: IconCode },
      { label: 'О центре', path: '/it-cube/o-tsentre', icon: IconBuilding },
      { label: 'Направления', path: '/it-cube/napravleniya-i-programmy', icon: IconTarget },
      { label: 'Педагоги', path: '/it-cube/pedagogi', icon: IconUsers },
      { label: 'Расписание', path: '/it-cube/raspisanie', icon: IconCalendar },
    ]
  },
  {
    title: 'Прочее',
    links: [
      { label: 'Калькулятор', path: '/calculator', icon: IconChartBar },
      { label: 'Образовательное кредитование', path: '/obrazovatelnoe-kreditovanie', icon: IconCoin },
      { label: 'Вопросы и ответы', path: '/faq', icon: IconGlobe },
    ]
  },
]

export default function Sitemap() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-official-900 via-official-800 to-official-900">
          <div className="absolute inset-0 official-pattern opacity-50" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Карта сайта
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            Полный перечень разделов и страниц сайта колледжа
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.05 }}
              >
                <h2 className="text-lg font-bold text-official mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-accent" />
                  {section.title}
                </h2>
                <ul className="space-y-1.5">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link 
                        to={link.path}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:text-accent-dark hover:bg-gray-50 transition-all text-sm"
                      >
                        <link.icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

