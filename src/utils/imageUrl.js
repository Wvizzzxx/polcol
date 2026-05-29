export const img = (path) => {
  const base = import.meta.env.BASE_URL || '/'
  return base + path.replace(/^\//, '')
}