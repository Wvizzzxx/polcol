import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconCalculator,
  IconCheck,
  IconPlus,
  IconTrash,
  IconCamera,
  IconArrowRight,
  IconStar,
  IconInfoCircle,
  IconChevronDown,
  IconX,
  IconUpload,
  IconMenu2,
  IconEye,
  IconRobot,
  IconSearch,
  IconClock,
  IconNews,
  IconPhone,
  IconMapPin,
  IconMail,
  IconBook,
  IconBook2,
  IconUsers,
  IconCoin,
  IconTrophy,
  IconBuilding,
  IconSchool,
  IconClipboardText,
  IconCreditCard,
  IconChartBar,
  IconPin,
  IconBulb,
  IconRocket,
  IconDeviceLaptop,
  IconGlobe,
  IconHome,
  IconUser,
  IconHeartHandshake,
  IconTarget,
  IconTool,
  IconSettings,
  IconPrinter,
  IconSettings2,
  IconScale,
  IconChevronRight,
  IconCalendar,
  IconFileText,
  IconFilter,
  IconList,
  IconLayoutGrid,
  IconPhoto,
} from "@tabler/icons-react";

/* ──────────────────────────────── helpers ──────────────────────── */
const Section = ({ id, title, number, children }) => (
  <section id={id} className="mb-20">
    <div className="flex items-center gap-4 mb-8">
      <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-dark)] text-white flex items-center justify-center font-extrabold text-lg shadow-lg">
        {number}
      </span>
      <div>
        <h2 className="text-2xl font-extrabold text-[var(--color-official)]">
          {title}
        </h2>
        <p className="text-[var(--color-text-muted)] text-sm">
          Рисунок {number} — {title}
        </p>
      </div>
    </div>
    <div className="rounded-3xl border-2 border-dashed border-[var(--color-border)] bg-white p-6 md:p-10 shadow-sm relative overflow-hidden">
      <div className="absolute top-3 right-4 text-[10px] text-gray-300 font-mono select-none">
        #{number}
      </div>
      {children}
    </div>
  </section>
);

/* ──────────────────────── Рисунок 2 — UI Kit ───────────────────── */
function UIkitSection() {
  const colors = [
    { name: "official", hex: "#1a365d" },
    { name: "official-dark", hex: "#0f2440" },
    { name: "official-light", hex: "#2d4a7a" },
    { name: "accent", hex: "#c5a55a" },
    { name: "accent-light", hex: "#d4b978" },
    { name: "red-official", hex: "#b22234" },
  ];

  return (
    <Section id="uikit" title="UI-kit сайта" number="2">
      {/* Typography */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Типографика
        </h3>
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold text-[var(--color-official)]">
            Заголовок H1 — 36px / 800
          </h1>
          <h2 className="text-3xl font-bold text-[var(--color-official)]">
            Заголовок H2 — 30px / 700
          </h2>
          <h3 className="text-2xl font-bold text-[var(--color-official)]">
            Заголовок H3 — 24px / 700
          </h3>
          <h4 className="text-xl font-semibold text-[var(--color-official)]">
            Заголовок H4 — 20px / 600
          </h4>
          <p className="text-base text-[var(--color-text)]">
            Основной текст — 16px / 400. Строка с обычным начертанием для
            основного контента страниц.
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Вторичный текст — 14px. Используется для описаний и подписей.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Мелкий текст — 12px. Заметки и служебная информация.
          </p>
          <p className="text-sm font-bold text-[var(--color-accent-dark)]">
            Акцентный текст — золотой цвет, жирный
          </p>
          <p className="text-2xl font-extrabold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] bg-clip-text text-transparent inline-block">
            Gradient текст
          </p>
        </div>
      </div>

      {/* Color palette */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Палитра цветов
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {colors.map((c) => (
            <div key={c.name} className="text-center">
              <div
                className="w-full h-16 rounded-xl shadow-md mb-2"
                style={{ background: c.hex }}
              />
              <p className="text-[10px] font-bold text-gray-500">{c.name}</p>
              <p className="text-[10px] text-gray-400 font-mono">{c.hex}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Кнопки
        </h3>
        <div className="flex flex-wrap gap-3">
          <button className="btn-official">Основная</button>
          <button className="btn-accent">Акцент</button>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[var(--color-official)] font-semibold text-sm border-2 border-[var(--color-official)] hover:bg-[var(--color-official)] hover:text-white transition-all">
            outline
          </button>
          <button
            className="btn-outline"
            style={{ background: "var(--color-official)" }}
          >
            На тёмном фоне
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all">
            <IconTrash className="w-4 h-4" /> Удалить
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-all">
            <IconCheck className="w-4 h-4" /> Подтвердить
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-200 transition-all">
            <IconPlus className="w-4 h-4" /> Добавить
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Бейджи
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="badge-official">Официальный</span>
          <span className="badge-accent">Акцент</span>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200">
            Высокий шанс
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold border border-amber-200">
            Средний шанс
          </span>
          <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-200">
            Низкий шанс
          </span>
          <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200">
            Маловероятно
          </span>
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm border border-white/10">
            Код
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold">
            IT-Куб
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Карточки
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-official rounded-xl p-5 hover:border-[var(--color-accent)] transition-all">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-official-50)] flex items-center justify-center mb-3">
              <IconDeviceLaptop className="w-6 h-6 text-[var(--color-official)]" />
            </div>
            <h4 className="font-bold text-[var(--color-official)] text-sm mb-1">
              Информатика
            </h4>
            <p className="text-gray-400 text-xs">
              Современные компьютерные классы
            </p>
          </div>
          <div className="card-official rounded-xl p-5 hover:border-[var(--color-accent)] transition-all">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-50)] flex items-center justify-center mb-3">
              <IconGlobe className="w-6 h-6 text-[var(--color-accent-dark)]" />
            </div>
            <h4 className="font-bold text-[var(--color-official)] text-sm mb-1">
              Сети
            </h4>
            <p className="text-gray-400 text-xs">
              Администрирование и безопасность
            </p>
          </div>
          <div className="card-official rounded-xl p-5 hover:border-[var(--color-accent)] transition-all">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
              <IconSettings className="w-6 h-6 text-gray-600" />
            </div>
            <h4 className="font-bold text-[var(--color-official)] text-sm mb-1">
              Машиностроение
            </h4>
            <p className="text-gray-400 text-xs">Производство и технологии</p>
          </div>
        </div>
      </div>

      {/* Forms */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Формы
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-official)] mb-1.5">
                Имя
              </label>
              <input
                type="text"
                placeholder="Иван Иванов"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--color-official)] mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="ivan@example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--color-official)] mb-1.5">
                Предмет
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all text-sm appearance-none bg-white">
                  <option>Математика</option>
                  <option>Русский язык</option>
                  <option>Физика</option>
                </select>
                <IconChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-official)] mb-1.5">
              Сообщение
            </label>
            <textarea
              rows={5}
              placeholder="Ваше сообщение..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none text-sm"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ───────────────── Рисунок 3 — Главная (десктоп) ──────────────── */
