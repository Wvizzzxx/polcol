import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import { IconCalendarEvent } from '@tabler/icons-react'
import toast from 'react-hot-toast'

export default function EventsList() {
  const api = useApi()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/events')
      .then((data) => setItems(Array.isArray(data) ? data : data.events || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (item) => {
    try {
      await api.delete(`/events/${item._id}`)
      toast.success('Мероприятие удалено')
      setItems((prev) => prev.filter((i) => i._id !== item._id))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const columns = [
    {
      header: 'Название',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.title}</p>
          {row.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{row.description}</p>}
        </div>
      ),
    },
    {
      header: 'Дата',
      render: (row) => (
        <span className="text-gray-500 whitespace-nowrap text-sm">
          {new Date(row.date || row.createdAt).toLocaleDateString('ru-RU', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </span>
      ),
    },
    {
      header: 'Место',
      render: (row) => row.location ? (
        <span className="inline-flex items-center gap-1 text-sm text-gray-600">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {row.location}
        </span>
      ) : '—',
    },
    {
      header: 'Участники',
      render: (row) => row.participants ? (
        <span className="text-sm font-medium text-gray-700">{row.participants}</span>
      ) : '—',
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Мероприятия</h1>
          <p className="text-sm text-gray-500 mt-1">События и мероприятия колледжа</p>
        </div>
        <a href="/admin/events/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Добавить мероприятие
        </a>
      </div>
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(item) => navigate(`/admin/events/${item._id}`)}
        onDelete={handleDelete}
        emptyIcon={IconCalendarEvent}
        emptyTitle="Нет мероприятий"
        emptyDescription="Добавьте первое мероприятие"
        emptyAction={() => navigate('/admin/events/new')}
        emptyActionLabel="Создать мероприятие"
      />
    </div>
  )
}