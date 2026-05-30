import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import { IconUsers } from '@tabler/icons-react'
import toast from 'react-hot-toast'

export default function EmployeesList() {
  const api = useApi()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/employees')
      .then((data) => setItems(Array.isArray(data) ? data : data.employees || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (item) => {
    try {
      await api.delete(`/employees/${item._id}`)
      toast.success('Сотрудник удалён')
      setItems((prev) => prev.filter((i) => i._id !== item._id))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const columns = [
    {
      header: 'Фото',
      render: (row) => row.photo ? (
        <img src={row.photo} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
          {row.fullName?.[0] || 'С'}
        </div>
      ),
    },
    {
      header: 'ФИО',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.fullName}</p>
          {row.email && <p className="text-xs text-gray-400 mt-0.5">{row.email}</p>}
        </div>
      ),
    },
    {
      header: 'Должность',
      render: (row) => (
        <span className="text-gray-700">{row.position}</span>
      ),
    },
    {
      header: 'Кафедра',
      render: (row) => row.department ? (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
          {row.department}
        </span>
      ) : '—',
    },
    {
      header: 'Статус',
      render: (row) => (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
          row.isActive !== false ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${row.isActive !== false ? 'bg-green-500' : 'bg-gray-400'}`} />
          {row.isActive !== false ? 'Активен' : 'Неактивен'}
        </span>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Сотрудники</h1>
          <p className="text-sm text-gray-500 mt-1">Преподаватели и сотрудники колледжа</p>
        </div>
        <a href="/admin/employees/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Добавить сотрудника
        </a>
      </div>
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(item) => navigate(`/admin/employees/${item._id}`)}
        onDelete={handleDelete}
        emptyIcon={IconUsers}
        emptyTitle="Нет сотрудников"
        emptyDescription="Добавьте первого сотрудника"
        emptyAction={() => navigate('/admin/employees/new')}
        emptyActionLabel="Добавить сотрудника"
      />
    </div>
  )
}