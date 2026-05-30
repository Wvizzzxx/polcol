import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import { IconFile } from '@tabler/icons-react'
import toast from 'react-hot-toast'

export default function DocumentsList() {
  const api = useApi()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/documents')
      .then((data) => setItems(Array.isArray(data) ? data : data.documents || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (item) => {
    try {
      await api.delete(`/documents/${item._id}`)
      toast.success('Документ удалён')
      setItems((prev) => prev.filter((i) => i._id !== item._id))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const columns = [
    {
      header: 'Название',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <IconFile className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.title}</p>
            {row.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{row.description}</p>}
          </div>
        </div>
      ),
    },
    {
      header: 'Категория',
      render: (row) => row.category ? (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
          {row.category}
        </span>
      ) : '—',
    },
    {
      header: 'Файл',
      render: (row) => row.fileUrl ? (
        <a href={row.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm underline">
          Открыть
        </a>
      ) : '—',
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
          <h1 className="text-2xl font-bold text-gray-800">Документы</h1>
          <p className="text-sm text-gray-500 mt-1">Управление документами колледжа</p>
        </div>
        <a href="/admin/documents/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Добавить документ
        </a>
      </div>
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(item) => navigate(`/admin/documents/${item._id}`)}
        onDelete={handleDelete}
        emptyIcon={IconFile}
        emptyTitle="Нет документов"
        emptyDescription="Добавьте первый документ"
        emptyAction={() => navigate('/admin/documents/new')}
        emptyActionLabel="Добавить документ"
      />
    </div>
  )
}