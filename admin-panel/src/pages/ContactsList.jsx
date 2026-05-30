import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import { IconPhone } from '@tabler/icons-react'
import toast from 'react-hot-toast'

export default function ContactsList() {
  const api = useApi()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/contacts')
      .then((data) => setItems(Array.isArray(data) ? data : data.contacts || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (item) => {
    try {
      // Контакты — массив, загружаем все, удаляем нужный, сохраняем
      const existing = items
      const updated = existing.filter((c) => c._id !== item._id)
      await api.put('/contacts', updated)
      setItems(updated)
      toast.success('Контакт удалён')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const typeLabels = {
    address: 'Адрес',
    phone: 'Телефон',
    email: 'Email',
    social: 'Соц. сеть',
    reception: 'Приёмная',
    schedule: 'График',
  }

  const typeBadge = (type) => {
    const colors = {
      address: 'bg-blue-50 text-blue-700 border-blue-100',
      phone: 'bg-green-50 text-green-700 border-green-100',
      email: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      social: 'bg-purple-50 text-purple-700 border-purple-100',
      reception: 'bg-amber-50 text-amber-700 border-amber-100',
      schedule: 'bg-gray-50 text-gray-700 border-gray-100',
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[type] || colors.schedule}`}>
        {typeLabels[type] || type}
      </span>
    )
  }

  const columns = [
    {
      header: 'Тип',
      render: (row) => typeBadge(row.type),
    },
    {
      header: 'Название / Метка',
      render: (row) => (
        <span className="font-medium text-gray-900">{row.label || '—'}</span>
      ),
    },
    {
      header: 'Значение',
      render: (row) => (
        <span className="text-gray-700 text-sm">{row.value}</span>
      ),
    },
    {
      header: 'Иконка',
      render: (row) => row.icon ? (
        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{row.icon}</span>
      ) : '—',
    },
    {
      header: 'Ссылка',
      render: (row) => row.link ? (
        <a href={row.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm underline">
          {row.link.length > 30 ? row.link.substring(0, 30) + '...' : row.link}
        </a>
      ) : '—',
    },
    {
      header: 'Статус',
      render: (row) => (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
          row.isActive !== false ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${row.isActive !== false ? 'bg-green-500' : 'bg-gray-400'}`} />
          {row.isActive !== false ? 'Активен' : 'Скрыт'}
        </span>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Контакты</h1>
          <p className="text-sm text-gray-500 mt-1">Контактная информация колледжа: адреса, телефоны, email, соцсети</p>
        </div>
        <a href="/admin/contacts/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Добавить контакт
        </a>
      </div>
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(item) => navigate(`/admin/contacts/${item._id}`)}
        onDelete={handleDelete}
        emptyIcon={IconPhone}
        emptyTitle="Нет контактов"
        emptyDescription="Добавьте контактную информацию"
        emptyAction={() => navigate('/admin/contacts/new')}
        emptyActionLabel="Добавить контакт"
      />
    </div>
  )
}