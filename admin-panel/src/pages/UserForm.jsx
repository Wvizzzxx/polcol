import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import toast from 'react-hot-toast'

export default function UserForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const api = useApi()
  const isNew = !id || id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'editor' })

  useEffect(() => {
    if (isNew) return
    api.get(`/auth/users/${id}`).then((data) => {
      const item = data.user || data
      setForm({ name: item.name || '', email: item.email || '', password: '', role: item.role || 'editor' })
    }).catch((err) => toast.error(err.message)).finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form }
      if (!payload.password && !isNew) delete payload.password
      if (isNew) { await api.post('/auth/register', payload); toast.success('Пользователь создан') }
      else { await api.put(`/auth/users/${id}`, payload); toast.success('Пользователь обновлён') }
      navigate('/admin/users')
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="text-center py-12"><div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{isNew ? 'Новый пользователь' : 'Редактировать пользователя'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Пароль {!isNew && '(оставьте пустым, чтобы не менять)'}</label>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required={isNew} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Роль</label>
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
            <option value="editor">Редактор</option>
            <option value="admin">Администратор</option>
            <option value="superadmin">Супер-администратор</option>
            <option value="viewer">Наблюдатель</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition disabled:opacity-50">
            {saving ? 'Сохранение...' : (isNew ? 'Создать' : 'Сохранить')}
          </button>
          <button type="button" onClick={() => navigate('/admin/users')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition">Отмена</button>
        </div>
      </form>
    </div>
  )
}