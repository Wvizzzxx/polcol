import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewsList from './pages/NewsList'
import NewsForm from './pages/NewsForm'
import PagesList from './pages/PagesList'
import PageForm from './pages/PageForm'
import NavigationList from './pages/NavigationList'
import NavigationForm from './pages/NavigationForm'
import EmployeesList from './pages/EmployeesList'
import EmployeeForm from './pages/EmployeeForm'
import SpecialtiesList from './pages/SpecialtiesList'
import SpecialtyForm from './pages/SpecialtyForm'
import MediaManager from './pages/MediaManager'
import ContactsList from './pages/ContactsList'
import ContactForm from './pages/ContactForm'
import MessagesList from './pages/MessagesList'
import DocumentsList from './pages/DocumentsList'
import DocumentForm from './pages/DocumentForm'
import EventsList from './pages/EventsList'
import EventForm from './pages/EventForm'
import HeroList from './pages/HeroList'
import HeroForm from './pages/HeroForm'
import SettingsPage from './pages/SettingsPage'
import UsersList from './pages/UsersList'
import UserForm from './pages/UserForm'

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        
        {/* Новости */}
        <Route path="news" element={<NewsList />} />
        <Route path="news/:id" element={<NewsForm />} />
        
        {/* Страницы */}
        <Route path="pages" element={<PagesList />} />
        <Route path="pages/:id" element={<PageForm />} />
        
        {/* Навигация */}
        <Route path="navigation" element={<NavigationList />} />
        <Route path="navigation/:id" element={<NavigationForm />} />
        
        {/* Сотрудники */}
        <Route path="employees" element={<EmployeesList />} />
        <Route path="employees/:id" element={<EmployeeForm />} />
        
        {/* Специальности */}
        <Route path="specialties" element={<SpecialtiesList />} />
        <Route path="specialties/:id" element={<SpecialtyForm />} />
        
        {/* Медиа */}
        <Route path="media" element={<MediaManager />} />
        
        {/* Контакты */}
        <Route path="contacts" element={<ContactsList />} />
        <Route path="contacts/new" element={<ContactForm />} />
        <Route path="contacts/:id" element={<ContactForm />} />
        
        {/* Сообщения */}
        <Route path="messages" element={<MessagesList />} />
        
        {/* Документы */}
        <Route path="documents" element={<DocumentsList />} />
        <Route path="documents/:id" element={<DocumentForm />} />
        
        {/* Мероприятия */}
        <Route path="events" element={<EventsList />} />
        <Route path="events/:id" element={<EventForm />} />
        
        {/* Hero-секции */}
        <Route path="heroes" element={<HeroList />} />
        <Route path="heroes/:id" element={<HeroForm />} />
        
        {/* Настройки */}
        <Route path="settings" element={<SettingsPage />} />
        
        {/* Пользователи */}
        <Route path="users" element={<UsersList />} />
        <Route path="users/:id" element={<UserForm />} />
      </Route>
      <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}