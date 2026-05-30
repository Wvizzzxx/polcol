import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import { IconSchool } from '@tabler/icons-react'
import toast from 'react-hot-toast'

export default function SpecialtiesList() {
  const api = useApi()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/specialties')
      .then((data) => setItems(Array.isArray(data) ? data : data.specialties || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (item) => {
    try {
      await api.delete(`/specialties/${item._id}`)
      toast.success('Специальность удалена')
      setItems((prev) => prev.filter((i) => i._id !== item._id))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const columns = [
    {
      header: 'Код',
      render: (row) => (
        <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
          {row.code}
        </span>
      ),
    },
    {
      header: 'Название',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          {row.profile && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{row.profile}</p>}
        </div>
      ),
    },
    {
      header: 'Срок обучения',
      render: (row) => (
        <span className="text-gray-700 font-medium">{row.duration || '—'}</span>
      ),
    },
    {
      header: 'Места',
      render: (row) => (
        <div className="flex items-center gap-3 text-sm">
          <span className="text-green-600 font-medium">Б: {row.budgetPlaces || 0}</span>
          <span className="text-amber-600 font-medium">П: {row.paidPlaces || 0}</span>
        </div>
      ),
    },
    {
      header: 'Статус',
      render: (row) => (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
          row.isActive !== false ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${row.isActive !== false ? 'bg-green-500' : 'bg-gray-400'}`} />
          {row.isActive !== false ? 'Активна' : 'Неактивна'}
        </span>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Специальности</h1>
          <p className="text-sm text-gray-500 mt-1">Образовательные программы колледжа</p>
        </div>
        <a href="/admin/specialties/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Добавить специальность
        </a>
      </div>
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(item) => navigate(`/admin/specialties/${item._id}`)}
        onDelete={handleDelete}
        emptyIcon={IconSchool}
        emptyTitle="Нет специальностей"
        emptyDescription="Добавьте первую образовательную программу"
        emptyAction={() => navigate('/admin/specialties/new')}
        emptyActionLabel="Добавить специальность"
      />
    </div>
  )
}