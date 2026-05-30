import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import toast from 'react-hot-toast'

export default function ContactForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const api = useApi()
  const isNew = !id || id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    type: 'phone',
    label: '',
    value: '',
    icon: '',
    link: '',
    order: 0,
    isActive: true,
  })

  useEffect(() => {
    if (isNew) return
    api.get(`/contacts/${id}`)
      .then((data) => {
        const item = data.contact || data
        setForm({
          type: item.type || 'phone',
          label: item.label || '',
          value: item.value || '',
          icon: item.icon || '',
          link: item.link || '',
          order: item.order || 0,
          isActive: item.isActive !== false,
        })
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (isNew) {
        await api.post('/contacts', form)
        toast.success('Контакт создан')
      } else {
        await api.put(`/contacts/${id}`, form)
        toast.success('Контакт обновлён')
      }
      navigate('/admin/contacts')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{isNew ? 'Новый контакт' : 'Редактировать контакт'}</h1>
        <p className="text-sm text-gray-500 mt-1">Контактная информация колледжа</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Тип</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition"
              required
            >
              <option value="address">Адрес</option>
              <option value="phone">Телефон</option>
              <option value="email">Email</option>
              <option value="social">Социальная сеть</option>
              <option value="reception">Приёмная</option>
              <option value="schedule">График работы</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Иконка</label>
            <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="phone, mail, map-pin, clock, vk..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Название / Метка</label>
          <input type="text" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}
            placeholder="Приемная директора, Email, ВКонтакте..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Значение *</label>
          <input type="text" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })}
            placeholder="+7 (4922) 32-42-24, vladpk@yandex.ru..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition"
            required />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ссылка (необязательно)</label>
          <input type="text" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder="tel:+74922324224, mailto:..., https://..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Порядок</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer py-2.5">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm font-medium text-gray-700">Активен</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition shadow-sm disabled:opacity-50">
            {saving ? 'Сохранение...' : (isNew ? 'Создать' : 'Сохранить')}
          </button>
          <button type="button" onClick={() => navigate('/admin/contacts')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium transition">Отмена</button>
        </div>
      </form>
    </div>
  )
}