export const img = (path) => {
  if (!path) return ''
  // Если путь уже полный URL — возвращаем как есть
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  // Если это путь к загруженному файлу (из админки/сервера)
  if (path.startsWith('/uploads/')) {
    const apiBase = import.meta.env.VITE_API_URL || ''
    return apiBase + path
  }
  const base = import.meta.env.BASE_URL || '/'
  return base + path.replace(/^\//, '')
}
