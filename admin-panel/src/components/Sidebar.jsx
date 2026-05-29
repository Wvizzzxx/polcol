import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const menuItems = [
  { path: '/admin', label: 'Дашборд', icon: '📊', end: true },
  { path: '/admin/news', label: 'Новости', icon: '📰' },
  { path: '/admin/pages', label: 'Страницы', icon: '📄' },
  { path: '/admin/navigation', label: 'Навигация', icon: '🧭' },
  { path: '/admin/employees', label: 'Сотрудники', icon: '👥' },
  { path: '/admin/specialties', label: 'Специальности', icon: '🎓' },
  { path: '/admin/media', label: 'Медиафайлы', icon: '🖼️' },
  { path: '/admin/contacts', label: 'Контакты', icon: '📞' },
  { path: '/admin/documents', label: 'Документы', icon: '📁' },
  { path: '/admin/events', label: 'Мероприятия', icon: '📅' },
  { path: '/admin/settings', label: 'Настройки', icon: '⚙️' },
]

export default function Sidebar() {
  const { user, hasRole, logout } = useAuth()

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-4 border-b border-blue-800">
        <h2 className="text-lg font-bold">ВПК Панель</h2>
        <p className="text-sm text-blue-300 mt-1">{user?.name || user?.email}</p>
        <span className="inline-block text-xs bg-blue-700 px-2 py-0.5 rounded mt-1 capitalize">
          {user?.role}
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {menuItems.map((item) => {
          if (item.path === '/admin/users' && !hasRole('superadmin', 'admin')) {
            return null
          }
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? 'bg-white/20 text-white font-medium'
                    : 'text-blue-200 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          )
        })}

        {hasRole('superadmin', 'admin') && (
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${
                isActive
                  ? 'bg-white/20 text-white font-medium'
                  : 'text-blue-200 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <span>🔐</span>
            <span>Пользователи</span>
          </NavLink>
        )}
      </nav>

      {/* Нижняя панель */}
      <div className="p-3 border-t border-blue-800 space-y-1">
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-blue-200 hover:bg-white/10 hover:text-white transition w-full"
        >
          <span>🌐</span>
          <span>На сайт</span>
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-blue-200 hover:bg-red-500/20 hover:text-red-300 transition w-full"
        >
          <span>🚪</span>
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  )
}