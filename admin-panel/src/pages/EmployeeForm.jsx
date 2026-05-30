import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import toast from 'react-hot-toast'
import { IconUpload, IconX, IconPlus } from '@tabler/icons-react'

export default function EmployeeForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const api = useApi()
  const photoInputRef = useRef(null)
  const isNew = !id || id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    position: '',
    department: '',
    education: '',
    experience: 0,
    category: '',
    phone: '',
    email: '',
    photo: '',
    bio: '',
    achievements: [],
    order: 0,
    isActive: true,
  })
  const [newAchievement, setNewAchievement] = useState('')

  useEffect(() => {
    if (isNew) return
    api.get(`/employees/${id}`)
      .then((data) => {
        const item = data.employee || data
        setForm({
          fullName: item.fullName || '',
          position: item.position || '',
          department: item.department || '',
          education: item.education || '',
          experience: item.experience || 0,
          category: item.category || '',
          phone: item.phone || '',
          email: item.email || '',
          photo: item.photo || '',
          bio: item.bio || '',
          achievements: item.achievements || [],
          order: item.order || 0,
          isActive: item.isActive !== false,
        })
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Поддерживаются только изображения')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const result = await api.upload('/media/upload', formData)
      const photoUrl = result.url || result.fileUrl || result.path
      setForm((prev) => ({ ...prev, photo: photoUrl }))
      toast.success('Фото загружено')
    } catch (err) {
      toast.error('Ошибка загрузки: ' + err.message)
    } finally {
      setUploading(false)
      if (photoInputRef.current) photoInputRef.current.value = ''
    }
  }

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setForm((prev) => ({ ...prev, achievements: [...prev.achievements, newAchievement.trim()] }))
      setNewAchievement('')
    }
  }

  const removeAchievement = (index) => {
    setForm((prev) => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (isNew) {
        await api.post('/employees', form)
        toast.success('Сотрудник добавлен')
      } else {
        await api.put(`/employees/${id}`, form)
        toast.success('Сотрудник обновлён')
      }
      navigate('/admin/employees')
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
        <h1 className="text-2xl font-bold text-gray-800">{isNew ? 'Новый сотрудник' : 'Редактировать сотрудника'}</h1>
        <p className="text-sm text-gray-500 mt-1">Информация о преподавателе или сотруднике</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Основная информация */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Основная информация</h2>

          <div className="flex items-start gap-5">
            {/* Фото */}
            <div className="flex-shrink-0">
              <div className="relative group">
                {form.photo ? (
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-gray-200">
                    <img src={form.photo} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-gray-200">
                    {form.fullName?.[0] || '?'}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <IconUpload className="w-5 h-5 text-white" />
                </button>
                <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </div>
              {uploading && <p className="text-xs text-blue-600 mt-1">Загрузка...</p>}
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">ФИО *</label>
                <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition"
                  required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Должность *</label>
                <input type="text" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}
                  placeholder="Преподаватель, Зав. кафедрой..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition"
                  required />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Кафедра</label>
              <input type="text" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                placeholder="Информатика, Машиностроение..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Категория</label>
              <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Высшая, Первая..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Образование</label>
            <input type="text" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })}
              placeholder="Высшее, ВГУ, Факультет информатики..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Стаж работы (лет)</label>
            <input type="number" value={form.experience} onChange={(e) => setForm({ ...form, experience: Number(e.target.value) })}
              min="0"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
          </div>
        </div>

        {/* Контакты */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Контакты</h2>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Телефон</label>
              <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+7 (4922) XXX-XX-XX"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@vpk.ru"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
            </div>
          </div>
        </div>

        {/* Описание */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Описание</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">О себе</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Краткая биография, профессиональные интересы..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition resize-none" rows={4} />
          </div>
        </div>

        {/* Достижения */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Достижения и награды</h2>
          <div className="flex gap-2">
            <input type="text" value={newAchievement} onChange={(e) => setNewAchievement(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
              placeholder="Добавить достижение..."
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
            <button type="button" onClick={addAchievement}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition">
              <IconPlus className="w-5 h-5" />
            </button>
          </div>
          {form.achievements.length > 0 && (
            <ul className="space-y-2">
              {form.achievements.map((a, i) => (
                <li key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5 group">
                  <span className="text-sm text-gray-700">{a}</span>
                  <button type="button" onClick={() => removeAchievement(i)}
                    className="p-1 rounded text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                    <IconX className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Настройки */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Настройки</h2>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Активен</label>
              <p className="text-xs text-gray-400">Отображается на сайте</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Порядок</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
          </div>
        </div>

        <div className="flex gap-3 pb-6">
          <button type="submit" disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition shadow-sm disabled:opacity-50">
            {saving ? 'Сохранение...' : (isNew ? 'Создать' : 'Сохранить')}
          </button>
          <button type="button" onClick={() => navigate('/admin/employees')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium transition">Отмена</button>
        </div>
      </form>
    </div>
  )
}