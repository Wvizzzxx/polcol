import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import toast from 'react-hot-toast'
import { IconFile, IconUpload, IconX } from '@tabler/icons-react'

export default function DocumentForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const api = useApi()
  const fileInputRef = useRef(null)
  const isNew = !id || id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    file: '',
    category: '',
    description: '',
    version: '1.0',
    page: '',
    isPublished: true,
    order: 0,
  })
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    if (isNew) return
    api.get(`/documents/${id}`)
      .then((data) => {
        const item = data.document || data
        setForm({
          title: item.title || '',
          file: item.file || '',
          category: item.category || '',
          description: item.description || '',
          version: item.version || '1.0',
          page: item.page || '',
          isPublished: item.isPublished !== false,
          order: item.order || 0,
        })
        if (item.file) {
          const parts = item.file.split('/')
          setFileName(parts[parts.length - 1])
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/webp',
    ]

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error('Неподдерживаемый формат файла. Допустимы: PDF, Word, Excel, PowerPoint, TXT, изображения')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const result = await api.upload('/media/upload', formData)
      const fileUrl = result.url || result.fileUrl || result.path
      setForm((prev) => ({ ...prev, file: fileUrl }))
      setFileName(selectedFile.name)
      toast.success('Файл загружен')
    } catch (err) {
      toast.error('Ошибка загрузки: ' + err.message)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (isNew) {
        await api.post('/documents', form)
        toast.success('Документ создан')
      } else {
        await api.put(`/documents/${id}`, form)
        toast.success('Документ обновлён')
      }
      navigate('/admin/documents')
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
        <h1 className="text-2xl font-bold text-gray-800">{isNew ? 'Новый документ' : 'Редактировать документ'}</h1>
        <p className="text-sm text-gray-500 mt-1">Загрузка и управление документами колледжа</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Название *</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Приказ о зачислении, Устав колледжа..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition"
            required />
        </div>

        {/* Загрузка файла */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Файл документа</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors bg-gray-50/50">
            {form.file && fileName ? (
              <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <IconFile className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">{fileName}</p>
                    <p className="text-xs text-gray-400">{form.file}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { setForm((prev) => ({ ...prev, file: '' })); setFileName('') }}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <IconUpload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-2">Нажмите или перетащите файл</p>
                <p className="text-xs text-gray-400">PDF, Word, Excel, PowerPoint, TXT, изображения</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.webp"
              className="hidden"
              disabled={uploading}
            />
            {!form.file && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {uploading ? 'Загрузка...' : 'Выбрать файл'}
              </button>
            )}
          </div>
          {form.file && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 transition"
            >
              {uploading ? 'Загрузка...' : 'Заменить файл'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Категория</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition"
            >
              <option value="">Выберите категорию</option>
              <option value="Приказы">Приказы</option>
              <option value="Устав">Устав</option>
              <option value="Лицензии">Лицензии</option>
              <option value="Аккредитация">Аккредитация</option>
              <option value="Образование">Образование</option>
              <option value="Отчёты">Отчёты</option>
              <option value="Протоколы">Протоколы</option>
              <option value="Другое">Другое</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Версия</label>
            <input type="text" value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })}
              placeholder="1.0"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Описание</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Краткое описание документа..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition resize-none" rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Раздел сайта</label>
            <input type="text" value={form.page} onChange={(e) => setForm({ ...form, page: e.target.value })}
              placeholder="/sveden/documents"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Порядок</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="text-sm font-medium text-gray-700">Опубликован</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving || uploading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition shadow-sm disabled:opacity-50">
            {saving ? 'Сохранение...' : (isNew ? 'Создать' : 'Сохранить')}
          </button>
          <button type="button" onClick={() => navigate('/admin/documents')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium transition">Отмена</button>
        </div>
      </form>
    </div>
  )
}