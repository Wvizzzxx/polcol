import { useState, useEffect } from 'react'
import { useApi } from '../hooks/useApi'
import DataTable from '../components/DataTable'
import toast from 'react-hot-toast'

export default function MessagesList() {
  const api = useApi()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const loadItems = async () => {
    try {
      const data = await api.get('/contacts/messages')
      setItems(Array.isArray(data) ? data : data.messages || [])
    } catch (err) { toast.error(err.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { loadItems() }, [])

  const handleDelete = async (item) => {
    if (!confirm('Удалить сообщение?')) return
    await api.delete(`/contacts/messages/${item._id}`)
    toast.success('Сообщение удалено')
    loadItems()
  }

  const columns = [
    { header: 'Имя', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Тема', accessor: 'subject' },
    { header: 'Сообщение', render: (row) => <span className="truncate block max-w-xs">{row.message}</span> },
    { header: 'Дата', render: (row) => new Date(row.createdAt).toLocaleDateString('ru-RU') },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Сообщения</h1>
      </div>
      <DataTable columns={columns} data={items} loading={loading} onDelete={handleDelete} />
    </div>
  )
}