function HomeDesktopSection() {
  const navItems = [
    {
      title: "Абитуриентам",
      Icon: IconSchool,
      desc: "Поступление, специальности, документы",
    },
    {
      title: "Студентам",
      Icon: IconBook2,
      desc: "Расписание, обучение, мероприятия",
    },
    { title: "Родителям", Icon: IconUsers, desc: "Питание, здоровье, воспитание" },
    {
      title: "Сотрудникам",
      Icon: IconBuilding,
      desc: "Документы, методика, аттестация",
    },
  ];

  const specs = [
    { code: "09.02.07", name: "Информационные системы и программирование" },
    { code: "09.02.06", name: "Сетевое и системное администрирование" },
    { code: "15.02.08", name: "Технология машиностроения" },
    { code: "15.02.10", name: "Мехатроника и мобильная робототехника" },
    { code: "38.02.01", name: "Экономика и бухгалтерский учёт" },
    { code: "09.02.05", name: "Прикладная информатика" },
  ];

  return (
    <Section
      id="home-desktop"
      title="Макет главной страницы (десктоп)"
      number="3"
    >
      <div
        className="bg-[var(--color-bg)] rounded-2xl overflow-hidden border border-gray-200"
        style={{ maxWidth: "100%" }}
      >
        {/* Header mockup */}
        <div className="bg-white border-b border-gray-100">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-dark)] flex items-center justify-center text-white text-xs font-bold">
                  ВПК
                </div>
              </div>
              <div>
                <p className="text-[var(--color-official)] text-xs font-bold leading-tight">
                  Владимирский
                </p>
                <p className="text-gray-400 text-[10px] leading-tight">
                  политехнический колледж
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-[var(--color-accent-50)] text-[var(--color-accent-dark)] text-xs font-semibold">
                Калькулятор
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[var(--color-official)] text-white text-xs font-semibold">
                Контакты
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 px-6 py-2 border-t border-gray-50">
            {[
              "Абитуриентам",
              "Студентам",
              "Родителям",
              "Сотрудникам",
              "Сведения об ОО",
              "Новости",
            ].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:text-[var(--color-official)] hover:bg-[var(--color-official-50)] transition-all cursor-default"
              >
                {item}
              </span>
            ))}
            <span className="ml-2 px-3 py-1.5 rounded-lg bg-[var(--color-accent-50)] text-[var(--color-accent-dark)] text-xs font-bold border border-[var(--color-accent-100)]">
              IT-Куб
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="relative bg-gradient-to-br from-[var(--color-official-900)] via-[var(--color-official-800)] to-[var(--color-official-900)] px-8 py-12 min-h-[240px]">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 grid grid-cols-2 gap-8 items-center">
            <div>
              <span className="badge-accent mb-3 inline-block text-[10px]">
                ГАПОУ Владимирской области
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                Владимирский политехнический
                <br />
                <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] bg-clip-text text-transparent">
                  колледж
                </span>
              </h1>
              <p className="text-white/60 text-xs mb-4 max-w-sm">
                Качественное образование сегодня — профессиональный успех завтра
              </p>
              <div className="flex gap-2">
                <span className="btn-accent text-xs py-2 px-4">
                  Поступить к нам →
                </span>
                <span className="btn-outline text-xs py-2 px-4">
                  О колледже
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 h-40 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <IconPhoto className="w-10 h-10 text-white/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Nav cards */}
        <div className="px-6 py-8 bg-white">
          <div className="text-center mb-6">
            <div
              className="accent-line-center mb-3"
              style={{ width: "2rem", height: "2px" }}
            />
            <h2 className="text-lg font-bold text-[var(--color-official)]">
              Разделы сайта
            </h2>
            <p className="text-gray-400 text-xs">Выберите раздел</p>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {navItems.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:shadow-lg transition-all cursor-default"
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-600)] flex items-center justify-center">
                  <item.Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xs font-bold text-[var(--color-official)] mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-[10px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Specialties preview */}
        <div className="px-6 py-8 bg-gray-50">
          <div className="text-center mb-6">
            <div
              className="accent-line-center mb-3"
              style={{ width: "2rem", height: "2px" }}
            />
            <h2 className="text-lg font-bold text-[var(--color-official)]">
              Направления обучения
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {specs.map((s) => (
              <div
                key={s.code}
                className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all cursor-default"
              >
                <div className="inline-block px-2 py-0.5 bg-[var(--color-official-50)] text-[var(--color-official)] text-[9px] font-bold rounded-full mb-2 border border-[var(--color-official-100)]">
                  {s.code}
                </div>
                <h3 className="text-xs font-bold text-[var(--color-official)] leading-snug">
                  {s.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Footer mockup */}
        <div className="bg-[var(--color-official-dark)] px-6 py-4 text-center">
          <p className="text-white/40 text-[10px]">
            © 2026 ГАПОУ ВО «Владимирский политехнический колледж»
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ──────────────── Рисунок 4 — Главная (мобильная версия) ──────── */
function HomeMobileSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Section
      id="home-mobile"
      title="Макет главной страницы (мобильная версия)"
      number="4"
    >
      <div className="flex justify-center">
        <div className="w-[375px] bg-white rounded-[2.5rem] shadow-2xl border-4 border-gray-800 overflow-hidden relative">
          {/* Status bar */}
          <div className="bg-[var(--color-official-dark)] px-6 py-1.5 flex items-center justify-between">
            <span className="text-white text-[10px] font-semibold">9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-2 bg-white/80 rounded-sm" />
              <div className="w-3 h-2 bg-white/80 rounded-sm" />
              <div className="w-4 h-2 border border-white/80 rounded-sm" />
            </div>
          </div>

          {/* Header */}
          <div className="bg-white px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-all"
                >
                  {menuOpen ? (
                    <IconX className="w-5 h-5 text-[var(--color-official)]" />
                  ) : (
                    <IconMenu2 className="w-5 h-5 text-[var(--color-official)]" />
                  )}
                </button>
                <div>
                  <p className="text-[var(--color-official)] text-[10px] font-bold leading-tight">
                    Владимирский
                  </p>
                  <p className="text-gray-400 text-[8px] leading-tight">
                    политехнический колледж
                  </p>
                </div>
              </div>
              <span className="px-2 py-1 rounded-md bg-[var(--color-accent-50)] text-[var(--color-accent-dark)] text-[9px] font-semibold border border-[var(--color-accent-100)]">
                Контакты
              </span>
            </div>
          </div>

          {/* Hamburger menu */}
          {menuOpen && (
            <div className="bg-white border-t border-gray-100 shadow-lg px-4 py-3 max-h-[300px] overflow-y-auto">
              {[
                "Абитуриентам",
                "Студентам",
                "Родителям",
                "Сотрудникам",
                "Сведения об ОО",
                "Новости",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-[var(--color-official-50)] transition-all text-xs"
                >
                  <span className="font-medium">{item}</span>
                  <IconChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-100 flex gap-2">
                <span className="flex-1 text-center px-3 py-2 rounded-lg bg-[var(--color-accent-50)] text-[var(--color-accent-dark)] text-[10px] font-semibold border border-[var(--color-accent-200)]">
                  Калькулятор
                </span>
                <span className="flex-1 text-center px-3 py-2 rounded-lg bg-[var(--color-official)] text-white text-[10px] font-semibold">
                  IT-Куб
                </span>
              </div>
            </div>
          )}

          {/* Hero */}
          <div className="bg-gradient-to-br from-[var(--color-official-900)] to-[var(--color-official-800)] px-4 py-8 text-center">
            <span className="badge-accent text-[8px] mb-2 inline-block">
              ГАПОУ Владимирской области
            </span>
            <h1 className="text-lg font-extrabold text-white mb-1">
              Владимирский
              <br />
              политехнический
              <br />
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] bg-clip-text text-transparent">
                колледж
              </span>
            </h1>
            <p className="text-white/50 text-[10px] mb-4 max-w-[260px] mx-auto">
              Качественное образование сегодня
            </p>
            <div className="flex gap-2 justify-center">
              <span className="px-3 py-1.5 rounded-lg bg-[var(--color-accent)] text-[var(--color-official-dark)] text-[10px] font-bold">
                Поступить
              </span>
              <span className="px-3 py-1.5 rounded-lg border border-white/30 text-white text-[10px] font-semibold">
                О колледже
              </span>
            </div>
          </div>

          {/* Cards */}
          <div className="px-4 py-6 bg-white">
            <div className="grid grid-cols-2 gap-2">
              {["Абитуриентам", "Студентам", "Родителям", "Сотрудникам"].map(
                (t) => (
                  <div
                    key={t}
                    className="bg-white border border-gray-100 rounded-xl p-3 text-center"
                  >
                    <div className="w-10 h-10 mx-auto mb-1.5 rounded-xl bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-600)] flex items-center justify-center">
                      <IconSchool className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-[10px] font-bold text-[var(--color-official)]">
                      {t}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[var(--color-official-dark)] px-4 py-3 text-center">
            <p className="text-white/30 text-[8px]">© 2026 ВПК</p>
          </div>

          {/* Home indicator */}
          <div className="bg-white py-1.5 flex justify-center">
            <div className="w-28 h-1 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ───────── Рисунок 5 — Навигация и выпадающие подменю ─────────── */
function NavigationSection() {
  return (
    <Section
      id="navigation"
      title="Структура навигации и выпадающие подменю"
      number="5"
    >
      {/* Desktop dropdown */}
      <div className="mb-8">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Десктопное выпадающее подменю
        </h4>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-1 inline-block">
          {/* Nav bar */}
          <div className="flex items-center gap-0.5 px-2 py-1.5">
            <span className="px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-gray-100 transition-all">
              Главная
            </span>
            <span className="px-3 py-2 rounded-lg text-xs bg-[var(--color-official-50)] text-[var(--color-official)] font-medium flex items-center gap-1">
              Абитуриентам <IconChevronDown className="w-3 h-3" />
            </span>
            <span className="px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-gray-100 transition-all">
              Студентам
            </span>
            <span className="px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-gray-100 transition-all">
              Родителям
            </span>
          </div>
          {/* Dropdown */}
          <div className="mt-1 bg-white rounded-xl shadow-lg border border-gray-200 p-2 w-56">
            <div className="grid gap-0.5">
              {[
                "Приёмная комиссия",
                "День открытых дверей",
                "Специальности",
                "Общежитие",
                "Профориентация",
                "Список поступления",
              ].map((item) => (
                <span
                  key={item}
                  className="block px-3.5 py-2 rounded-lg text-xs text-gray-600 hover:text-[var(--color-official)] hover:bg-[var(--color-official-50)] transition-all font-medium cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile accordion */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Мобильное аккордеон-меню
        </h4>
        <div className="w-[320px] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {[
            { label: "Абитуриентам", open: true },
            { label: "Студентам", open: false },
            { label: "Родителям", open: false },
          ].map((item) => (
            <div
              key={item.label}
              className="border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs font-medium text-gray-700">
                  {item.label}
                </span>
                <IconChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform ${item.open ? "rotate-180" : ""}`}
                />
              </div>
              {item.open && (
                <div className="ml-7 pl-4 border-l-2 border-[var(--color-official-100)] pb-2">
                  {[
                    "Приёмная комиссия",
                    "День открытых дверей",
                    "Специальности",
                  ].map((sub) => (
                    <span
                      key={sub}
                      className="block px-3 py-2 rounded-lg text-[11px] text-gray-500 hover:text-[var(--color-official)] transition-all cursor-default"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="px-4 py-3 border-t border-gray-100">
            <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-1.5">
              Дополнительно
            </p>
            {["IT-Куб", "Калькулятор", "Контакты"].map((l) => (
              <span
                key={l}
                className="block px-2 py-1.5 rounded text-[10px] text-gray-500 cursor-default"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────── Рисунок 6 — SubPage с динамическим контентом ─────── */
function SubPageSection() {
  return (
    <Section
      id="subpage"
      title="Компонент SubPage с динамическим контентом"
      number="6"
    >
      <div className="max-w-2xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
          <IconHome className="w-3 h-3" />
          <IconChevronRight className="w-3 h-3" />
          <span className="hover:text-[var(--color-official)] cursor-default">
            Абитуриентам
          </span>
          <IconChevronRight className="w-3 h-3" />
          <span className="text-[var(--color-official)] font-semibold">
            Приёмная комиссия
          </span>
        </div>

        {/* Page header */}
        <div className="bg-gradient-to-r from-[var(--color-official)] to-[var(--color-official-light)] rounded-2xl p-8 text-white mb-6">
          <IconPhone className="w-10 h-10 text-white/60 mb-3" />
          <h1 className="text-2xl font-extrabold mb-2">Приёмная комиссия</h1>
          <p className="text-white/60 text-sm">
            Контакты, график работы и документы для поступления
          </p>
        </div>

        {/* Dynamic content */}
        <div className="space-y-4">
          <div className="card-official rounded-xl p-5">
            <h3 className="font-bold text-[var(--color-official)] text-sm mb-2 flex items-center gap-2">
              <IconClock className="w-4 h-4 text-[var(--color-accent)]" />
              График работы
            </h3>
            <p className="text-gray-500 text-xs">
              Пн-Пт: 8:00–17:00, обед 12:00–13:00
            </p>
          </div>
          <div className="card-official rounded-xl p-5">
            <h3 className="font-bold text-[var(--color-official)] text-sm mb-2 flex items-center gap-2">
              <IconFileText className="w-4 h-4 text-[var(--color-accent)]" />
              Необходимые документы
            </h3>
            <ul className="text-gray-500 text-xs space-y-1">
              <li className="flex items-center gap-2">
                <IconCheck className="w-3 h-3 text-emerald-500" /> Паспорт
                (копия)
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="w-3 h-3 text-emerald-500" /> Аттестат
                (оригинал)
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="w-3 h-3 text-emerald-500" /> 4 фотографии
                3×4
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="w-3 h-3 text-emerald-500" /> Медицинская
                справка
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────── Рисунок 7 — Интерфейс калькулятора ────────────────── */
function CalculatorSection() {
  return (
    <Section
      id="calculator"
      title="Интерфейс калькулятора поступления"
      number="7"
    >
      <div className="max-w-2xl">
        {/* Step 1 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xs">
              1
            </span>
            <h3 className="text-lg font-bold text-[var(--color-official)]">
              Оценки за экзамены
            </h3>
          </div>
          <div className="space-y-2">
            {[
              { subject: "Математика", score: 5 },
              { subject: "Русский язык", score: 4 },
              { subject: "Информатика", score: 5 },
            ].map((exam, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
              >
                <span className="text-xs font-bold text-gray-400 w-5">
                  {idx + 1}
                </span>
                <div className="flex-1 relative">
                  <div className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 text-xs bg-white">
                    {exam.subject}
                  </div>
                </div>
                <div className="w-20">
                  <div className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 text-xs text-center font-bold bg-white">
                    {exam.score}
                  </div>
                </div>
                <button className="p-1.5 text-gray-300 hover:text-red-500 transition-all">
                  <IconTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <button className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[var(--color-accent-dark)] bg-[var(--color-accent-50)] hover:bg-[var(--color-accent-100)] rounded-xl border border-[var(--color-accent-200)] transition-all">
            <IconPlus className="w-3.5 h-3.5" /> Добавить предмет
          </button>
        </div>

        {/* Step 2 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xs">
              2
            </span>
            <h3 className="text-lg font-bold text-[var(--color-official)]">
              Фото аттестата
            </h3>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[var(--color-accent)] transition-all cursor-default">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-50)] flex items-center justify-center mx-auto mb-3">
              <IconCamera className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <p className="font-bold text-[var(--color-official)] text-xs mb-1">
              Загрузите фото аттестата
            </p>
            <p className="text-gray-400 text-[10px] mb-3">Сторона с оценками</p>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--color-accent)] text-white font-semibold text-xs rounded-xl">
              <IconUpload className="w-3.5 h-3.5" /> Выбрать файл
            </span>
          </div>
        </div>

        {/* Step 3 */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xs">
              3
            </span>
            <h3 className="text-lg font-bold text-[var(--color-official)]">
              Рассчитать
            </h3>
          </div>
          <button className="w-full px-6 py-3 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg">
            <IconCalculator className="w-4 h-4" />
            Рассчитать шансы поступления
            <IconArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Section>
  );
}

/* ──── Рисунок 8 — Результаты расчёта вероятности зачисления ──── */
function CalculatorResultsSection() {
  const specialties = [
    {
      code: "09.02.07",
      name: "Информационные системы и программирование",
      passChance: "high",
      chanceLabel: "Высокий шанс",
      budget: 30,
      paid: 10,
      minScore: 4.5,
      color: "from-blue-500 to-indigo-600",
      Icon: IconDeviceLaptop,
    },
    {
      code: "09.02.06",
      name: "Сетевое и системное администрирование",
      passChance: "high",
      chanceLabel: "Высокий шанс",
      budget: 25,
      paid: 10,
      minScore: 4.3,
      color: "from-cyan-500 to-blue-600",
      Icon: IconGlobe,
    },
    {
      code: "15.02.08",
      name: "Технология машиностроения",
      passChance: "medium",
      chanceLabel: "Средний шанс",
      budget: 20,
      paid: 10,
      minScore: 4.0,
      color: "from-orange-500 to-red-600",
      Icon: IconSettings,
    },
    {
      code: "38.02.01",
      name: "Экономика и бухгалтерский учёт",
      passChance: "low",
      chanceLabel: "Низкий шанс",
      budget: 25,
      paid: 10,
      minScore: 4.0,
      color: "from-amber-500 to-orange-600",
      Icon: IconCoin,
    },
  ];

  const chanceColors = {
    high: "bg-emerald-500 text-emerald-50",
    medium: "bg-amber-500 text-amber-50",
    low: "bg-orange-500 text-orange-50",
  };

  return (
    <Section
      id="calculator-results"
      title="Результаты расчёта вероятности зачисления"
      number="8"
    >
      {/* Average score card */}
      <div className="bg-gradient-to-br from-[var(--color-official-900)] via-[var(--color-official-800)] to-[var(--color-official-900)] rounded-2xl p-6 text-white text-center mb-6">
        <IconStar className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-2" />
        <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
          Ваш средний балл
        </p>
        <p className="text-5xl font-extrabold mb-3">4.67</p>
        <div className="flex justify-center gap-3">
          {[
            { subj: "Математика", score: 5 },
            { subj: "Русский язык", score: 4 },
            { subj: "Информатика", score: 5 },
          ].map((s) => (
            <div
              key={s.subj}
              className="bg-white/10 rounded-xl px-3 py-1.5 text-center"
            >
              <p className="text-white/40 text-[10px]">{s.subj}</p>
              <p className="font-bold text-sm">{s.score}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Specialty cards grid */}
      <h4 className="text-sm font-bold text-[var(--color-official)] mb-3">
        Подходящие специальности
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {specialties.map((spec) => (
          <div
            key={spec.code}
            className={`bg-gradient-to-br ${spec.color} rounded-2xl p-5 text-white relative overflow-hidden min-h-[200px] flex flex-col justify-between`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 mb-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${chanceColors[spec.passChance]}`}
                >
                  {spec.chanceLabel}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-bold">
                  {spec.code}
                </span>
              </div>
              <spec.Icon className="w-8 h-8 text-white mb-1.5" strokeWidth={1.5} />
              <h3 className="text-sm font-extrabold leading-tight">
                {spec.name}
              </h3>
            </div>
            <div className="relative z-10 mt-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/15 rounded-lg p-2 text-center">
                  <p className="font-extrabold text-sm">{spec.budget}</p>
                  <p className="text-white/50 text-[8px]">Бюджет</p>
                </div>
                <div className="bg-white/15 rounded-lg p-2 text-center">
                  <p className="font-extrabold text-sm">{spec.paid}</p>
                  <p className="text-white/50 text-[8px]">Платное</p>
                </div>
                <div className="bg-white/15 rounded-lg p-2 text-center">
                  <p className="font-extrabold text-sm">{spec.minScore}</p>
                  <p className="text-white/50 text-[8px]">Проходной</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ──── Рисунок 9 — Полноэкранный модальный поиск ──────────────── */
function ModalSearchSection() {
  return (
    <Section
      id="modal-search"
      title="Полноэкранный модальный поиск с подсветкой совпадений"
      number="9"
    >
      <div className="relative bg-gradient-to-b from-[var(--color-official-dark)] to-[var(--color-official)] rounded-2xl overflow-hidden p-8 min-h-[350px]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 relative">
            <IconSearch className="w-5 h-5 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              defaultValue="приёмная"
              className="w-full pl-12 pr-10 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder-white/40 outline-none focus:bg-white/15 focus:border-white/30 transition-all"
              readOnly
            />
            <IconX className="w-4 h-4 text-white/40 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
          </div>
          <span className="text-white/40 text-xs whitespace-nowrap">
            ESC для закрытия
          </span>
        </div>

        {/* Results */}
        <div className="space-y-1">
          <p className="text-white/30 text-[10px] uppercase tracking-wider font-semibold mb-3">
            Найдено: 4 результата
          </p>
          {[
            {
              title: "Приёмная комиссия",
              path: "Абитуриентам → Приёмная комиссия",
              context:
                "...информацию о поступлении можно получить в приёмной комиссии...",
            },
            {
              title: "День открытых дверей",
              path: "Абитуриентам → День открытых дверей",
              context:
                "...для абитуриентов в приёмной комиссии проходит запись...",
            },
            {
              title: "Контакты",
              path: "Контакты",
              context: "...телефон приёмной комиссии: +7 (4922) 66-65-13...",
            },
            {
              title: "Список поступления",
              path: "Абитуриентам → Список поступления",
              context:
                "...актуальный список поступающих в приёмной комиссии...",
            },
          ].map((result, i) => (
            <div
              key={i}
              className="bg-white/5 hover:bg-white/10 rounded-xl p-4 cursor-default transition-all border border-transparent hover:border-white/10"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-white font-semibold text-sm">
                  {result.title}
                </h4>
                <IconChevronRight className="w-4 h-4 text-white/30" />
              </div>
              <p className="text-white/30 text-[10px] mb-1.5">{result.path}</p>
              <p className="text-white/50 text-xs">
                ...{" "}
                <span className="bg-[var(--color-accent)]/40 text-white px-1 rounded">
                  приёмной
                </span>{" "}
                комиссии...
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ──── Рисунок 10 — Живой таймер обратного отсчёта ────────────── */
function TimerSection() {
  return (
    <Section
      id="timer"
      title="Живой таймер обратного отсчёта до событий"
      number="10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: "День открытых дверей",
            date: "20 апреля 2026",
            days: 0,
            hours: 14,
            mins: 32,
            secs: 18,
          },
          {
            title: "Начало приёмной кампании",
            date: "1 июня 2026",
            days: 3,
            hours: 8,
            mins: 15,
            secs: 42,
          },
        ].map((event) => (
          <div
            key={event.title}
            className="bg-gradient-to-br from-[var(--color-official)] to-[var(--color-official-dark)] rounded-2xl p-6 text-white"
          >
            <div className="flex items-center gap-2 mb-4">
              <IconCalendar className="w-5 h-5 text-[var(--color-accent)]" />
              <div>
                <h4 className="font-bold text-sm">{event.title}</h4>
                <p className="text-white/40 text-[10px]">{event.date}</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              {[
                { val: event.days, label: "дней" },
                { val: event.hours, label: "часов" },
                { val: event.mins, label: "мин" },
                { val: event.secs, label: "сек" },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-[52px]"
                >
                  <p className="font-extrabold text-xl">
                    {String(unit.val).padStart(2, "0")}
                  </p>
                  <p className="text-white/40 text-[9px]">{unit.label}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ──── Рисунки 11 & 12 — 3D-карточки специальностей ────────────── */
function SpecialtyCardsSection() {
  return (
    <Section
      id="specialty-cards"
      title="3D-карточки специальностей"
      number="11"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Front */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Рисунок 11 — Фронтальная сторона
          </h4>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden min-h-[320px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-emerald-50 shadow-lg">
                  Высокий шанс
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold backdrop-blur-sm">
                  09.02.07
                </span>
              </div>
              <div className="mb-2"><IconDeviceLaptop className="w-10 h-10 text-white" strokeWidth={1.5} /></div>
              <h3 className="text-lg font-extrabold mb-2 leading-tight">
                Информационные системы и программирование
              </h3>
              <p className="text-white/70 text-xs leading-relaxed">
                Подготовка специалистов в области разработки и сопровождения
                программных продуктов
              </p>
            </div>

            <div className="relative z-10 mt-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 text-center">
                  <IconUsers className="w-3.5 h-3.5 text-white/60 mx-auto mb-0.5" />
                  <p className="font-extrabold text-sm">30</p>
                  <p className="text-white/50 text-[8px]">Бюджет</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 text-center">
                  <IconCoin className="w-3.5 h-3.5 text-white/60 mx-auto mb-0.5" />
                  <p className="font-extrabold text-sm">10</p>
                  <p className="text-white/50 text-[8px]">Платное</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 text-center">
                  <IconTrophy className="w-3.5 h-3.5 text-white/60 mx-auto mb-0.5" />
                  <p className="font-extrabold text-sm">4.5</p>
                  <p className="text-white/50 text-[8px]">Проходной</p>
                </div>
              </div>
              <div className="mt-2 bg-white/20 backdrop-blur-sm rounded-xl p-2.5 flex items-center justify-between">
                <span className="text-white/60 text-[10px] font-semibold">
                  Ваш средний балл
                </span>
                <span className="font-extrabold text-lg">4.67</span>
              </div>
            </div>

            <div className="absolute bottom-2 right-3 text-white/30 text-[9px]">
              Нажмите для подробностей →
            </div>
          </div>
        </div>

        {/* Back */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Рисунок 12 — Оборотная сторона
          </h4>
          <div className="bg-white border border-gray-200 rounded-3xl p-6 min-h-[320px] flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <IconDeviceLaptop className="w-6 h-6 text-[var(--color-official)]" strokeWidth={1.5} />
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                      09.02.07
                    </span>
                    <h4 className="font-extrabold text-[var(--color-official)] text-xs leading-tight">
                      Информационные системы и программирование
                    </h4>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-emerald-500 text-emerald-50">
                  Высокий шанс
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-[11px]">
                  <IconClock className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500">Срок обучения:</span>
                  <span className="font-bold text-[var(--color-official)]">
                    4 года
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <IconSchool className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500">Форма обучения:</span>
                  <span className="font-bold text-[var(--color-official)]">
                    Очная
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <IconBuilding className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500">Квалификация:</span>
                  <span className="font-bold text-[var(--color-official)]">
                    Техник-программист
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">
                  Ключевые навыки
                </p>
                <div className="flex flex-wrap gap-1">
                  {["Python", "JavaScript", "SQL", "Git", "React/Vue"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[9px] font-semibold rounded-lg"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">
                  Карьерные пути
                </p>
                {[
                  "Программист",
                  "Веб-разработчик",
                  "QA-инженер",
                  "Аналитик БД",
                ].map((career) => (
                  <div
                    key={career}
                    className="flex items-center gap-1.5 text-[10px] text-gray-600"
                  >
                    <IconCheck className="w-2.5 h-2.5 text-emerald-500 flex-shrink-0" />
                    {career}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex gap-3 text-[10px] text-gray-500">
                <span>
                  Бюджет:{" "}
                  <strong className="text-[var(--color-official)]">30</strong>
                </span>
                <span>
                  Платное:{" "}
                  <strong className="text-[var(--color-official)]">10</strong>
                </span>
              </div>
              <span className="text-gray-400 text-[10px]">← Назад</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ──── Рисунок 13 — Сведения об ОО с хлебными крошками ─────────── */
function SvedenSection() {
  return (
    <Section
      id="sveden"
      title="Страница «Сведения об ОО» с хлебными крошками"
      number="13"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <IconHome className="w-3 h-3" />
        <IconChevronRight className="w-3 h-3" />
        <span className="hover:text-[var(--color-official)] cursor-default">
          Главная
        </span>
        <IconChevronRight className="w-3 h-3" />
        <span className="text-[var(--color-official)] font-semibold">
          Сведения об ОО
        </span>
      </div>

      {/* Page header */}
      <div className="bg-gradient-to-r from-[var(--color-official)] to-[var(--color-official-light)] rounded-2xl p-6 text-white mb-6">
        <IconFileText className="w-8 h-8 text-white/60 mb-2" />
        <h1 className="text-xl font-extrabold">
          Сведения об образовательной организации
        </h1>
      </div>

      {/* Navigation grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { title: "Основные сведения", Icon: IconClipboardText },
          { title: "Структура и органы управления", Icon: IconBuilding },
          { title: "Документы", Icon: IconFileText },
          { title: "Образование", Icon: IconBook2 },
          { title: "Образовательные стандарты", Icon: IconScale },
          { title: "Руководство", Icon: IconUser },
          { title: "Педагогический состав", Icon: IconUsers },
          { title: "Учебная среда", Icon: IconSchool },
          { title: "Стипендии", Icon: IconCoin },
          { title: "Платные образовательные услуги", Icon: IconCreditCard },
          { title: "Финансово-хозяйственная деятельность", Icon: IconChartBar },
          { title: "Вакантные места", Icon: IconPin },
        ].map((item) => (
          <div
            key={item.title}
            className="card-official rounded-xl p-4 flex items-start gap-3 hover:border-[var(--color-accent)] transition-all cursor-default"
          >
            <item.Icon className="w-5 h-5 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
            <h3 className="text-xs font-bold text-[var(--color-official)] leading-tight">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ──── Рисунок 14 — Страница «Новости» с фильтрацией ──────────── */
function NewsSection() {
  const categories = ["Все", "Мероприятие", "Достижение", "Анонс", "Событие"];

  const news = [
    {
      tag: "Мероприятие",
      date: "15 мая 2026",
      title: "День открытых дверей 2026",
      desc: "20 апреля во Владимирском политехническом колледже пройдёт День открытых дверей.",
    },
    {
      tag: "Достижение",
      date: "10 мая 2026",
      title: "Победа в чемпионате «Профессионалы»",
      desc: "Команда ВПК заняла 8 призовых мест в региональном этапе.",
    },
    {
      tag: "Анонс",
      date: "5 мая 2026",
      title: "IT-Куб: летние программы",
      desc: "Центр IT-Куб открывает набор на летние интенсивы.",
    },
    {
      tag: "Событие",
      date: "28 апреля 2026",
      title: "Хакатон по веб-разработке",
      desc: "Ежегодный хакатон собрал 12 команд студентов колледжа.",
    },
  ];

  return (
    <Section
      id="news"
      title="Страница «Новости» с фильтрацией по категориям"
      number="14"
    >
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${i === 0 ? "bg-[var(--color-official)] text-white" : "bg-[var(--color-official-50)] text-[var(--color-official)] hover:bg-[var(--color-official-100)]"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((item, idx) => (
          <div
            key={idx}
            className="card-official rounded-xl p-5 hover:border-[var(--color-accent)] transition-all cursor-default"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="badge-official text-[10px]">{item.tag}</span>
              <span className="text-[10px] text-gray-400">{item.date}</span>
            </div>
            <h3 className="text-sm font-bold text-[var(--color-official)] mb-1">
              {item.title}
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            <span className="text-[var(--color-accent-dark)] text-[10px] font-semibold inline-flex items-center gap-1 mt-2">
              Читать далее →
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ──── Рисунок 15 — О колледже с историческим таймлайном ────────── */
function TimelineSection() {
  const achievements = [
    {
      year: "1944",
      title: "Основание училища",
      desc: "Открыто ремесленное училище для подготовки рабочих кадров",
      Icon: IconBuilding,
    },
    {
      year: "1960",
      title: "Машиностроительный техникум",
      desc: "Реорганизация в машиностроительный техникум",
      Icon: IconTool,
    },
    {
      year: "1990",
      title: "Политехнический колледж",
      desc: "Получение статуса политехнического колледжа",
      Icon: IconBook2,
    },
    {
      year: "2005",
      title: "Информатизация",
      desc: "Внедрение информационных технологий в учебный процесс",
      Icon: IconDeviceLaptop,
    },
    {
      year: "2015",
      title: "ИТ-кластер",
      desc: "Открытие современных ИТ-мастерских и лабораторий",
      Icon: IconRocket,
    },
    {
      year: "2020",
      title: "IT-Куб",
      desc: "Победа в гранте «Цифровая образовательная среда»",
      Icon: IconTrophy,
    },
    {
      year: "2024",
      title: "Флагман IT-образования",
      desc: "Признание ведущим колледжем региона",
      Icon: IconStar,
    },
  ];

  return (
    <Section
      id="timeline"
      title="Страница «О колледже» с историческим таймлайном"
      number="15"
    >
      <div className="space-y-4 relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-official)] to-[var(--color-accent)] hidden md:block" />

        {achievements.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={item.year}
              className={`relative flex items-start gap-4 md:gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className={`flex-1 ${isLeft ? "md:text-right" : ""}`}>
                <div className="card-official rounded-xl p-4 inline-block max-w-md">
                  <div className="flex items-center gap-2 mb-1">
                    <item.Icon className="w-4 h-4 text-[var(--color-accent)]" />
                    <span className="text-lg font-bold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] bg-clip-text text-transparent">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--color-official)]">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
              <div className="hidden md:flex w-8 h-8 rounded-full bg-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/30 flex-shrink-0 relative z-10 items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <div className="flex-1 hidden md:block" />
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ──── Рисунок 16 — Контакты с формой обратной связи ───────────── */
function ContactsSection() {
  return (
    <Section
      id="contacts"
      title="Страница «Контакты» с формой обратной связи"
      number="16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact cards */}
        <div className="space-y-3">
          {[
            {
              Icon: IconMapPin,
              label: "Адрес",
              value: "Октябрьский проспект, 11, г. Владимир",
              color: "from-blue-500 to-blue-600",
            },
            {
              Icon: IconPhone,
              label: "Телефон",
              value: "+7 (4922) 66-65-13",
              color: "from-cyan-500 to-cyan-600",
            },
            {
              Icon: IconMail,
              label: "Email",
              value: "adm@polcol.ru",
              color: "from-indigo-500 to-indigo-600",
            },
            {
              Icon: IconClock,
              label: "Режим работы",
              value: "Пн-Пт: 8:00-17:00",
              color: "from-violet-500 to-violet-600",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-md transition-all cursor-default"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0 shadow-md`}
              >
                <c.Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">
                  {c.label}
                </p>
                <p className="text-[var(--color-official)] font-semibold text-xs">
                  {c.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-semibold tracking-wider uppercase mb-3">
            Напишите нам
          </span>
          <h3 className="text-lg font-extrabold text-[var(--color-official)] mb-1">
            Обратная связь
          </h3>
          <p className="text-gray-500 text-xs mb-4">
            Мы ответим в течение рабочего дня
          </p>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-official)] mb-1">
                  Имя
                </label>
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-official)] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="ivan@example.com"
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-official)] mb-1">
                Тема
              </label>
              <input
                type="text"
                placeholder="Тема сообщения"
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-official)] mb-1">
                Сообщение
              </label>
              <textarea
                rows={3}
                placeholder="Ваше сообщение..."
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all resize-none text-xs"
              />
            </div>
            <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:from-blue-500 hover:to-indigo-500 transition-all">
              Отправить сообщение
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

import {
  HeaderSection,
  FooterSection,
  HeroDesktopSection,
  HeroMobileSection,
  NavCardsSection,
  AboutStatsSection,
  SpecialtyFrontSection,
  SpecialtyBackSection,
  TimerNewSection,
  NewsNewSection,
  SvedenNewSection,
  AbitSection,
  StudentSection,
  CalcNewSection,
  CalcResultsSection,
  SearchModalSection,
  TimelineNewSection,
  ContactsNewSection,
  MobileMenuSection,
  TabletViewSection,
} from "./ShowcaseNewSections";

/* Replaced by ShowcaseNewSections */
function FlowchartSection() {
  const nodes = [
    // Row 0 - Start
    {
      id: "start",
      type: "start",
      label: "Пользователь\nзаходит на сайт",
      x: 500,
      y: 30,
    },
    // Row 1
    {
      id: "layout",
      type: "process",
      label: "Layout\n(Хедер + Футер)",
      x: 500,
      y: 120,
    },
    // Row 2 - Decision: main nav
    {
      id: "nav",
      type: "decision",
      label: "Выбор раздела\nнавигации",
      x: 500,
      y: 220,
    },
    // Row 3 - Main pages
    { id: "home", type: "page", label: "Главная /", x: 100, y: 340 },
    { id: "about", type: "page", label: "/about", x: 250, y: 340 },
    { id: "news", type: "page", label: "/news", x: 400, y: 340 },
    { id: "contacts", type: "page", label: "/contacts", x: 550, y: 340 },
    { id: "sveden", type: "page", label: "/sveden", x: 700, y: 340 },
    { id: "itcube", type: "page", label: "/it-cube", x: 850, y: 340 },
    // Row 3 - Target pages
    { id: "abit", type: "page", label: "/abiturientam", x: 250, y: 440 },
    { id: "stud", type: "page", label: "/studentam", x: 400, y: 440 },
    { id: "rodit", type: "page", label: "/roditelyam", x: 550, y: 440 },
    { id: "sotr", type: "page", label: "/sotrudnikam", x: 700, y: 440 },
    { id: "calc", type: "page", label: "/calculator", x: 850, y: 440 },
    { id: "spec", type: "page", label: "/specialties", x: 100, y: 440 },
    // Row 4 - SubPages
    {
      id: "subpage",
      type: "process",
      label: "SubPage\n(динамический\nконтент)",
      x: 500,
      y: 550,
    },
    // Row 4 side branches
    {
      id: "search",
      type: "page",
      label: "/search\n(модальный\nпоиск)",
      x: 100,
      y: 550,
    },
    {
      id: "itcube_sub",
      type: "page",
      label: "/it-cube/...\n(8 подстраниц)",
      x: 850,
      y: 550,
    },
    // Row 5 - SubPage branches
    {
      id: "sveden_sub",
      type: "page",
      label: "/sveden/...\n(15 подстраниц)",
      x: 150,
      y: 660,
    },
    {
      id: "abit_sub",
      type: "page",
      label: "/abiturientam/...\n(10 подстраниц)",
      x: 320,
      y: 660,
    },
    {
      id: "stud_sub",
      type: "page",
      label: "/studentam/...\n(14 подстраниц)",
      x: 490,
      y: 660,
    },
    {
      id: "rodit_sub",
      type: "page",
      label: "/roditelyam/...\n(7 подстраниц)",
      x: 660,
      y: 660,
    },
    {
      id: "sotr_sub",
      type: "page",
      label: "/sotrudnikam/...\n(10 подстраниц)",
      x: 830,
      y: 660,
    },
    // Row 6 - Algorithms
    {
      id: "api_nav",
      type: "api",
      label: "API: /api/navigation\nЗагрузка навигации",
      x: 150,
      y: 780,
    },
    {
      id: "api_news",
      type: "api",
      label: "API: /api/news\nЗагрузка новостей",
      x: 350,
      y: 780,
    },
    {
      id: "api_pages",
      type: "api",
      label: "API: /api/pages/:slug\nЗагрузка контента",
      x: 550,
      y: 780,
    },
    {
      id: "api_contacts",
      type: "api",
      label: "API: /api/contacts\nЗагрузка контактов",
      x: 750,
      y: 780,
    },
    // Row 7 - Calculator algorithm
    {
      id: "calc_input",
      type: "process",
      label: "Ввод оценок\nза экзамены",
      x: 200,
      y: 890,
    },
    {
      id: "calc_avg",
      type: "process",
      label: "Расчёт\nсреднего балла",
      x: 400,
      y: 890,
    },
    {
      id: "calc_compare",
      type: "decision",
      label: "Сравнение\nс проходным\nбаллом",
      x: 600,
      y: 890,
    },
    {
      id: "calc_result",
      type: "result",
      label: "Результат:\nВысокий / Средний /\nНизкий / Маловероятно",
      x: 800,
      y: 890,
    },
    // Row 8 - Search algorithm
    {
      id: "search_input",
      type: "process",
      label: "Ввод\nзапроса",
      x: 200,
      y: 1000,
    },
    {
      id: "search_match",
      type: "process",
      label: "Поиск совпадений\nпо всем страницам",
      x: 450,
      y: 1000,
    },
    {
      id: "search_highlight",
      type: "result",
      label: "Подсветка\nсовпадений +\nКонтекст",
      x: 700,
      y: 1000,
    },
    // Row 9 - Timer
    {
      id: "timer_events",
      type: "process",
      label: "Получение\nсписка событий",
      x: 300,
      y: 1100,
    },
    {
      id: "timer_calc",
      type: "process",
      label: "Расчёт\nвремени",
      x: 500,
      y: 1100,
    },
    {
      id: "timer_display",
      type: "result",
      label: "Обратный\nотсчёт\n(дни:часы:мин:сек)",
      x: 700,
      y: 1100,
    },
    // Row 10 - Auth
    {
      id: "catch_all",
      type: "process",
      label: "Catch-all route\n* → SubPage",
      x: 500,
      y: 1200,
    },
    { id: "end", type: "end", label: "Отрисовка\nстраницы", x: 500, y: 1290 },
  ];

  const edges = [
    { from: "start", to: "layout" },
    { from: "layout", to: "nav" },
    // From nav to main pages
    { from: "nav", to: "home", label: "Главная" },
    { from: "nav", to: "about", label: "О колледже" },
    { from: "nav", to: "news", label: "Новости" },
    { from: "nav", to: "contacts", label: "Контакты" },
    { from: "nav", to: "sveden", label: "Сведения" },
    { from: "nav", to: "itcube", label: "IT-Куб" },
    { from: "nav", to: "abit", label: "Абитуриентам" },
    { from: "nav", to: "stud", label: "Студентам" },
    { from: "nav", to: "rodit", label: "Родителям" },
    { from: "nav", to: "sotr", label: "Сотрудникам" },
    { from: "nav", to: "calc", label: "Калькулятор" },
    { from: "nav", to: "spec", label: "Спец-ти" },
    // To subpages
    { from: "sveden", to: "sveden_sub" },
    { from: "abit", to: "abit_sub" },
    { from: "stud", to: "stud_sub" },
    { from: "rodit", to: "rodit_sub" },
    { from: "sotr", to: "sotr_sub" },
    { from: "itcube", to: "itcube_sub" },
    // To SubPage component
    { from: "sveden_sub", to: "subpage" },
    { from: "abit_sub", to: "subpage" },
    { from: "stud_sub", to: "subpage" },
    { from: "rodit_sub", to: "subpage" },
    { from: "sotr_sub", to: "subpage" },
    { from: "itcube_sub", to: "subpage" },
    // To API
    { from: "subpage", to: "api_pages" },
    { from: "news", to: "api_news" },
    { from: "contacts", to: "api_contacts" },
    { from: "layout", to: "api_nav" },
    // Calculator flow
    { from: "calc", to: "calc_input" },
    { from: "calc_input", to: "calc_avg" },
    { from: "calc_avg", to: "calc_compare" },
    { from: "calc_compare", to: "calc_result", label: "да" },
    // Search flow
    { from: "nav", to: "search", label: "Поиск" },
    { from: "search", to: "search_input" },
    { from: "search_input", to: "search_match" },
    { from: "search_match", to: "search_highlight" },
    // Timer
    { from: "home", to: "timer_events", label: "События" },
    { from: "timer_events", to: "timer_calc" },
    { from: "timer_calc", to: "timer_display" },
    // Catch-all
    { from: "nav", to: "catch_all", label: "* (любой URL)" },
    { from: "catch_all", to: "end" },
    { from: "api_pages", to: "end" },
    { from: "api_news", to: "end" },
    { from: "api_contacts", to: "end" },
    { from: "api_nav", to: "end" },
    { from: "calc_result", to: "end" },
    { from: "search_highlight", to: "end" },
    { from: "timer_display", to: "end" },
  ];

  const getNodeColor = (type) => {
    const colors = {
      start: { fill: "#059669", text: "#fff", stroke: "#047857" },
      end: { fill: "#1a365d", text: "#fff", stroke: "#0f2440" },
      process: { fill: "#dbeafe", text: "#1e40af", stroke: "#93c5fd" },
      decision: { fill: "#fef3c7", text: "#92400e", stroke: "#fcd34d" },
      page: { fill: "#ede9fe", text: "#5b21b6", stroke: "#c4b5fd" },
      api: { fill: "#fce7f3", text: "#9d174d", stroke: "#f9a8d4" },
      result: { fill: "#d1fae5", text: "#065f46", stroke: "#6ee7b7" },
    };
    return colors[type] || colors.process;
  };

  const renderNode = (node) => {
    const color = getNodeColor(node.type);
    const lines = node.label.split("\n");
    const w = node.type === "decision" ? 120 : 110;
    const h = node.type === "decision" ? 70 : lines.length * 16 + 20;

    if (node.type === "decision") {
      const cx = node.x;
      const cy = node.y;
      const points = `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
      return (
        <g key={node.id}>
          <polygon
            points={points}
            fill={color.fill}
            stroke={color.stroke}
            strokeWidth="2"
          />
          {lines.map((line, i) => (
            <text
              key={i}
              x={cx}
              y={cy - (lines.length - 1) * 8 + i * 16}
              textAnchor="middle"
              fill={color.text}
              fontSize="10"
              fontWeight="600"
              fontFamily="var(--font-sans)"
            >
              {line}
            </text>
          ))}
        </g>
      );
    }

    if (node.type === "start" || node.type === "end") {
      return (
        <g key={node.id}>
          <rect
            x={node.x - w / 2}
            y={node.y - h / 2}
            width={w}
            height={h}
            rx={h / 2}
            fill={color.fill}
            stroke={color.stroke}
            strokeWidth="2"
          />
          {lines.map((line, i) => (
            <text
              key={i}
              x={node.x}
              y={node.y - (lines.length - 1) * 8 + i * 16}
              textAnchor="middle"
              fill={color.text}
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-sans)"
            >
              {line}
            </text>
          ))}
        </g>
      );
    }

    return (
      <g key={node.id}>
        <rect
          x={node.x - w / 2}
          y={node.y - h / 2}
          width={w}
          height={h}
          rx={8}
          fill={color.fill}
          stroke={color.stroke}
          strokeWidth="1.5"
        />
        {lines.map((line, i) => (
          <text
            key={i}
            x={node.x}
            y={node.y - (lines.length - 1) * 8 + i * 16}
            textAnchor="middle"
            fill={color.text}
            fontSize="10"
            fontWeight="600"
            fontFamily="var(--font-sans)"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  const renderEdge = (edge) => {
    const fromNode = nodes.find((n) => n.id === edge.from);
    const toNode = nodes.find((n) => n.id === edge.to);
    if (!fromNode || !toNode) return null;

    const x1 = fromNode.x;
    const y1 = fromNode.y + (fromNode.type === "decision" ? 35 : 25);
    const x2 = toNode.x;
    const y2 = toNode.y - (toNode.type === "decision" ? 35 : 25);

    const midY = (y1 + y2) / 2;
    const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

    return (
      <g key={`${edge.from}-${edge.to}`}>
        <path
          d={path}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.2"
          markerEnd="url(#arrow)"
        />
        {edge.label && (
          <text
            x={(x1 + x2) / 2}
            y={midY - 4}
            textAnchor="middle"
            fill="#64748b"
            fontSize="8"
            fontFamily="var(--font-sans)"
            fontWeight="500"
          >
            {edge.label}
          </text>
        )}
      </g>
    );
  };

  return (
    <Section id="flowchart" title="Блок-схема алгоритмов сайта" number="17">
      <p className="text-gray-500 text-xs mb-4">
        Полная схема маршрутов, компонентов и данных сайта Владимирского
        политехнического колледжа
      </p>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 960 1350"
          className="w-full"
          style={{ minWidth: "800px" }}
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Legend */}
          <g transform="translate(20, 0)">
            {[
              { color: "#059669", label: "Начало / Конец" },
              { color: "#dbeafe", label: "Процесс" },
              { color: "#fef3c7", label: "Решение" },
              { color: "#ede9fe", label: "Страница" },
              { color: "#fce7f3", label: "API запрос" },
              { color: "#d1fae5", label: "Результат" },
            ].map((item, i) => (
              <g key={i} transform={`translate(0, ${i * 16})`}>
                <rect
                  x={0}
                  y={0}
                  width={12}
                  height={12}
                  rx={2}
                  fill={item.color}
                  stroke="#d1d5db"
                  strokeWidth="0.5"
                />
                <text
                  x={18}
                  y={10}
                  fontSize="9"
                  fill="#64748b"
                  fontFamily="var(--font-sans)"
                >
                  {item.label}
                </text>
              </g>
            ))}
          </g>

          {/* Edges */}
          {edges.map(renderEdge)}

          {/* Nodes */}
          {nodes.map(renderNode)}
        </svg>
      </div>

      {/* Route table */}
      <div className="mt-8">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Полная таблица маршрутов
        </h4>
        <div className="overflow-x-auto">
          <table className="table-official text-xs">
            <thead>
              <tr>
                <th>Маршрут</th>
                <th>Компонент</th>
                <th>Описание</th>
                <th>API</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["/", "Home", "Главная страница", "/api/navigation"],
                ["/about", "About", "О колледже (таймлайн, руководство)", "—"],
                ["/news", "News", "Новости с фильтрацией", "/api/news"],
                ["/contacts", "Contacts", "Контакты + форма", "/api/contacts"],
                ["/calculator", "Calculator", "Калькулятор поступления", "—"],
                [
                  "/specialties",
                  "Specialties",
                  "3D-карточки специальностей",
                  "—",
                ],
                ["/sveden", "Sveden", "Сведения об ОО (12 разделов)", "—"],
                [
                  "/sveden/*",
                  "SubPage",
                  "15 подстраниц сведений",
                  "/api/pages/:slug",
                ],
                ["/abiturientam", "Abiturientam", "Абитуриентам", "—"],
                [
                  "/abiturientam/*",
                  "SubPage",
                  "10 подстраниц",
                  "/api/pages/:slug",
                ],
                ["/studentam", "Studentam", "Студентам", "—"],
                [
                  "/studentam/*",
                  "SubPage",
                  "14 подстраниц",
                  "/api/pages/:slug",
                ],
                ["/roditelyam", "Roditelyam", "Родителям", "—"],
                [
                  "/roditelyam/*",
                  "SubPage",
                  "7 подстраниц",
                  "/api/pages/:slug",
                ],
                ["/sotrudnikam", "Sotrudnikam", "Сотрудникам", "—"],
                [
                  "/sotrudnikam/*",
                  "SubPage",
                  "10 подстраниц",
                  "/api/pages/:slug",
                ],
                ["/it-cube", "ITCube", "IT-Куб центр", "—"],
                ["/it-cube/*", "SubPage", "8 подстраниц", "/api/pages/:slug"],
                ["/search", "SubPage", "Модальный поиск", "/api/search"],
                ["*", "SubPage", "Catch-all (404)", "/api/pages/:slug"],
              ].map(([route, component, desc, api]) => (
                <tr key={route}>
                  <td className="font-mono text-[var(--color-official)] font-bold whitespace-nowrap">
                    {route}
                  </td>
                  <td className="whitespace-nowrap">{component}</td>
                  <td>{desc}</td>
                  <td className="text-gray-400 font-mono text-[10px]">{api}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════ MAIN SHOWCASE ═══════════════════════════ */
export default function Showcase() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-[var(--color-official-dark)] via-[var(--color-official)] to-[var(--color-official-dark)] py-12 px-4 text-center">
        <div className="flag-stripe mb-6" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            Демонстрация дизайна
          </h1>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Все ключевые разделы и компоненты сайта Владимирского
            политехнического колледжа. Скриньте нужные элементы.
          </p>
        </motion.div>
        {/* Jump nav */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {[
            ["UI-kit", "uikit"],
            ["Главная (desktop)", "home-desktop"],
            ["Главная (mobile)", "home-mobile"],
            ["Навигация", "navigation"],
            ["SubPage", "subpage"],
            ["Калькулятор", "calculator"],
            ["Результаты", "calculator-results"],
            ["Поиск", "modal-search"],
            ["Таймер", "timer"],
            ["3D-карточки", "specialty-cards"],
            ["Сведения ОО", "sveden"],
            ["Новости", "news"],
            ["О колледже", "timeline"],
            ["Контакты", "contacts"],
            ["Шапка #17", "header"],
            ["Подвал #18", "footer"],
            ["Hero Desktop #19", "hero-desktop"],
            ["Hero Mobile #20", "hero-mobile"],
            ["Карточки #21", "nav-cards"],
            ["Статистика #22", "about-stats"],
            ["3D Фронт #23", "spec-front"],
            ["3D Оборот #24", "spec-back"],
            ["Таймер #25", "timer-new"],
            ["Новости #26", "news-new"],
            ["Сведения #27", "sveden-new"],
            ["Абитуриентам #28", "abit-page"],
            ["Студентам #29", "student-page"],
            ["Калькулятор #30", "calc-new"],
            ["Результаты #31", "calc-results"],
            ["Поиск #32", "search-modal"],
            ["Таймлайн #33", "timeline-new"],
            ["Контакты #34", "contacts-new"],
            ["Меню #35", "mobile-menu"],
            ["Планшет #36", "tablet-view"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-xs font-medium hover:bg-white/20 hover:text-white transition-all border border-white/10"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <UIkitSection />
        <HomeDesktopSection />
        <HomeMobileSection />
        <NavigationSection />
        <SubPageSection />
        <CalculatorSection />
        <CalculatorResultsSection />
        <ModalSearchSection />
        <TimerSection />
        <SpecialtyCardsSection />
        <SvedenSection />
        <NewsSection />
        <TimelineSection />
        <ContactsSection />
        <FlowchartSection />
        {/* Рисунки 17-36: Новые разделы */}
        <HeaderSection />
        <FooterSection />
        <HeroDesktopSection />
        <HeroMobileSection />
        <NavCardsSection />
        <AboutStatsSection />
        <SpecialtyFrontSection />
        <SpecialtyBackSection />
        <TimerNewSection />
        <NewsNewSection />
        <SvedenNewSection />
        <AbitSection />
        <StudentSection />
        <CalcNewSection />
        <CalcResultsSection />
        <SearchModalSection />
        <TimelineNewSection />
        <ContactsNewSection />
        <MobileMenuSection />
        <TabletViewSection />
      </div>
    </div>
  );
}
