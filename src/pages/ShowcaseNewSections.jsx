import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  IconMenu2, IconX, IconHome, IconSearch, IconChevronDown,
  IconChevronRight, IconClock, IconStar, IconCalculator, IconArrowRight,
  IconUsers, IconCoin, IconTrophy, IconBuilding, IconSchool,
  IconPhone, IconMapPin, IconMail, IconEye, IconFilter, IconCalendar,
  IconPhoto, IconDeviceLaptop, IconSettings, IconRocket,
  IconUser, IconCheck, IconUpload, IconPlus, IconTrash
} from '@tabler/icons-react'

const S = ({ id, title, num, children }) => (
  <section id={id} className="mb-20">
    <div className="flex items-center gap-4 mb-8">
      <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-dark)] text-white flex items-center justify-center font-extrabold text-lg shadow-lg">{num}</span>
      <div>
        <h2 className="text-2xl font-extrabold text-[var(--color-official)]">{title}</h2>
        <p className="text-[var(--color-text-muted)] text-sm">Rисунок {num}</p>
      </div>
    </div>
    <div className="rounded-3xl border-2 border-dashed border-[var(--color-border)] bg-white p-6 md:p-10 shadow-sm relative overflow-hidden">
      <div className="absolute top-3 right-4 text-[10px] text-gray-300 font-mono select-none">#{num}</div>
      {children}
    </div>
  </section>
)

/* ──── Рисунок 17 — Шапка сайта ───────────────────────────────── */
export function HeaderSection() {
  return (
    <S id="header" title="Шапка сайта (лого, меню, доступность)" num={17}>
      {/* Full width header mockup */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flag-stripe" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"><IconMenu2 className="w-5 h-5 text-[var(--color-official)]" /></button>
              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-sm flex-shrink-0 bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-dark)] flex items-center justify-center text-white text-xs font-bold">ВПК</div>
              <div>
                <p className="text-[var(--color-official)] text-sm font-bold leading-tight">Владимирский</p>
                <p className="text-gray-400 text-xs leading-tight font-medium">политехнический колледж</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg"><IconEye className="w-4 h-4 text-gray-400" /></button>
              <button className="p-2 hover:bg-gray-100 rounded-lg"><IconSearch className="w-4 h-4 text-gray-400" /></button>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--color-accent-50)] text-[var(--color-accent-dark)] text-sm font-semibold">Калькулятор</span>
              <span className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-official)] text-white text-sm font-semibold">Контакты</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-0.5 py-2">
            {['Абитуриентам', 'Студентам', 'Родителям', 'Сотрудникам', 'Сведения об ОО', 'Новости'].map((item) => (
              <span key={item} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-[var(--color-official)] hover:bg-[var(--color-official-50)] transition-all">
                {item}
                {item === 'Абитуриентам' && <IconChevronDown className="w-3 h-3" />}
              </span>
            ))}
            <span className="ml-2 px-3 py-1.5 rounded-lg bg-[var(--color-accent-50)] text-[var(--color-accent-dark)] text-xs font-bold border border-[var(--color-accent-100)]">IT-Куб</span>
          </nav>
        </div>
      </div>
    </S>
  )
}

/* ──── Рисунок 18 — Подвал сайта ──────────────────────────────── */
export function FooterSection() {
  return (
    <S id="footer" title="Подвал сайта (навигация, контакты, соцсети, карта)" num={18}>
      <div className="bg-[var(--color-official-dark)] rounded-2xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold">ВПК</div>
                <div>
                  <p className="text-sm font-bold leading-tight">Владимирский</p>
                  <p className="text-white/50 text-xs leading-tight">политехнический колледж</p>
                </div>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">ГАПОУ Владимирской области. Подготовка специалистов с 1944 года.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">Навигация</h4>
              {['Главная', 'О колледже', 'Абитуриентам', 'Студентам', 'Новости'].map((l) => (
                <p key={l} className="text-white/70 text-sm mb-1.5 hover:text-white cursor-default transition-all">{l}</p>
              ))}
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">Контакты</h4>
              <div className="space-y-2 text-white/70 text-sm">
                <p className="flex items-start gap-2"><IconMapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> Октябрьский просп., 11</p>
                <p className="flex items-center gap-2"><IconPhone className="w-4 h-4 flex-shrink-0" /> +7 (4922) 66-65-13</p>
                <p className="flex items-center gap-2"><IconMail className="w-4 h-4 flex-shrink-0" /> adm@polcol.ru</p>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">Мы в соцсетях</h4>
              <div className="flex gap-2">
                {['VK', 'TG', 'OK'].map((s) => (
                  <span key={s} className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/60 text-xs font-bold hover:bg-white/20 transition-all cursor-default">{s}</span>
                ))}
              </div>
              <div className="mt-4 bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs">г. Владимир, ул. Октябрьский просп., 11</p>
                <div className="mt-2 h-20 bg-white/5 rounded-lg flex items-center justify-center text-white/20 text-xs">Карта</div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center">
          <p className="text-white/30 text-xs">© 2026 ГАПОУ ВО «Владимирский политехнический колледж»</p>
        </div>
      </div>
    </S>
  )
}

