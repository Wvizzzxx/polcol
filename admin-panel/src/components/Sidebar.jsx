import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  IconLayoutDashboard,
  IconNews,
  IconFileText,
  IconNavigation,
  IconUsers,
  IconSchool,
  IconPhoto,
  IconPhone,
  IconFile,
  IconCalendarEvent,
  IconHomeCog,
  IconMail,
  IconSettings,
  IconUserCog,
  IconExternalLink,
  IconLogout,
  IconChevronLeft,
} from '@tabler/icons-react'

// IconSettings is used in the menu items below

const menuSections = [
  {
    title: 'Основное',
    items: [
      { path: '/admin', label: 'Дашборд', icon: IconLayoutDashboard, end: true },
    ],
  },
  {
    title: 'Контент',
    items: [
      { path: '/admin/news', label: 'Новости', icon: IconNews },
      { path: '/admin/pages', label: 'Страницы', icon: IconFileText },
      { path: '/admin/heroes', label: 'Hero-секции', icon: IconHomeCog },
      { path: '/admin/events', label: 'Мероприятия', icon: IconCalendarEvent },
    ],
  },
  {
    title: 'Справочники',
    items: [
      { path: '/admin/specialties', label: 'Специальности', icon: IconSchool },
      { path: '/admin/employees', label: 'Сотрудники', icon: IconUsers },
      { path: '/admin/navigation', label: 'Навигация', icon: IconNavigation },
    ],
  },
  {
    title: 'Взаимодействие',
    items: [
      { path: '/admin/contacts', label: 'Контакты', icon: IconPhone },
      { path: '/admin/messages', label: 'Сообщения', icon: IconMail },
      { path: '/admin/documents', label: 'Документы', icon: IconFile },
      { path: '/admin/media', label: 'Медиафайлы', icon: IconPhoto },
    ],
  },
  {
    title: 'Система',
    items: [
      { path: '/admin/settings', label: 'Настройки', icon: IconSettings },
    ],
  },
]

export default function Sidebar({ isOpen = true, onToggle }) {
  const { user, hasRole, logout } = useAuth()

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col z-50 border-r border-white/10 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}
    >
      {/* Logo & User */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
              <IconSchool className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">ВПК Панель</h2>
              <p className="text-xs text-slate-400">Управление сайтом</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition"
          >
            <IconChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-white/5 rounded-lg border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name || user?.email}</p>
            <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold">
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {menuSections.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-500/15 text-blue-400 font-medium border border-blue-500/20 shadow-sm'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                    }`
                  }
                >
                  <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}

        {hasRole('superadmin', 'admin') && (
          <div>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Управление
            </p>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500/15 text-blue-400 font-medium border border-blue-500/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`
              }
            >
              <IconUserCog className="w-[18px] h-[18px] flex-shrink-0" />
              <span>Пользователи</span>
            </NavLink>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-all duration-200 border border-transparent hover:border-white/10"
        >
          <IconExternalLink className="w-[18px] h-[18px] flex-shrink-0" />
          <span>На сайт</span>
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 w-full border border-transparent hover:border-red-500/20"
        >
          <IconLogout className="w-[18px] h-[18px] flex-shrink-0" />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  )
}