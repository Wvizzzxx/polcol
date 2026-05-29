import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import toast from 'react-hot-toast'

export default function PageForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const api = useApi()
  const isNew = !id || id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', slug: '', content: '', metaDescription: '' })

  useEffect(() => {
    if (isNew) return
    api.get(`/pages/${id}`)
      .then((data) => {
        const item = data.page || data
        setForm({
          title: item.title || '',
          slug: item.slug || '',
          content: item.content || '',
          metaDescription: item.metaDescription || '',
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
        await api.post('/pages', form)
        toast.success('Страница создана')
      } else {
        await api.put(`/pages/${id}`, form)
        toast.success('Страница обновлена')
      }
      navigate('/admin/pages')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-12"><div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{isNew ? 'Новая страница' : 'Редактировать страницу'}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-3xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL (slug)</label>
          <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Содержание</label>
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
            rows={15} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta описание</label>
          <textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" rows={2} />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition disabled:opacity-50">
            {saving ? 'Сохранение...' : (isNew ? 'Создать' : 'Сохранить')}
          </button>
          <button type="button" onClick={() => navigate('/admin/pages')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition">Отмена</button>
        </div>
      </form>
    </div>
  )
}