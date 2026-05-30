import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import { IconNavigation } from '@tabler/icons-react'
import toast from 'react-hot-toast'

export default function NavigationList() {
  const api = useApi()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/navigation')
      .then((data) => setItems(Array.isArray(data) ? data : data.navigation || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (item) => {
    try {
      await api.delete(`/navigation/${item._id}`)
      toast.success('Пункт навигации удалён')
      setItems((prev) => prev.filter((i) => i._id !== item._id))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const columns = [
    {
      header: 'Название',
      render: (row) => (
        <span className="font-medium text-gray-900">{row.title}</span>
      ),
    },
    {
      header: 'Путь',
      render: (row) => (
        <code className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">{row.path}</code>
      ),
    },
    {
      header: 'Подменю',
      render: (row) => row.submenu && row.submenu.length > 0 ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
          {row.submenu.length} п.
        </span>
      ) : (
        <span className="text-gray-400 text-xs">—</span>
      ),
    },
    {
      header: 'Порядок',
      render: (row) => (
        <span className="text-gray-500 text-sm">{row.order ?? '—'}</span>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Навигация</h1>
          <p className="text-sm text-gray-500 mt-1">Меню и структура навигации сайта</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(item) => navigate(`/admin/navigation/${item._id}`)}
        onDelete={handleDelete}
        emptyIcon={IconNavigation}
        emptyTitle="Нет пунктов навигации"
        emptyDescription="Навигация создаётся автоматически"
      />
    </div>
  )
}