/* ──── Рисунок 19 — Hero (десктоп) ───────────────────────────── */
export function HeroDesktopSection() {
  return (
    <S id="hero-desktop" title="Главная страница (Hero-секция, десктоп)" num={19}>
      <div className="relative bg-gradient-to-br from-[var(--color-official-900)] via-[var(--color-official-800)] to-[var(--color-official-900)] rounded-2xl overflow-hidden min-h-[320px]">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        <div className="relative z-10 grid grid-cols-2 gap-8 items-center p-10">
          <div>
            <span className="badge-accent mb-4 inline-block">ГАПОУ Владимирской области</span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-tight">
              Владимирский политехнический<br />
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] bg-clip-text text-transparent">колледж</span>
            </h1>
            <p className="text-white/60 text-sm mb-6 max-w-md leading-relaxed">Качественное образование сегодня — профессиональный успех завтра. Региональный центр по подготовке специалистов ИТ-сферы и машиностроения</p>
            <div className="flex gap-3">
              <span className="btn-accent">Поступить к нам →</span>
              <span className="btn-outline" style={{ background: 'var(--color-official)' }}>О колледже</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 h-52 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <IconPhoto className="w-12 h-12 text-white/40" />
            </div>
            <div className="absolute bottom-12 right-12 bg-white rounded-xl p-3 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/20 flex items-center justify-center text-xs font-bold text-[var(--color-official)]">ВПК</div>
              <div>
                <p className="font-bold text-[var(--color-official)] text-xs">ГАПОУ ВО «ВПК»</p>
                <p className="text-gray-400 text-[10px]">С 1944 года</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </S>
  )
}

