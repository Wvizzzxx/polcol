import { useAuth } from '../context/AuthContext'

const BASE_URL = '/api'

export function useApi() {
  const { token, logout } = useAuth()

  const request = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    }

    const config = {
      ...options,
      headers,
    }

    if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body)
    }

    const res = await fetch(url, config)
    
    if (res.status === 401) {
      logout()
      throw new Error('Сессия истекла')
    }

    const data = await res.json()
    
    if (!res.ok) {
      throw new Error(data.message || data.error || 'Произошла ошибка')
    }

    return data
  }

  const api = {
    get: (endpoint) => request(endpoint),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body }),
    put: (endpoint, body) => request(endpoint, { method: 'PUT', body }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
    upload: (endpoint, formData) => request(endpoint, { 
      method: 'POST', 
      body: formData,
      headers: {}, 
    }),
  }

  return api
}

export default useApi