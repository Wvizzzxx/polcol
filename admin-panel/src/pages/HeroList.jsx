import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import { IconHomeCog } from '@tabler/icons-react'
import toast from 'react-hot-toast'

export default function HeroList() {
  const api = useApi()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/heroes')
      .then((data) => setItems(Array.isArray(data) ? data : data.heroes || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (item) => {
    try {
      await api.delete(`/heroes/${item._id}`)
      toast.success('Hero-секция удалена')
      setItems((prev) => prev.filter((i) => i._id !== item._id))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const columns = [
    {
      header: 'Ключ',
      render: (row) => (
        <code className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-lg font-mono">{row.key}</code>
      ),
    },
    {
      header: 'Заголовок',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.title}</p>
          {row.titleHighlight && (
            <p className="text-xs text-gray-400 mt-0.5">{row.titleHighlight}</p>
          )}
        </div>
      ),
    },
    {
      header: 'Кнопка',
      render: (row) => row.buttonText || '—',
    },
    {
      header: 'Статус',
      render: (row) => (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
          row.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${row.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
          {row.isActive ? 'Активна' : 'Неактивна'}
        </span>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hero-секции</h1>
          <p className="text-sm text-gray-500 mt-1">Главные баннеры и секции на страницах</p>
        </div>
        <a href="/admin/heroes/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Добавить секцию
        </a>
      </div>
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(item) => navigate(`/admin/heroes/${item._id}`)}
        onDelete={handleDelete}
        emptyIcon={IconHomeCog}
        emptyTitle="Нет Hero-секций"
        emptyDescription="Создайте первую hero-секцию"
        emptyAction={() => navigate('/admin/heroes/new')}
        emptyActionLabel="Создать секцию"
      />
    </div>
  )
}