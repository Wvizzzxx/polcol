import { useState, useEffect } from 'react'
import { useApi } from '../hooks/useApi'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const api = useApi()
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/dashboard')
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
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
    { label: 'Новости', value: stats?.newsCount || 0, color: 'bg-blue-500', icon: '📰' },
    { label: 'Страницы', value: stats?.pagesCount || 0, color: 'bg-green-500', icon: '📄' },
    { label: 'Сотрудники', value: stats?.employeesCount || 0, color: 'bg-purple-500', icon: '👥' },
    { label: 'Специальности', value: stats?.specialtiesCount || 0, color: 'bg-yellow-500', icon: '🎓' },
    { label: 'Медиафайлы', value: stats?.mediaCount || 0, color: 'bg-pink-500', icon: '🖼️' },
    { label: 'Документы', value: stats?.documentsCount || 0, color: 'bg-indigo-500', icon: '📁' },
    { label: 'Мероприятия', value: stats?.eventsCount || 0, color: 'bg-red-500', icon: '📅' },
    { label: 'Сообщения', value: stats?.messagesCount || 0, color: 'bg-teal-500', icon: '✉️' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Дашборд</h1>
        <p className="text-gray-500 mt-1">
          Добро пожаловать, {user?.name || user?.email}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-xl`}>
              {card.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}