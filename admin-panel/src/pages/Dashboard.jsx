import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import { useAuth } from '../context/AuthContext'
import {
  IconNews,
  IconFileText,
  IconUsers,
  IconSchool,
  IconMail,
  IconUserCog,
  IconHome,
  IconCalendarEvent,
  IconArrowRight,
  IconClock,
} from '@tabler/icons-react'

const quickActions = [
  { label: 'Новая новость', icon: IconNews, path: '/admin/news/new', color: 'bg-blue-500' },
  { label: 'Сотрудник', icon: IconUsers, path: '/admin/employees/new', color: 'bg-purple-500' },
  { label: 'Мероприятие', icon: IconCalendarEvent, path: '/admin/events/new', color: 'bg-amber-500' },
  { label: 'Документ', icon: IconFileText, path: '/admin/documents/new', color: 'bg-emerald-500' },
]

export default function Dashboard() {
  const api = useApi()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [activity, setActivity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      api.get('/dashboard/stats'),
      api.get('/dashboard/recent'),
    ])
      .then(([statsData, activityData]) => {
        setStats(statsData)
        setActivity(activityData)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Ошибка загрузки: {error}
      </div>
    )
  }

  const cards = [
    { label: 'Новости', value: stats?.news?.total || 0, sub: `${stats?.news?.published || 0} опубл.`, Icon: IconNews, color: 'text-blue-600', bgColor: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Страницы', value: stats?.pages?.total || 0, Icon: IconFileText, color: 'text-green-600', bgColor: 'bg-green-50', border: 'border-green-100' },
    { label: 'Сотрудники', value: stats?.employees?.total || 0, sub: `${stats?.employees?.active || 0} активн.`, Icon: IconUsers, color: 'text-purple-600', bgColor: 'bg-purple-50', border: 'border-purple-100' },
    { label: 'Специальности', value: stats?.specialties?.total || 0, sub: `${stats?.specialties?.active || 0} активн.`, Icon: IconSchool, color: 'text-amber-600', bgColor: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Сообщения', value: stats?.messages?.total || 0, sub: `${stats?.messages?.new || 0} новых`, Icon: IconMail, color: 'text-teal-600', bgColor: 'bg-teal-50', border: 'border-teal-100' },
    { label: 'Пользователи', value: stats?.users?.total || 0, Icon: IconUserCog, color: 'text-rose-600', bgColor: 'bg-rose-50', border: 'border-rose-100' },
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Доброе утро'
    if (hour < 18) return 'Добрый день'
    return 'Добрый вечер'
  }

  return (
    <div className="space-y-6">
      {/* Приветствие */}
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e3a5f] rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <IconHome className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{getGreeting()}, {user?.name || user?.email}!</h1>
              <p className="text-sm text-slate-300">Панель управления сайтом колледжа</p>
            </div>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Быстрые действия</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => navigate(action.path)}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left group"
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{action.label}</p>
                <p className="text-xs text-gray-400">Создать</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Статистика */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Статистика</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl shadow-sm border ${card.border} p-5 hover:shadow-md transition-all duration-200`}
            >
              <div className={`w-10 h-10 ${card.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                <card.Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
              {card.sub && (
                <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Последняя активность */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Последние новости */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <IconNews className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-gray-800">Последние новости</h3>
            </div>
            <button
              onClick={() => navigate('/admin/news')}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
            >
              Все <IconArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {activity?.recentNews?.length > 0 ? (
              activity.recentNews.map((item) => (
                <div
                  key={item._id}
                  className="px-5 py-3 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between"
                  onClick={() => navigate(`/admin/news/${item._id}`)}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.author?.name || 'Без автора'} • {new Date(item.updatedAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-8 text-center text-gray-400 text-sm">
                Нет новостей
              </div>
            )}
          </div>
        </div>

        {/* Последние сообщения */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <IconMail className="w-5 h-5 text-teal-500" />
              <h3 className="font-semibold text-gray-800">Последние сообщения</h3>
            </div>
            <button
              onClick={() => navigate('/admin/messages')}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
            >
              Все <IconArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {activity?.recentMessages?.length > 0 ? (
              activity.recentMessages.map((item) => (
                <div key={item._id} className="px-5 py-3 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.subject || 'Без темы'}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'new' ? 'bg-blue-100 text-blue-700' :
                      item.status === 'processing' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {item.status === 'new' ? 'Новое' : item.status === 'processing' ? 'В обработке' : 'Отвечено'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    <IconClock className="w-3 h-3 inline mr-1" />
                    {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              ))
            ) : (
              <div className="px-5 py-8 text-center text-gray-400 text-sm">
                Нет сообщений
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}