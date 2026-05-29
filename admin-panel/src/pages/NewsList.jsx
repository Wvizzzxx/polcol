import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import toast from 'react-hot-toast'

export default function NewsList() {
  const api = useApi()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const loadItems = async () => {
    try {
      const data = await api.get('/news')
      setItems(Array.isArray(data) ? data : data.news || [])
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadItems() }, [])

  const handleDelete = async (item) => {
    try {
      await api.delete(`/news/${item._id}`)
      toast.success('Новость удалена')
      loadItems()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleEdit = (item) => navigate(`/admin/news/${item._id}`)

  const columns = [
    { header: 'Заголовок', accessor: 'title' },
    { header: 'Дата', render: (row) => new Date(row.createdAt || row.date).toLocaleDateString('ru-RU') },
    { header: 'Просмотры', accessor: 'views' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Новости</h1>
        <a
          href="/admin/news/new"
          className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          + Добавить
        </a>
      </div>
      <DataTable columns={columns} data={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}