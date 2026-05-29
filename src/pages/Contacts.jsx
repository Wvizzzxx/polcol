import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { IconClock, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import { renderIcon } from '../utils/iconMap'

const fallbackContacts = {
  address: '600025, Россия, Владимирская область, г.Владимир, Октябрьский проспект, д. 11',
  phone: '+7 (4922) 66-65-13',
  email: 'adm@polcol.ru',
  schedule: 'Пн-Пт: 8:00-17:00, обед 12:00-13:00, Сб: 8:00-14:00',
}

export default function Contacts() {
  const [contacts, setContacts] = useState(fallbackContacts)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetch('/api/contacts')
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.contacts || []
        if (items.length > 0) {
          const c = items[0]
          setContacts({
            address: c.address || fallbackContacts.address,
            phone: c.phone || fallbackContacts.phone,
            email: c.email || fallbackContacts.email,
            schedule: c.schedule || fallbackContacts.schedule,
          })
        }
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch('/api/contacts/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Ошибка')
      toast.success('Сообщение отправлено!')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Ошибка отправки. Попробуйте позже.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      {/* ==================== HERO — МИНИМАЛИСТИЧНЫЙ С КОНТАКТАМИ ==================== */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Левая — текст */}
            <div>
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="mb-6">
                  {renderIcon(IconPhone, 'w-16 h-16 text-white drop-shadow')}
              </motion.div>
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-bold tracking-wider uppercase mb-6"
              ><IconPhone className="inline w-5 h-5 align-text-bottom" /> Контакты
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] mb-6"
              >
                Свяжитесь<br/>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  с нами
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.25 }}
                className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed"
              >
                Мы всегда рады помочь. Выберите удобный способ связи или заполните форму — ответим в ближайшее время
              </motion.p>
            </div>

            {/* Правая — контакт-карточки */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {[
                { Icon: IconMapPin, label: 'Адрес', value: contacts.address, color: 'from-blue-500 to-blue-600' },
                { Icon: IconPhone, label: 'Телефон', value: contacts.phone, color: 'from-cyan-500 to-cyan-600', href: `tel:${contacts.phone.replace(/[^0-9]/g, '')}` },
                { Icon: IconMail, label: 'Email', value: contacts.email, color: 'from-indigo-500 to-indigo-600', href: `mailto:${contacts.email}` },
                { Icon: IconClock, label: 'Режим работы', value: contacts.schedule, color: 'from-violet-500 to-violet-600' },
              ].map((c, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:bg-white/[0.06] transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <c.Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-0.5">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-white font-semibold text-sm hover:text-blue-400 transition-colors">{c.value}</a>
                    ) : (
                      <p className="text-white font-semibold text-sm">{c.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== ФОРМА И КАРТА ==================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Форма */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
                Напишите нам
              </span>
              <h2 className="text-3xl font-extrabold text-official mb-2">Обратная связь</h2>
              <p className="text-gray-500 mb-8">Мы ответим на ваше сообщение в течение рабочего дня</p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-official mb-2">Ваше имя</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-official mb-2">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
                      placeholder="ivan@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-official mb-2">Тема</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
                    placeholder="Тема сообщения"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-official mb-2">Сообщение</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none text-sm"
                    placeholder="Ваше сообщение..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:from-blue-500 hover:to-indigo-500 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/20 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {sending ? 'Отправка...' : 'Отправить сообщение'}
                </button>
              </form>
            </motion.div>

            {/* Карта/изображение */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl h-full min-h-[500px] overflow-hidden relative">
                {/* Заглушка карты */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl"><IconMapPin className="inline w-5 h-5 align-text-bottom" /></span>
                    </div>
                    <h3 className="text-official font-bold text-lg mb-2">Октябрьский проспект, 11</h3>
                    <p className="text-gray-500 text-sm mb-4">г. Владимир, 600025</p>
                    <a 
                      href="https://yandex.ru/maps/?text=Октябрьский+проспект+11+Владимир" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 font-semibold text-sm rounded-lg hover:bg-blue-50 transition-all shadow-md"
                    >
                      Открыть на карте
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>
                </div>
                {/* Декор */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-blue-500/10 rounded-full" />
                <div className="absolute bottom-8 right-8 w-24 h-24 bg-indigo-500/10 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}