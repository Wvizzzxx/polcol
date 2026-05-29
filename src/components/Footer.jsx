import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  IconClock,
  IconMapPin,
  IconMail,
  IconPhone,
  IconShieldCheck,
  IconLayersIntersect,
  IconBrandVk,
  IconMessageCircle,
  IconBrandTelegram,
  IconWorld
} from '@tabler/icons-react'

const footerLinks = {
  about: [
    { title: 'О колледже', path: '/about' },
    { title: 'Сведения об ОО', path: '/sveden' },
    { title: 'История', path: '/about#history' },
    { title: 'Достижения', path: '/o-kolledzhe/dostizheniya' },
    { title: 'Противодействие коррупции', path: '/pro-corrup' },
    { title: 'Вакансии', path: '/vakansii-kolledzha' },
  ],
  students: [
    { title: 'Расписание занятий', path: '/studentam/raspisanie-zanyatij' },
    { title: 'Расписание звонков', path: '/studentam/raspisanie-zvonkov' },
    { title: 'Практика', path: '/studentam/praktika' },
    { title: 'Студенческая жизнь', path: '/studentam/studencheskaya-zhizn' },
    { title: 'Трудоустройство', path: '/studentam/trudoustrojstvo-vypusknikov' },
    { title: 'Документы', path: '/studentam/dokumenty' },
  ],
  applicants: [
    { title: 'Приемная комиссия', path: '/abiturientam/priemnaya-komissiya' },
    { title: 'Специальности', path: '/abiturientam/spetsialnosti' },
    { title: 'Общежитие', path: '/abiturientam/obshhezhitie-dlya-inogorodnikh-studentov' },
    { title: 'Профориентация', path: '/abiturientam/proforientatsiya' },
    { title: 'День открытых дверей', path: '/abiturientam/den-otkrytykh-dverej' },
    { title: 'Образовательное кредитование', path: '/obrazovatelnoe-kreditovanie' },
  ],
  info: [
    { title: 'Новости', path: '/news' },
    { title: 'Контакты', path: '/contacts' },
    { title: 'Часто задаваемые вопросы', path: '/faq' },
    { title: 'Отзывы', path: '/otzyvy' },
    { title: 'Политика конфиденциальности', path: '/politika-obrabotki-personalnykh-dannykh' },
    { title: 'Карта сайта', path: '/about' },
  ]
}

const fallbackContacts = {
  email: 'adm@polcol.ru',
  phone: '+7 (4922) 66-65-13',
  address: '600025, г. Владимир, Октябрьский пр-т, д. 11',
  workHours: 'Пн-Пт: 8:00 — 17:00, обед 12:00 — 13:00',
  workHoursSaturday: 'Сб: 8:00 — 14:00 (дежурный администратор)',
  phoneCommission: '+7 (4922) 66-65-13',
}

const fallbackSocial = {
  vk: 'https://vk.com/club208009188',
  telegram: 'https://t.me/vladpolitech',
  sferum: 'https://sferum.ru/?p=dashboard&schoolId=217330767',
  ok: 'https://ok.ru/group/61435154727005',
}

