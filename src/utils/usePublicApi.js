const BASE_URL = '/api'

async function publicRequest(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`)
  if (!res.ok) throw new Error('Ошибка загрузки')
  const data = await res.json()
  return data
}

export function usePublicApi() {
  return {
    getPages: () => publicRequest('/pages'),
    getPageByPath: (path) => publicRequest(`/pages/by-path?path=${encodeURIComponent(path.replace(/^\//, ''))}`),
    getNavigation: () => publicRequest('/navigation'),
    getNews: () => publicRequest('/news'),
    getContacts: () => publicRequest('/contacts'),
    getSettings: () => publicRequest('/settings'),
  }
}

export default usePublicApi
