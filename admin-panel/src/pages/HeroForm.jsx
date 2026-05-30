import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import toast from 'react-hot-toast'

export default function HeroForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const api = useApi()
  const isNew = id === 'new'

  const [form, setForm] = useState({
    key: 'main',
    badge: '',
    title: '',
    titleHighlight: '',
    subtitle: '',
    backgroundImage: '',
    buttonText: '',
    buttonLink: '',
    secondaryButtonText: '',
    secondaryButtonLink: '',
    isActive: true,
    order: 0,
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isNew && id) {
      setLoading(true)
      api.get(`/heroes/${id}`)
        .then(data => setForm(data))
        .catch(err => toast.error(err.message))
        .finally(() => setLoading(false))
    }
  }, [id, isNew])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (isNew) {
        await api.post('/heroes', form)
        toast.success('Hero-секция создана')
      } else {
        await api.put(`/heroes/${id}`, form)
        toast.success('Hero-секция обновлена')
      }
      navigate('/admin/heroes')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const fields = [
    { name: 'key', label: 'Ключ (unique)', type: 'text', required: true },
    { name: 'badge', label: 'Badge (надпись)', type: 'text' },
    { name: 'title', label: 'Заголовок', type: 'text', required: true },
    { name: 'titleHighlight', label: 'Выделенная часть заголовка', type: 'text' },
    { name: 'subtitle', label: 'Подзаголовок', type: 'textarea' },
    { name: 'backgroundImage', label: 'Фоновое изображение (URL)', type: 'text' },
    { name: 'buttonText', label: 'Текст основной кнопки', type: 'text' },
    { name: 'buttonLink', label: 'Ссылка основной кнопки', type: 'text' },
    { name: 'secondaryButtonText', label: 'Текст второй кнопки', type: 'text' },
    { name: 'secondaryButtonLink', label: 'Ссылка второй кнопки', type: 'text' },
    { name: 'order', label: 'Порядок', type: 'number' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isNew ? 'Новая Hero-секция' : 'Редактирование Hero-секции'}
        </h1>
        <button
          onClick={() => navigate('/admin/heroes')}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Назад
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl">
        {fields.map(f => (
          <div key={f.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea
                name={f.name}
                value={form[f.name] || ''}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <input
                type={f.type}
                name={f.name}
                value={form[f.name] ?? ''}
                onChange={handleChange}
                required={f.required}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        ))}

        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="rounded"
            />
            Активна
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg text-sm transition disabled:opacity-50"
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/heroes')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm transition"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}