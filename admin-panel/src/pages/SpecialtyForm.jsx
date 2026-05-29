import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import toast from 'react-hot-toast'

export default function SpecialtyForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const api = useApi()
  const isNew = !id || id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ code: '', name: '', description: '', form: '', duration: '' })

  useEffect(() => {
    if (isNew) return
    api.get(`/specialties/${id}`)
      .then((data) => {
        const item = data.specialty || data
        setForm({
          code: item.code || '',
          name: item.name || '',
          description: item.description || '',
          form: item.form || '',
          duration: item.duration || '',
        })
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (isNew) { await api.post('/specialties', form); toast.success('Специальность создана') }
      else { await api.put(`/specialties/${id}`, form); toast.success('Специальность обновлена') }
      navigate('/admin/specialties')
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="text-center py-12"><div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{isNew ? 'Новая специальность' : 'Редактировать специальность'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Код</label>
            <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Форма обучения</label>
            <input type="text" value={form.form} onChange={(e) => setForm({ ...form, form: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" rows={4} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Срок обучения</label>
          <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition disabled:opacity-50">
            {saving ? 'Сохранение...' : (isNew ? 'Создать' : 'Сохранить')}
          </button>
          <button type="button" onClick={() => navigate('/admin/specialties')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition">Отмена</button>
        </div>
      </form>
    </div>
  )
}