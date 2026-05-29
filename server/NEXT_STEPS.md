# 🚀 ПРОЕКТ ГОТОВ: Серверная часть (Backend) — Node.js + Express + MongoDB

## ✅ Что сделано (Блок 1: Backend целиком)

### Структура server/
```
server/
├── config/
│   └── db.js                  # Подключение к MongoDB
├── controllers/
│   ├── authController.js      # Логин, CRUD пользователей
│   ├── newsController.js      # CRUD новостей
│   ├── pageController.js      # CRUD страниц контента
│   ├── navigationController.js # Управление навигацией
│   ├── employeeController.js  # CRUD сотрудников
│   ├── specialtyController.js # CRUD специальностей
│   ├── mediaController.js     # Загрузка/удаление файлов
│   ├── contactController.js   # Контакты + сообщения
│   ├── documentController.js  # CRUD документов
│   ├── settingsController.js  # Настройки сайта
│   ├── eventController.js     # CRUD мероприятий
│   └── dashboardController.js # Статистика/дашборд
├── middleware/
│   ├── auth.js                # JWT-аутентификация + проверка ролей
│   └── upload.js              # Multer загрузка файлов
├── models/
│   ├── User.js                # Пользователи
│   ├── News.js                # Новости
│   ├── Page.js                # Страницы
│   ├── Navigation.js          # Навигация
│   ├── Employee.js            # Сотрудники
│   ├── Specialty.js           # Специальности
│   ├── Media.js               # Медиафайлы
│   ├── Contact.js             # Контакты
│   ├── ContactMessage.js      # Сообщения
│   ├── Document.js            # Документы
│   ├── Settings.js            # Настройки
│   └── Event.js               # Мероприятия
├── routes/
│   ├── auth.js, news.js, pages.js, navigation.js,
│   ├── employees.js, specialties.js, media.js,
│   ├── contacts.js, documents.js, settings.js,
│   ├── events.js, dashboard.js
├── uploads/                   # Папка для загруженных файлов
├── .env                       # Переменные окружения
├── index.js                   # Точка входа сервера
├── seed.js                    # Seed-скрипт (создание админа)
├── package.json
└── NEXT_STEPS.md              # Этот файл
```

### Запуск сервера
```bash
cd server
npm run seed       # Создать админа (admin@vpk.ru / admin123)
npm run dev        # Запустить сервер (порт 5000)
```

### Роли пользователей
- **superadmin** — полный доступ
- **admin** — CRUD всего, кроме удаления пользователей
- **editor** — управление контентом (новости, страницы, документы, события)
- **viewer** — только просмотр дашборда

---

## 🔜 Следующий шаг: Фронтенд админ-панели (React + Tailwind)

### Что нужно сделать:

1. **Создать роут `/admin` в текущем React-проекте (src/admin/)**
2. **Создать базовый layout админки** (сайдбар, хедер, контент)
3. **Страница логина** (`/admin/login`)
4. **Дашборд** (`/admin/`) — карточки со статистикой
5. **Модули** (каждый на отдельном роуте):
   - `/admin/news` — управление новостями
   - `/admin/pages` — управление страницами
   - `/admin/navigation` — управление навигацией
   - `/admin/employees` — сотрудники
   - `/admin/specialties` — специальности
   - `/admin/media` — медиа-менеджер
   - `/admin/contacts` — контакты + сообщения
   - `/admin/documents` — документы
   - `/admin/settings` — настройки
   - `/admin/events` — мероприятия
   - `/admin/users` — пользователи (только superadmin/admin)

### Рекомендуемые библиотеки для фронтенда:
```bash
npm install @tanstack/react-query  # для запросов к API
npm install react-hook-form        # для форм
npm install react-hot-toast        # уведомления
npm install @tabler/icons-react    # иконки (уже есть)
npm install recharts               # графики для дашборда
```

### Структура файлов админки:
```
src/admin/
├── components/
│   ├── AdminLayout.jsx       # Layout с сайдбаром
│   ├── Sidebar.jsx           # Сайдбар навигации
│   ├── DataTable.jsx         # Таблица с фильтрацией
│   ├── FormField.jsx         # Поле формы
│   └── ...
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── NewsList.jsx / NewsForm.jsx
│   ├── PagesList.jsx / PageForm.jsx
│   ├── EmployeesList.jsx / EmployeeForm.jsx
│   ├── SpecialtiesList.jsx / SpecialtyForm.jsx
│   ├── MediaManager.jsx
│   ├── ContactsList.jsx
│   ├── MessagesList.jsx
│   ├── DocumentsList.jsx / DocumentForm.jsx
│   ├── SettingsPage.jsx
│   ├── EventsList.jsx / EventForm.jsx
│   └── UsersList.jsx / UserForm.jsx
├── hooks/
│   ├── useAuth.js           # Хук авторизации
│   └── useApi.js            # Хук для API-запросов
├── context/
│   └── AuthContext.jsx       # Контекст авторизации
└── admin.jsx                 # Роутер админки
```

### Важно:
- После создания админки нужно будет **настроить Vite proxy** для API
- Фронтенд сайта нужно будет **перевести на получение данных из API** вместо хардкода
- ESLint ошибки для серверных CommonJS файлов можно игнорировать (добавить `.eslintignore` или настроить)

---

**Этот проект готов для передачи следующему разработчику.**
Начинать с блока "Фронтенд админ-панели" — создать `src/admin/` с роутингом, авторизацией и базовым layout.