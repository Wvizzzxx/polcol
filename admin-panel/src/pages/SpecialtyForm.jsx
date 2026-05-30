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
  const [form, setForm] = useState({
    code: '', name: '', description: '', duration: '',
    budgetPlaces: 0, paidPlaces: 0, costPerYear: 0,
    forms: [], fgosCode: ''
  })

  useEffect(() => {
    if (isNew) return
    api.get(`/specialties/${id}`)
      .then((data) => {
        const item = data.specialty || data
        setForm({
          code: item.code || '',
          name: item.name || '',
          description: item.description || '',
          duration: item.duration || '',
          budgetPlaces: item.budgetPlaces || 0,
          paidPlaces: item.paidPlaces || 0,
          costPerYear: item.costPerYear || 0,
          forms: item.forms || [],
          fgosCode: item.fgosCode || '',
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

  const toggleForm = (val) => {
    setForm(prev => ({
      ...prev,
      forms: prev.forms.includes(val)
        ? prev.forms.filter(f => f !== val)
        : [...prev.forms, val]
    }))
  }

  if (loading) return <div className="text-center py-12"><div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{isNew ? 'Новая специальность' : 'Редактировать специальность'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Код</label>
            <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Срок обучения</label>
            <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="2 года 10 месяцев" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" rows={4}></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Код ФГОС</label>
          <input type="text" value={form.fgosCode || ''} onChange={(e) => setForm({ ...form, fgosCode: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Формы обучения</label>
          <div className="flex gap-3">
            {['Очная', 'Заочная', 'Очно-заочная'].map(f => (
              <label key={f} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.forms.includes(f)} onChange={() => toggleForm(f)} className="rounded" />
                {f}
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Бюджет</label>
            <input type="number" value={form.budgetPlaces} onChange={(e) => setForm({ ...form, budgetPlaces: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Платные</label>
            <input type="number" value={form.paidPlaces} onChange={(e) => setForm({ ...form, paidPlaces: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Стоимость/год</label>
            <input type="number" value={form.costPerYear} onChange={(e) => setForm({ ...form, costPerYear: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
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