export default function Footer() {
  const [contacts, setContacts] = useState(fallbackContacts)
  const [social, setSocial] = useState(fallbackSocial)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    // Загружаем контакты
    fetch('/api/contacts')
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.contacts || data.items || []
        if (items.length > 0) {
          const contactMap = {}
          items.forEach((c) => {
            contactMap[c.type || c.key] = c.value
          })
          setContacts((prev) => ({ ...prev, ...contactMap }))
        }
      })
      .catch(() => { /* используем fallback */ })

    // Загружаем настройки (соцсети, режим работы)
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        const s = data.settings || data.data || data
        if (s) {
          setSettings(s)
          if (s.social) setSocial((prev) => ({ ...prev, ...s.social }))
          if (s.contacts) setContacts((prev) => ({ ...prev, ...s.contacts }))
          if (s.workHours) setContacts((prev) => ({ ...prev, workHours: s.workHours }))
          if (s.workHoursSaturday) setContacts((prev) => ({ ...prev, workHoursSaturday: s.workHoursSaturday }))
        }
      })
      .catch(() => { /* используем fallback */ })
  }, [])

  return (
    <footer className="bg-official-800 text-white relative">
      {/* Decorative top stripe */}
      <div className="h-1 bg-gradient-to-r from-official-800 via-accent to-official-800" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link to="/" className="inline-flex items-center gap-3 group mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center font-bold text-official-dark text-xl shadow-lg group-hover:scale-105 transition-transform">
                ВПК
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-tight">Владимирский</p>
                <p className="text-official-300 text-sm leading-tight font-medium">политехнический колледж</p>
              </div>
            </Link>
            
            <p className="text-official-300 text-sm leading-relaxed mb-6">
              Государственное автономное профессиональное образовательное учреждение 
              Владимирской области
            </p>
            
            {/* Working hours */}
            <div className="space-y-2 mb-6 bg-official-900/40 rounded-xl p-4 border border-official-700/50">
              <h4 className="text-accent-light text-xs font-bold uppercase tracking-wider mb-2">Режим работы</h4>
              <div className="flex items-center gap-2.5 text-official-300 text-sm">
                <IconClock className="w-4 h-4 text-accent flex-shrink-0" />
                <span>{contacts.workHours || 'Пн-Пт: 8:00 — 17:00'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-official-300 text-sm">
                <IconClock className="w-4 h-4 text-accent flex-shrink-0" />
                <span>{contacts.workHoursSaturday || 'Сб: 8:00 — 14:00'}</span>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-accent-light text-xs font-bold uppercase tracking-wider mb-3">Мы в соцсетях</h4>
              <div className="flex gap-2.5">
                {social.vk && (
                  <a href={social.vk} target="_blank" rel="noopener noreferrer" title="VK" className="w-10 h-10 rounded-lg bg-official-700/60 flex items-center justify-center hover:bg-accent hover:text-official-dark transition-all hover:scale-105">
                    <IconBrandVk className="w-5 h-5" />
                  </a>
                )}
                {social.sferum && (
                  <a href={social.sferum} target="_blank" rel="noopener noreferrer" title="Сферум" className="w-10 h-10 rounded-lg bg-official-700/60 flex items-center justify-center hover:bg-accent hover:text-official-dark transition-all hover:scale-105">
                    <IconMessageCircle className="w-5 h-5" />
                  </a>
                )}
                {social.telegram && (
                  <a href={social.telegram} target="_blank" rel="noopener noreferrer" title="Telegram" className="w-10 h-10 rounded-lg bg-official-700/60 flex items-center justify-center hover:bg-accent hover:text-official-dark transition-all hover:scale-105">
                    <IconBrandTelegram className="w-5 h-5" />
                  </a>
                )}
                {social.ok && (
                  <a href={social.ok} target="_blank" rel="noopener noreferrer" title="OK" className="w-10 h-10 rounded-lg bg-official-700/60 flex items-center justify-center hover:bg-accent hover:text-official-dark transition-all hover:scale-105">
                    <IconWorld className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Links Columns */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { title: 'О колледже', links: footerLinks.about },
              { title: 'Студентам', links: footerLinks.students },
              { title: 'Абитуриентам', links: footerLinks.applicants },
              { title: 'Информация', links: footerLinks.info },
            ].map((column, idx) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <h4 className="text-white font-semibold mb-4 text-sm flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-accent" />
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-official-300 hover:text-accent-light text-sm transition-all hover:translate-x-0.5 inline-block"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h4 className="text-white font-semibold mb-4 text-sm flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-accent" />
              Мы на карте
            </h4>
            <div className="rounded-xl overflow-hidden border border-official-700/50 mb-3 h-44 bg-official-900/40">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A9c0c6b7c6b2c7b9b1c6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b&source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Адрес колледжа на карте"
                style={{ filter: 'invert(0.85) hue-rotate(180deg)' }}
              />
            </div>
            <div className="flex items-start gap-2 text-official-300 text-xs">
              <IconMapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span>{contacts.address || '600025, г. Владимир, Октябрьский пр-т, д. 11'}</span>
            </div>
          </motion.div>
        </div>

        {/* Contact Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-official-700/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {[
            {
              label: 'Email',
              value: contacts.email || 'adm@polcol.ru',
              href: `mailto:${contacts.email || 'adm@polcol.ru'}`,
              icon: <IconMail className="w-5 h-5 text-accent" />
            },
            {
              label: 'Телефон',
              value: contacts.phone || '8 (4922) 32-20-90',
              href: `tel:${(contacts.phone || '84922322090').replace(/[^0-9]/g, '')}`,
              icon: <IconPhone className="w-5 h-5 text-accent" />
            },
            {
              label: 'Адрес',
              value: contacts.address || 'г. Владимир, Октябрьский пр-т, 11',
              icon: <IconMapPin className="w-5 h-5 text-accent" />
            },
            {
              label: 'Приёмная комиссия',
              value: contacts.phoneCommission || contacts.phone || '8 (4922) 32-20-90',
              href: `tel:${(contacts.phoneCommission || contacts.phone || '84922322090').replace(/[^0-9]/g, '')}`,
              icon: <IconShieldCheck className="w-5 h-5 text-accent" />
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href || '#'}
              className={`flex items-center gap-3 p-3.5 rounded-xl bg-official-900/30 hover:bg-official-700/50 transition-all border border-official-700/30 hover:border-accent/30 ${!item.href ? 'cursor-default' : ''}`}
            >
              <div className="w-10 h-10 rounded-lg bg-official-700/50 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-official-400 text-[10px] uppercase tracking-wider mb-0.5 font-semibold">{item.label}</p>
                <p className="text-white text-sm font-semibold hover:text-accent-light transition-colors">{item.value}</p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-official-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <IconLayersIntersect className="w-5 h-5 text-official-400" />
            <p className="text-official-400 text-xs">
              © 2017-{new Date().getFullYear()} {settings?.organization || 'Министерство образования Владимирской области'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/politika-obrabotki-personalnykh-dannykh"
              className="text-official-400 hover:text-accent-light text-xs transition-all"
            >
              Политика конфиденциальности
            </Link>
            <span className="text-official-600 text-xs">|</span>
            <Link
              to="/about"
              className="text-official-400 hover:text-accent-light text-xs transition-all"
            >
              Карта сайта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}