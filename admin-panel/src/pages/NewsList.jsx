import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import { IconNews } from '@tabler/icons-react'
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

  const statusBadge = (status) => {
    const styles = {
      published: 'bg-green-50 text-green-700 border-green-200',
      draft: 'bg-amber-50 text-amber-700 border-amber-200',
      archived: 'bg-gray-50 text-gray-500 border-gray-200',
    }
    const labels = {
      published: 'Опубликовано',
      draft: 'Черновик',
      archived: 'В архиве',
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.draft}`}>
        {labels[status] || status}
      </span>
    )
  }

  const columns = [
    {
      header: 'Обложка',
      render: (row) => row.coverImage ? (
        <img src={row.coverImage} alt="" className="w-12 h-9 rounded-lg object-cover border border-gray-200" />
      ) : (
        <div className="w-12 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
          <IconNews className="w-4 h-4 text-gray-300" />
        </div>
      ),
    },
    {
      header: 'Заголовок',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900 line-clamp-1">{row.title}</p>
          {row.category && <p className="text-xs text-gray-400 mt-0.5">{row.category}</p>}
        </div>
      ),
    },
    {
      header: 'Статус',
      render: (row) => statusBadge(row.status),
    },
    {
      header: 'Автор',
      render: (row) => row.author?.name || '—',
    },
    {
      header: 'Дата',
      render: (row) => (
        <span className="text-gray-500 whitespace-nowrap">
          {new Date(row.publishedAt || row.createdAt).toLocaleDateString('ru-RU')}
        </span>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Новости</h1>
          <p className="text-sm text-gray-500 mt-1">Управление новостями и публикациями</p>
        </div>
        <a
          href="/admin/news/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Добавить новость
        </a>
      </div>
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(item) => navigate(`/admin/news/${item._id}`)}
        onDelete={handleDelete}
        emptyIcon={IconNews}
        emptyTitle="Нет новостей"
        emptyDescription="Добавьте первую новость на сайт"
        emptyAction={() => navigate('/admin/news/new')}
        emptyActionLabel="Создать новость"
      />
    </div>
  )
}