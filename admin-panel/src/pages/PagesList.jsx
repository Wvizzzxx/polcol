import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import { IconFileText } from '@tabler/icons-react'
import toast from 'react-hot-toast'

export default function PagesList() {
  const api = useApi()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/pages')
      .then((data) => setItems(Array.isArray(data) ? data : data.pages || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (item) => {
    try {
      await api.delete(`/pages/${item._id}`)
      toast.success('Страница удалена')
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
          <code className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded mt-0.5 inline-block">{row.path}</code>
        </div>
      ),
    },
    {
      header: 'Секций',
      render: (row) => (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
          {row.sections?.length || 0}
        </span>
      ),
    },
    {
      header: 'SEO',
      render: (row) => row.seo?.title ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Настроено
        </span>
      ) : (
        <span className="text-xs text-gray-400">—</span>
      ),
    },
    {
      header: 'Обновлено',
      render: (row) => (
        <span className="text-gray-500 whitespace-nowrap text-sm">
          {new Date(row.updatedAt).toLocaleDateString('ru-RU')}
        </span>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Страницы</h1>
          <p className="text-sm text-gray-500 mt-1">Контентные страницы сайта</p>
        </div>
        <a href="/admin/pages/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Добавить страницу
        </a>
      </div>
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(item) => navigate(`/admin/pages/${item._id}`)}
        onDelete={handleDelete}
        emptyIcon={IconFileText}
        emptyTitle="Нет страниц"
        emptyDescription="Создайте первую контентную страницу"
        emptyAction={() => navigate('/admin/pages/new')}
        emptyActionLabel="Создать страницу"
      />
    </div>
  )
}