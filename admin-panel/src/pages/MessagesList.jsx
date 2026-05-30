import { useState, useEffect } from 'react'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import { IconMail } from '@tabler/icons-react'
import toast from 'react-hot-toast'

export default function MessagesList() {
  const api = useApi()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/contacts/messages')
      .then((data) => setItems(Array.isArray(data) ? data : data.messages || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (item) => {
    try {
      await api.delete(`/contacts/messages/${item._id}`)
      toast.success('Сообщение удалено')
      setItems((prev) => prev.filter((i) => i._id !== item._id))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleMarkRead = async (item) => {
    try {
      await api.put(`/contacts/messages/${item._id}`, { status: 'read' })
      toast.success('Отмечено как прочитанное')
      setItems((prev) => prev.map((i) => i._id === item._id ? { ...i, status: 'read' } : i))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const statusBadge = (status) => {
    const styles = {
      new: 'bg-blue-50 text-blue-700 border-blue-200',
      read: 'bg-green-50 text-green-700 border-green-200',
      processing: 'bg-amber-50 text-amber-700 border-amber-200',
      replied: 'bg-purple-50 text-purple-700 border-purple-200',
    }
    const labels = {
      new: 'Новое',
      read: 'Прочитано',
      processing: 'В обработке',
      replied: 'Отвечено',
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.new}`}>
        {labels[status] || status}
      </span>
    )
  }

  const columns = [
    {
      header: 'От',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{row.email}</p>
        </div>
      ),
    },
    {
      header: 'Тема',
      render: (row) => (
        <span className="text-gray-700">{row.subject || 'Без темы'}</span>
      ),
    },
    {
      header: 'Сообщение',
      render: (row) => (
        <span className="text-sm text-gray-500 line-clamp-2 max-w-xs block">{row.message}</span>
      ),
    },
    {
      header: 'Статус',
      render: (row) => statusBadge(row.status),
    },
    {
      header: 'Дата',
      render: (row) => (
        <span className="text-gray-500 whitespace-nowrap text-sm">
          {new Date(row.createdAt).toLocaleDateString('ru-RU')}
        </span>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Сообщения</h1>
          <p className="text-sm text-gray-500 mt-1">Входящие сообщения от посетителей сайта</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        onDelete={handleDelete}
        emptyIcon={IconMail}
        emptyTitle="Нет сообщений"
        emptyDescription="Сообщения от посетителей сайта появятся здесь"
      />
    </div>
  )
}