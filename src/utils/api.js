const API_BASE = import.meta.env.VITE_API_URL || '/api';

class ApiClient {
  constructor() {
    this.base = API_BASE;
  }

  async get(endpoint) {
    const res = await fetch(`${this.base}${endpoint}`);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || `HTTP ${res.status}`);
    }
    return res.json();
  }

  async post(endpoint, body) {
    const res = await fetch(`${this.base}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
    return data;
  }

  // Публичный контент для всего SPA
  getContent() {
    return this.get('/public/content');
  }

  // Hero-секции
  getHeroes() {
    return this.get('/heroes');
  }

  getHeroByKey(key) {
    return this.get(`/heroes/key/${key}`);
  }

  // Новости
  getNews() {
    return this.get('/news');
  }

  getNewsById(id) {
    return this.get(`/news/${id}`);
  }

  // Страницы (CMS)
  getPageByPath(path) {
    return this.get(`/pages/by-path?path=${encodeURIComponent(path)}`);
  }

  // Навигация
  getNavigation() {
    return this.get('/navigation');
  }

  // Сотрудники
  getEmployees() {
    return this.get('/employees');
  }

  getEmployeeById(id) {
    return this.get(`/employees/${id}`);
  }

  // Специальности
  getSpecialties() {
    return this.get('/specialties');
  }

  // Документы
  getDocuments() {
    return this.get('/documents');
  }

  // Мероприятия
  getEvents() {
    return this.get('/events');
  }

  // Контакты
  getContacts() {
    return this.get('/contacts');
  }

  // Настройки
  getSettings() {
    return this.get('/settings');
  }

  // Отправка сообщения
  sendContactMessage(data) {
    return this.post('/public/contact-message', data);
  }
}

const api = new ApiClient();
export default api;