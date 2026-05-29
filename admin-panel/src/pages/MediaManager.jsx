import { useState, useEffect, useRef } from 'react'
import { useApi } from '../hooks/useApi'
import toast from 'react-hot-toast'

export default function MediaManager() {
  const api = useApi()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  const loadItems = async () => {
    try {
      const data = await api.get('/media')
      setItems(Array.isArray(data) ? data : data.media || [])
    } catch (err) { toast.error(err.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { loadItems() }, [])

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      await api.upload('/media/upload', formData)
      toast.success('Файл загружен')
      loadItems()
      fileRef.current.value = ''
    } catch (err) { toast.error(err.message) }
    finally { setUploading(false) }
  }

  const handleDelete = async (item) => {
    if (!confirm(`Удалить файл "${item.originalName || item.filename}"?`)) return
    try {
      await api.delete(`/media/${item._id}`)
      toast.success('Файл удалён')
      loadItems()
    } catch (err) { toast.error(err.message) }
  }

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url)
    toast.success('URL скопирован')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Медиафайлы</h1>
        <div className="flex gap-2">
          <input type="file" ref={fileRef} className="text-sm" />
          <button onClick={handleUpload} disabled={uploading}
            className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm transition disabled:opacity-50">
            {uploading ? 'Загрузка...' : 'Загрузить'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12"><div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div></div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow"><p className="text-gray-500">Нет файлов</p></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden group">
              <div className="aspect-square bg-gray-100 relative">
                {item.mimetype?.startsWith('image/') ? (
                  <img src={`/uploads/${item.filename}`} alt={item.originalName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">📄</div>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs truncate text-gray-600">{item.originalName || item.filename}</p>
                <div className="flex gap-1 mt-1">
                  <button onClick={() => copyUrl(`/uploads/${item.filename}`)}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded hover:bg-blue-200">Копировать</button>
                  <button onClick={() => handleDelete(item)}
                    className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded hover:bg-red-200">Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}