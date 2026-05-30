import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import { IconUserCog } from '@tabler/icons-react'
import toast from 'react-hot-toast'

export default function UsersList() {
  const api = useApi()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/auth/users')
      .then((data) => setItems(Array.isArray(data) ? data : data.users || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (item) => {
    try {
      await api.delete(`/auth/users/${item._id}`)
      toast.success('Пользователь удалён')
      setItems((prev) => prev.filter((i) => i._id !== item._id))
    } catch (err) {
      toast.error(err.message)
    }
  }

  const roleBadge = (role) => {
    const styles = {
      superadmin: 'bg-red-50 text-red-700 border-red-200',
      admin: 'bg-blue-50 text-blue-700 border-blue-200',
      editor: 'bg-green-50 text-green-700 border-green-200',
      viewer: 'bg-gray-50 text-gray-500 border-gray-200',
    }
    const labels = {
      superadmin: 'Суперадмин',
      admin: 'Админ',
      editor: 'Редактор',
      viewer: 'Наблюдатель',
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[role] || styles.viewer}`}>
        {labels[role] || role}
      </span>
    )
  }

  const columns = [
    {
      header: 'Пользователь',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {row.name?.[0] || row.email?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Роль',
      render: (row) => roleBadge(row.role),
    },
    {
      header: 'Дата регистрации',
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
          <h1 className="text-2xl font-bold text-gray-800">Пользователи</h1>
          <p className="text-sm text-gray-500 mt-1">Управление аккаунтами админ-панели</p>
        </div>
        <a href="/admin/users/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Добавить пользователя
        </a>
      </div>
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(item) => navigate(`/admin/users/${item._id}`)}
        onDelete={handleDelete}
        emptyIcon={IconUserCog}
        emptyTitle="Нет пользователей"
        emptyDescription="Добавьте первого пользователя"
        emptyAction={() => navigate('/admin/users/new')}
        emptyActionLabel="Добавить пользователя"
      />
    </div>
  )
}