/* ──── Рисунок 20 — Hero (мобильная) ─────────────────────────── */
export function HeroMobileSection() {
  return (
    <S id="hero-mobile" title="Главная страница (мобильная версия)" num={20}>
      <p className="text-xs text-gray-400 mb-4">Масштаб 150% — для удобного скриншота</p>
      <div className="flex justify-center">
        <div className="w-[560px] bg-white rounded-[2.5rem] shadow-2xl border-4 border-gray-800 overflow-hidden">
          {/* Status bar */}
          <div className="bg-[var(--color-official-dark)] px-8 py-2 flex items-center justify-between">
            <span className="text-white text-xs font-semibold">9:41</span>
            <div className="flex gap-1.5">
              <div className="w-4 h-2.5 bg-white/80 rounded-sm" />
              <div className="w-4 h-2.5 bg-white/80 rounded-sm" />
              <div className="w-5 h-2.5 border border-white/80 rounded-sm" />
            </div>
          </div>
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconMenu2 className="w-6 h-6 text-[var(--color-official)]" />
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-dark)] flex items-center justify-center text-white text-[9px] font-bold">ВПК</div>
              <div>
                <p className="text-[var(--color-official)] text-xs font-bold leading-tight">Владимирский</p>
                <p className="text-gray-400 text-[10px] leading-tight">политехнический колледж</p>
              </div>
            </div>
            <IconSearch className="w-5 h-5 text-gray-400" />
          </div>
          {/* Hero */}
          <div className="bg-gradient-to-br from-[var(--color-official-900)] to-[var(--color-official-800)] px-6 py-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <span className="badge-accent text-[10px] mb-3 inline-block relative z-10">ГАПОУ Владимирской области</span>
            <h1 className="text-2xl font-extrabold text-white mb-2 relative z-10">
              Владимирский политехнический<br />
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] bg-clip-text text-transparent">колледж</span>
            </h1>
            <p className="text-white/50 text-xs mb-5 max-w-[360px] mx-auto relative z-10">Качественное образование сегодня — профессиональный успех завтра</p>
            <div className="flex gap-3 justify-center relative z-10">
              <span className="px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-[var(--color-official-dark)] text-sm font-bold">Поступить к нам</span>
              <span className="px-5 py-2.5 rounded-xl border border-white/30 text-white text-sm font-semibold">О колледже</span>
            </div>
          </div>
          {/* Nav cards */}
          <div className="px-6 py-6 bg-white">
            <div className="grid grid-cols-2 gap-3">
              {['Абитуриентам', 'Студентам', 'Родителям', 'Сотрудникам'].map((t) => (
                <div key={t} className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-600)] flex items-center justify-center text-white text-lg">🎓</div>
                  <p className="text-xs font-bold text-[var(--color-official)]">{t}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Timer preview */}
          <div className="px-6 py-4 bg-gray-50">
            <div className="bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-dark)] rounded-xl p-4 text-white">
              <p className="text-sm font-bold mb-2">День открытых дверей</p>
              <div className="flex gap-2 justify-center">
                {[{v:'03',l:'дней'},{v:'14',l:'часов'},{v:'32',l:'мин'}].map((u) => (
                  <div key={u.l} className="bg-white/10 rounded-lg px-3 py-2 text-center min-w-[50px]">
                    <p className="font-extrabold text-lg">{u.v}</p>
                    <p className="text-white/40 text-[9px]">{u.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="bg-[var(--color-official-dark)] px-6 py-3 text-center">
            <p className="text-white/30 text-[10px]">© 2026 ВПК</p>
          </div>
          {/* Home indicator */}
          <div className="bg-white py-2 flex justify-center">
            <div className="w-32 h-1.5 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </S>
  )
}

/* ──── Рисунок 21 — Карточки навигации ────────────────────────── */
export function NavCardsSection() {
  const navItems = [
    { title: 'Абитуриентам', icon: '🎓', desc: 'Поступление, специальности, документы', color: 'from-[var(--color-official)] to-[var(--color-official-600)]' },
    { title: 'Студентам', icon: '📚', desc: 'Расписание, обучение, мероприятия', color: 'from-[var(--color-official-500)] to-[var(--color-official-700)]' },
    { title: 'Родителям', icon: '👥', desc: 'Питание, здоровье, воспитание', color: 'from-[var(--color-accent-dark)] to-[var(--color-accent)]' },
    { title: 'Сотрудникам', icon: '🏛️', desc: 'Документы, методика, аттестация', color: 'from-[var(--color-official-light)] to-[var(--color-official)]' },
  ]
  return (
    <S id="nav-cards" title="Карточки навигации по аудиториям" num={21}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {navItems.map((item) => (
          <div key={item.title} className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all cursor-default">
            <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white text-2xl`}>{item.icon}</div>
            <h3 className="text-sm font-bold text-[var(--color-official)] mb-1">{item.title}</h3>
            <p className="text-gray-400 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>
    </S>
  )
}

/* ──── Рисунок 22 — О колледже с статистикой ─────────────────── */
export function AboutStatsSection() {
  const stats = [
    { value: '80+', label: 'Лет истории' },
    { value: '2500+', label: 'Студентов' },
    { value: '150+', label: 'Преподавателей' },
    { value: '8', label: 'ИТ-мастерских' },
    { value: '95%', label: 'Трудоустройство' },
    { value: '12', label: 'Специальностей' },
  ]
  return (
    <S id="about-stats" title="Секция «О колледже» со статистикой" num={22}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:border-[var(--color-accent)] transition-all">
            <p className="text-2xl font-extrabold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] bg-clip-text text-transparent">{s.value}</p>
            <p className="text-[var(--color-official)] text-xs font-bold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </S>
  )
}

/* ──── Рисунок 23 — 3D-карточки (фронт) ──────────────────────── */
export function SpecialtyFrontSection() {
  return (
    <S id="spec-front" title="3D-карточки специальностей (фронтальная сторона)" num={23}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { code: '09.02.07', name: 'Информационные системы и программирование', color: 'from-blue-500 to-indigo-600', icon: '💻', budget: 30, paid: 10, min: 4.5, chance: 'Высокий шанс', cc: 'bg-emerald-500 text-emerald-50' },
          { code: '09.02.06', name: 'Сетевое и системное администрирование', color: 'from-cyan-500 to-blue-600', icon: '🌐', budget: 25, paid: 10, min: 4.3, chance: 'Высокий шанс', cc: 'bg-emerald-500 text-emerald-50' },
        ].map((spec) => (
          <div key={spec.code} className={`bg-gradient-to-br ${spec.color} rounded-3xl p-6 text-white relative overflow-hidden min-h-[300px] flex flex-col justify-between`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${spec.cc}`}>{spec.chance}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">{spec.code}</span>
              </div>
              <div className="text-3xl mb-2">{spec.icon}</div>
              <h3 className="text-lg font-extrabold mb-2 leading-tight">{spec.name}</h3>
            </div>
            <div className="relative z-10">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/15 rounded-xl p-2.5 text-center">
                  <IconUsers className="w-3.5 h-3.5 text-white/60 mx-auto mb-0.5" />
                  <p className="font-extrabold text-sm">{spec.budget}</p>
                  <p className="text-white/50 text-[8px]">Бюджет</p>
                </div>
                <div className="bg-white/15 rounded-xl p-2.5 text-center">
                  <IconCoin className="w-3.5 h-3.5 text-white/60 mx-auto mb-0.5" />
                  <p className="font-extrabold text-sm">{spec.paid}</p>
                  <p className="text-white/50 text-[8px]">Платное</p>
                </div>
                <div className="bg-white/15 rounded-xl p-2.5 text-center">
                  <IconTrophy className="w-3.5 h-3.5 text-white/60 mx-auto mb-0.5" />
                  <p className="font-extrabold text-sm">{spec.min}</p>
                  <p className="text-white/50 text-[8px]">Проходной</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </S>
  )
}

/* ──── Рисунок 24 — 3D-карточки (оборот) ─────────────────────── */
export function SpecialtyBackSection() {
  return (
    <S id="spec-back" title="3D-карточки специальностей (оборотная сторона)" num={24}>
      <div className="bg-white border border-gray-200 rounded-3xl p-6 max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">💻</span>
            <div>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">09.02.07</span>
              <h4 className="font-extrabold text-[var(--color-official)] text-xs leading-tight">Информационные системы и программирование</h4>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-emerald-500 text-emerald-50">Высокий шанс</span>
        </div>
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-[11px]"><IconClock className="w-3 h-3 text-gray-400" /><span className="text-gray-500">Срок:</span><span className="font-bold text-[var(--color-official)]">4 года</span></div>
          <div className="flex items-center gap-2 text-[11px]"><IconSchool className="w-3 h-3 text-gray-400" /><span className="text-gray-500">Форма:</span><span className="font-bold text-[var(--color-official)]">Очная</span></div>
          <div className="flex items-center gap-2 text-[11px]"><IconBuilding className="w-3 h-3 text-gray-400" /><span className="text-gray-500">Квалификация:</span><span className="font-bold text-[var(--color-official)]">Техник-программист</span></div>
        </div>
        <div className="mb-3">
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">Навыки</p>
          <div className="flex flex-wrap gap-1">
            {['Python', 'JavaScript', 'SQL', 'Git', 'React/Vue'].map((s) => (
              <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[9px] font-semibold rounded-lg">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">Карьерные пути</p>
          {['Программист', 'Веб-разработчик', 'QA-инженер'].map((c) => (
            <div key={c} className="flex items-center gap-1.5 text-[10px] text-gray-600"><IconCheck className="w-2.5 h-2.5 text-emerald-500" />{c}</div>
          ))}
        </div>
      </div>
    </S>
  )
}

/* ──── Рисунок 25 — Таймер обратного отсчёта ─────────────────── */
export function TimerNewSection() {
  return (
    <S id="timer-new" title="Живой таймер обратного отсчёта" num={25}>
      <div className="bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-dark)] rounded-2xl p-8 text-white">
        <div className="flex items-center gap-2 mb-4"><IconCalendar className="w-5 h-5 text-[var(--color-accent)]" /><div><h4 className="font-bold">День открытых дверей</h4><p className="text-white/40 text-xs">20 апреля 2026</p></div></div>
        <div className="flex gap-3 justify-center">
          {[{ v: '03', l: 'дней' }, { v: '14', l: 'часов' }, { v: '32', l: 'мин' }, { v: '18', l: 'сек' }].map((u) => (
            <div key={u.l} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[60px]">
              <p className="font-extrabold text-2xl">{u.v}</p>
              <p className="text-white/40 text-[10px]">{u.l}</p>
            </div>
          ))}
        </div>
      </div>
    </S>
  )
}

/* ──── Рисунок 26 — Новости с фильтрацией ────────────────────── */
export function NewsNewSection() {
  const cats = ['Все', 'Мероприятие', 'Достижение', 'Анонс']
  return (
    <S id="news-new" title="Страница «Новости» с фильтрацией" num={26}>
      <div className="flex flex-wrap gap-2 mb-6">
        {cats.map((c, i) => (
          <button key={c} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${i === 0 ? 'bg-[var(--color-official)] text-white' : 'bg-[var(--color-official-50)] text-[var(--color-official)]'}`}>{c}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card-official rounded-xl p-5 hover:border-[var(--color-accent)] transition-all">
            <div className="flex items-start justify-between mb-2">
              <span className="badge-official text-[10px]">Мероприятие</span>
              <span className="text-[10px] text-gray-400">{i * 5} мая 2026</span>
            </div>
            <h3 className="text-sm font-bold text-[var(--color-official)] mb-1">Новость колледжа #{i}</h3>
            <p className="text-gray-500 text-xs">Описание новости для примера макета страницы с фильтрацией по категориям.</p>
          </div>
        ))}
      </div>
    </S>
  )
}

/* ──── Рисунок 27 — Сведения об ОО ───────────────────────────── */
export function SvedenNewSection() {
  return (
    <S id="sveden-new" title="Страница «Сведения об ОО»" num={27}>
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
        <IconHome className="w-3 h-3" /><IconChevronRight className="w-3 h-3" />
        <span className="text-[var(--color-official)] font-semibold">Сведения об ОО</span>
      </div>
      <div className="bg-gradient-to-r from-[var(--color-official)] to-[var(--color-official-light)] rounded-2xl p-6 text-white mb-6">
        <h1 className="text-xl font-extrabold">Сведения об образовательной организации</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {['Основные сведения', 'Структура', 'Документы', 'Образование', 'Стандарты', 'Руководство', 'Педагоги', 'Среда', 'Стипендии', 'Платные услуги', 'Финансы', 'Вакансии'].map((t) => (
          <div key={t} className="card-official rounded-xl p-4 hover:border-[var(--color-accent)] transition-all cursor-default">
            <h3 className="text-xs font-bold text-[var(--color-official)]">{t}</h3>
          </div>
        ))}
      </div>
    </S>
  )
}

/* ──── Рисунок 28 — Абитуриентам ─────────────────────────────── */
export function AbitSection() {
  return (
    <S id="abit-page" title="Страница «Абитуриентам»" num={28}>
      <div className="bg-gradient-to-r from-[var(--color-official)] to-[var(--color-official-light)] rounded-2xl p-8 text-white mb-6">
        <h1 className="text-2xl font-extrabold mb-2">Абитуриентам</h1>
        <p className="text-white/60 text-sm">Вся информация для поступления в колледж</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {['Приёмная комиссия', 'День открытых дверей', 'Специальности', 'Общежитие', 'Профориентация', 'Направления обучения'].map((t) => (
          <div key={t} className="card-official rounded-xl p-5 hover:border-[var(--color-accent)] transition-all cursor-default">
            <h3 className="text-sm font-bold text-[var(--color-official)] mb-1">{t}</h3>
            <p className="text-gray-400 text-xs">Подробнее о разделе для абитуриентов</p>
            <span className="text-[var(--color-accent-dark)] text-xs font-semibold mt-2 inline-block">Перейти →</span>
          </div>
        ))}
      </div>
    </S>
  )
}

/* ──── Рисунок 29 — Студентам ────────────────────────────────── */
export function StudentSection() {
  return (
    <S id="student-page" title="Страница «Студентам»" num={29}>
      <div className="bg-gradient-to-r from-[var(--color-official-500)] to-[var(--color-official-700)] rounded-2xl p-8 text-white mb-6">
        <h1 className="text-2xl font-extrabold mb-2">Студентам</h1>
        <p className="text-white/60 text-sm">Расписание, документы, мероприятия и студенческая жизнь</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {['Расписание занятий', 'Расписание звонков', 'Документы', 'Аттестация', 'Практика', 'Студенческая жизнь'].map((t) => (
          <div key={t} className="card-official rounded-xl p-5 hover:border-[var(--color-accent)] transition-all cursor-default">
            <h3 className="text-sm font-bold text-[var(--color-official)] mb-1">{t}</h3>
            <p className="text-gray-400 text-xs">Информация для студентов</p>
            <span className="text-[var(--color-accent-dark)] text-xs font-semibold mt-2 inline-block">Перейти →</span>
          </div>
        ))}
      </div>
    </S>
  )
}

/* ──── Рисунок 30 — Калькулятор поступления ──────────────────── */
export function CalcNewSection() {
  return (
    <S id="calc-new" title="Страница «Калькулятор поступления»" num={30}>
      <div className="max-w-xl">
        {[1, 2, 3].map((step) => (
          <div key={step} className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xs">{step}</span>
              <h3 className="text-lg font-bold text-[var(--color-official)]">{step === 1 ? 'Оценки за экзамены' : step === 2 ? 'Фото аттестата' : 'Рассчитать'}</h3>
            </div>
            {step === 1 && (
              <div className="space-y-2">
                {[{ s: 'Математика', v: 5 }, { s: 'Русский язык', v: 4 }].map((e, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-400 w-5">{i + 1}</span>
                    <div className="flex-1 px-3 py-2.5 rounded-lg border-2 border-gray-200 text-xs bg-white">{e.s}</div>
                    <div className="w-20 px-3 py-2.5 rounded-lg border-2 border-gray-200 text-xs text-center font-bold bg-white">{e.v}</div>
                  </div>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
                <IconUpload className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-2" />
                <p className="text-xs font-bold text-[var(--color-official)]">Загрузите фото аттестата</p>
              </div>
            )}
            {step === 3 && (
              <button className="w-full px-6 py-3 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2">
                <IconCalculator className="w-4 h-4" /> Рассчитать шансы
              </button>
            )}
          </div>
        ))}
      </div>
    </S>
  )
}

/* ──── Рисунок 31 — Результаты калькулятора ──────────────────── */
export function CalcResultsSection() {
  return (
    <S id="calc-results" title="Результаты расчёта калькулятора" num={31}>
      <div className="bg-gradient-to-br from-[var(--color-official-900)] via-[var(--color-official-800)] to-[var(--color-official-900)] rounded-2xl p-6 text-white text-center mb-6">
        <IconStar className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-2" />
        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Средний балл</p>
        <p className="text-5xl font-extrabold mb-3">4.67</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { c: '09.02.07', n: 'Информатика', cl: 'from-blue-500 to-indigo-600', ch: 'Высокий', cc: 'bg-emerald-500 text-emerald-50' },
          { c: '15.02.08', n: 'Машиностроение', cl: 'from-orange-500 to-red-600', ch: 'Средний', cc: 'bg-amber-500 text-amber-50' },
        ].map((s) => (
          <div key={s.c} className={`bg-gradient-to-br ${s.cl} rounded-2xl p-5 text-white min-h-[160px] flex flex-col justify-between`}>
            <div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${s.cc}`}>{s.ch} шанс</span>
              <h3 className="text-sm font-extrabold mt-2">{s.n}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-white/15 rounded-lg p-2 text-center"><p className="font-extrabold text-sm">30</p><p className="text-white/50 text-[8px]">Бюджет</p></div>
              <div className="bg-white/15 rounded-lg p-2 text-center"><p className="font-extrabold text-sm">10</p><p className="text-white/50 text-[8px]">Платное</p></div>
            </div>
          </div>
        ))}
      </div>
    </S>
  )
}

/* ──── Рисунок 32 — Модальное окно поиска ────────────────────── */
export function SearchModalSection() {
  return (
    <S id="search-modal" title="Модальное окно поиска по сайту" num={32}>
      <div className="bg-gradient-to-b from-[var(--color-official-dark)] to-[var(--color-official)] rounded-2xl p-8 min-h-[300px]">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <IconSearch className="w-5 h-5 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input type="text" defaultValue="приёмная" className="w-full pl-12 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm outline-none" readOnly />
            <IconX className="w-4 h-4 text-white/40 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-white/30 text-[10px] uppercase tracking-wider mb-3">Найдено: 4 результата</p>
          {['Приёмная комиссия', 'День открытых дверей', 'Контакты', 'Список поступления'].map((r, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-all">
              <h4 className="text-white font-semibold text-sm">{r}</h4>
              <p className="text-white/30 text-xs">...приёмной комиссии...</p>
            </div>
          ))}
        </div>
      </div>
    </S>
  )
}

/* ──── Рисунок 33 — Таймлайн истории ────────────────────────── */
export function TimelineNewSection() {
  const items = [
    { y: '1944', t: 'Основание училища', d: 'Ремесленное училище для подготовки рабочих' },
    { y: '1990', t: 'Политехнический колледж', d: 'Получение статуса колледжа' },
    { y: '2015', t: 'ИТ-кластер', d: 'Открытие современных ИТ-мастерских' },
    { y: '2024', t: 'Флагман IT-образования', d: 'Ведущий колледж региона' },
  ]
  return (
    <S id="timeline-new" title="Страница «О колледже» (таймлайн истории)" num={33}>
      <div className="space-y-4 relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-official)] to-[var(--color-accent)] hidden md:block" />
        {items.map((item, idx) => (
          <div key={item.y} className={`relative flex items-start gap-4 md:gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : ''}`}>
              <div className="card-official rounded-xl p-4 inline-block">
                <span className="text-lg font-bold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] bg-clip-text text-transparent">{item.y}</span>
                <h3 className="text-sm font-bold text-[var(--color-official)]">{item.t}</h3>
                <p className="text-gray-500 text-xs">{item.d}</p>
              </div>
            </div>
            <div className="hidden md:flex w-8 h-8 rounded-full bg-[var(--color-accent)] shadow-lg shrink-0 relative z-10 items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div className="flex-1 hidden md:block" />
          </div>
        ))}
      </div>
    </S>
  )
}

/* ──── Рисунок 34 — Контакты с формой ───────────────────────── */
export function ContactsNewSection() {
  return (
    <S id="contacts-new" title="Страница «Контакты» с формой" num={34}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          {[
            { I: IconMapPin, l: 'Адрес', v: 'Октябрьский проспект, 11', c: 'from-blue-500 to-blue-600' },
            { I: IconPhone, l: 'Телефон', v: '+7 (4922) 66-65-13', c: 'from-cyan-500 to-cyan-600' },
            { I: IconMail, l: 'Email', v: 'adm@polcol.ru', c: 'from-indigo-500 to-indigo-600' },
          ].map((c, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.c} flex items-center justify-center shrink-0`}><c.I className="w-4 h-4 text-white" /></div>
              <div><p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">{c.l}</p><p className="text-[var(--color-official)] font-semibold text-xs">{c.v}</p></div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-[var(--color-official)] mb-1">Обратная связь</h3>
          <p className="text-gray-500 text-xs mb-4">Ответим в течение рабочего дня</p>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Имя" className="px-3 py-2.5 rounded-xl border-2 border-gray-200 text-xs outline-none" />
              <input type="email" placeholder="Email" className="px-3 py-2.5 rounded-xl border-2 border-gray-200 text-xs outline-none" />
            </div>
            <textarea rows={3} placeholder="Сообщение..." className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-xs outline-none resize-none" />
            <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs">Отправить</button>
          </div>
        </div>
      </div>
    </S>
  )
}

/* ──── Рисунок 35 — Мобильное меню ───────────────────────────── */
export function MobileMenuSection() {
  const [open, setOpen] = useState(true)
  return (
    <S id="mobile-menu" title="Мобильное меню (выдвижная панель)" num={35}>
      <div className="flex justify-center">
        <div className="w-[375px] bg-white rounded-[2.5rem] shadow-2xl border-4 border-gray-800 overflow-hidden">
          <div className="bg-[var(--color-official-dark)] px-6 py-1.5 flex items-center justify-between">
            <span className="text-white text-[10px] font-semibold">9:41</span>
            <div className="flex gap-1"><div className="w-3 h-2 bg-white/80 rounded-sm" /><div className="w-3 h-2 bg-white/80 rounded-sm" /><div className="w-4 h-2 border border-white/80 rounded-sm" /></div>
          </div>
          <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setOpen(!open)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                {open ? <IconX className="w-5 h-5 text-[var(--color-official)]" /> : <IconMenu2 className="w-5 h-5 text-[var(--color-official)]" />}
              </button>
              <span className="text-[var(--color-official)] text-[10px] font-bold">Меню</span>
            </div>
          </div>
          {open && (
            <div className="bg-white border-t border-gray-100 shadow-lg px-4 py-3 max-h-[400px] overflow-y-auto">
              {['Абитуриентам', 'Студентам', 'Родителям', 'Сотрудникам', 'Сведения об ОО', 'Новости', 'Контакты'].map((item) => (
                <div key={item} className="flex items-center justify-between px-3 py-3 border-b border-gray-50 last:border-0">
                  <span className="text-sm font-medium text-gray-700">{item}</span>
                  <IconChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                <span className="flex-1 text-center px-3 py-2.5 rounded-lg bg-[var(--color-accent-50)] text-[var(--color-accent-dark)] text-xs font-semibold border border-[var(--color-accent-200)]">Калькулятор</span>
                <span className="flex-1 text-center px-3 py-2.5 rounded-lg bg-[var(--color-official)] text-white text-xs font-semibold">IT-Куб</span>
              </div>
            </div>
          )}
          <div className="bg-white py-1.5 flex justify-center"><div className="w-28 h-1 bg-gray-300 rounded-full" /></div>
        </div>
      </div>
    </S>
  )
}

/* ──── Рисунок 36 — Адаптивное отображение на планшете ────────── */
export function TabletViewSection() {
  return (
    <S id="tablet-view" title="Адаптивное отображение на планшете" num={36}>
      <div className="flex justify-center">
        <div className="w-[768px] bg-white rounded-3xl shadow-2xl border-4 border-gray-800 overflow-hidden">
          <div className="bg-[var(--color-official-dark)] px-6 py-1.5 flex items-center justify-between">
            <span className="text-white text-[10px] font-semibold">9:41</span>
            <div className="flex gap-1"><div className="w-3 h-2 bg-white/80 rounded-sm" /><div className="w-3 h-2 bg-white/80 rounded-sm" /><div className="w-4 h-2 border border-white/80 rounded-sm" /></div>
          </div>
          {/* Tablet header */}
          <div className="bg-white px-6 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg"><IconMenu2 className="w-5 h-5 text-[var(--color-official)]" /></button>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-dark)] flex items-center justify-center text-white text-[8px] font-bold">ВПК</div>
              <span className="text-[var(--color-official)] text-xs font-bold">ВПК</span>
            </div>
            <div className="flex items-center gap-1.5">
              {['Абитуриентам', 'Студентам', 'Новости'].map((n) => (
                <span key={n} className="px-2 py-1 rounded-lg text-[10px] text-gray-600 hover:bg-[var(--color-official-50)]">{n}</span>
              ))}
              <span className="px-2 py-1 rounded-lg bg-[var(--color-official)] text-white text-[10px] font-semibold ml-1">Контакты</span>
            </div>
          </div>
          {/* Tablet hero */}
          <div className="bg-gradient-to-br from-[var(--color-official-900)] to-[var(--color-official-800)] px-8 py-10 text-center">
            <span className="badge-accent text-[8px] mb-2 inline-block">ГАПОУ Владимирской области</span>
            <h1 className="text-xl font-extrabold text-white mb-2">Владимирский политехнический <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] bg-clip-text text-transparent">колледж</span></h1>
            <p className="text-white/50 text-xs mb-4 max-w-md mx-auto">Качественное образование сегодня</p>
            <div className="flex gap-2 justify-center">
              <span className="px-4 py-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-official-dark)] text-xs font-bold">Поступить</span>
              <span className="px-4 py-2 rounded-xl border border-white/30 text-white text-xs font-semibold">О колледже</span>
            </div>
          </div>
          {/* Tablet cards grid (2 cols on tablet) */}
          <div className="px-6 py-6 bg-gray-50">
            <div className="grid grid-cols-2 gap-3">
              {['Абитуриентам', 'Студентам', 'Родителям', 'Сотрудникам'].map((t) => (
                <div key={t} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-600)] flex items-center justify-center text-white text-lg">🎓</div>
                  <p className="text-[10px] font-bold text-[var(--color-official)]">{t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[var(--color-official-dark)] px-4 py-2 text-center"><p className="text-white/30 text-[8px]">© 2026 ВПК</p></div>
          <div className="bg-white py-1.5 flex justify-center"><div className="w-28 h-1 bg-gray-300 rounded-full" /></div>
        </div>
      </div>
    </S>
  )
}