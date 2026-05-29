import { useState, useEffect } from 'react'
import { useApi } from '../hooks/useApi'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const api = useApi()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    siteName: 'ГАПОУ ВО «Владимирский политехнический колледж»',
    siteDescription: '',
    email: '',
    phone: '',
    address: '',
    socialLinks: '',
  })

  useEffect(() => {
    api.get('/settings').then((data) => {
      const settings = data.settings || data
      if (settings) {
        setForm({
          siteName: settings.siteName || '',
          siteDescription: settings.siteDescription || '',
          email: settings.email || '',
          phone: settings.phone || '',
          address: settings.address || '',
          socialLinks: typeof settings.socialLinks === 'object' ? JSON.stringify(settings.socialLinks) : (settings.socialLinks || ''),
        })
      }
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form }
      if (payload.socialLinks) {
        try { payload.socialLinks = JSON.parse(payload.socialLinks) } catch { payload.socialLinks = payload.socialLinks }
      }
      await api.put('/settings', payload)
      toast.success('Настройки сохранены')
    } catch (err) { toast.error(err.message) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="text-center py-12"><div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Настройки сайта</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Название сайта</label>
          <input type="text" value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Описание сайта</label>
          <textarea value={form.siteDescription} onChange={(e) => setForm({ ...form, siteDescription: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" rows={2} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
            <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Адрес</label>
          <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Социальные сети (JSON)</label>
          <textarea value={form.socialLinks} onChange={(e) => setForm({ ...form, socialLinks: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm" rows={4} />
        </div>
        <button type="submit" disabled={saving}
          className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition disabled:opacity-50">
          {saving ? 'Сохранение...' : 'Сохранить настройки'}
        </button>
      </form>
    </div>
  )
}