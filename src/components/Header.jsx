import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { img } from '../utils/imageUrl'
import { mainNav as fallbackNav, additionalLinks as fallbackLinks } from '../data/navigation'
import { IconMenu2, IconX, IconEye, IconChevronDown, IconRobot, IconCalculator, IconSun, IconMoon } from '@tabler/icons-react'
import { stringToIcon, nameToIcon } from '../utils/iconMap'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const [mainNav, setMainNav] = useState(fallbackNav)
  const [additionalLinks] = useState(fallbackLinks)
  const location = useLocation()
  const hoverTimeoutRef = useRef(null)
  const submenuRef = useRef(null)

  const openSubmenu = (path) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => setActiveSubmenu(path), 150)
  }

  const closeSubmenu = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => setActiveSubmenu(null), 300)
  }

  const onSubmenuEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
  }

  const onSubmenuLeave = () => {
    closeSubmenu()
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false) // eslint-disable-line react-hooks/set-state-in-effect
    setActiveSubmenu(null) // eslint-disable-line react-hooks/set-state-in-effect
  }, [location.pathname])

  // Загружаем навигацию из API
  useEffect(() => {
    fetch('/api/navigation')
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.navigation || data.items || []
        if (items.length > 0) {
          // Преобразуем плоский список в иерархию
          const topLevel = items.filter((i) => !i.parent)
          const withSubmenus = topLevel.map((item) => {
            const children = items.filter((i) => i.parent === item._id || i.parent === item.path)
            if (children.length > 0) {
              return { ...item, submenu: children }
            }
            return item
          })
          if (withSubmenus.length > 0) setMainNav(withSubmenus)
        }
      })
      .catch(() => { /* используем fallback */ })
  }, [])

  // Рендер иконки: если компонент — рендерим, если строка — маппим (emoji или имя)
  const renderIcon = (icon, className = 'w-4 h-4') => {
    if (typeof icon === 'function') {
      const Icon = icon
      return <Icon className={className} />
    }
    if (typeof icon === 'string') {
      const EmojiIcon = stringToIcon[icon]
      if (EmojiIcon) return <EmojiIcon className={className} />
      const NameIcon = nameToIcon[icon]
      if (NameIcon) return <NameIcon className={className} />
    }
    return null
  }

  // Сокращаем длинные заголовки
  const getNavLabel = (item) => {
    const label = item.label || item.title || ''
    if (label === 'Сведения об образовательной организации') return 'Сведения об ОО'
    if (label.length > 25 && label.toLowerCase().includes('сведения')) return 'Сведения об ОО'
    return label
  }

  // Фильтруем IT-Куб из основного меню (оставляем только жёлтый бейдж)
  const filteredNav = mainNav.filter(
    (item) => {
      const path = (item.path || '').toLowerCase()
      const label = (item.label || item.title || '').toLowerCase()
      return !path.includes('it-cube') && !path.includes('itcube') && !label.includes('ит-куб') && !label.includes('it-куб')
    }
  )

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95'
      }`}>
        {/* Flag stripe - government style */}
        <div className="flag-stripe" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-official p-2 hover:bg-official-50 rounded-lg transition-all"
                aria-label="Меню"
              >
                {mobileOpen ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
              </button>
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                  <img src={img('/images/logo.png')} alt="Логотип ВПК" className="w-full h-full object-contain bg-white" />
                </div>
                <div>
                  <p className="text-official text-sm font-bold leading-tight">Владимирский</p>
                  <p className="text-official-400 text-xs leading-tight font-medium">политехнический колледж</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-official-50 text-official hover:bg-official-100 transition-all"
                aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
              >
                {theme === 'dark' ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
              </button>
              <Link to="/calculator"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent-50 text-accent-dark text-sm font-semibold transition-all hover:bg-accent-100 border border-accent-200"
              >
                <IconCalculator className="w-4 h-4" />
                Калькулятор
              </Link>
              <Link to="/contacts"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-official text-white text-sm font-semibold transition-all hover:bg-official-light hover:shadow-md"
              >
                Контакты
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 py-2">
            {filteredNav.map((item) => (
              <div
                key={item.path || item._id}
                className="relative"
                onMouseEnter={() => item.submenu && openSubmenu(item.path)}
                onMouseLeave={() => item.submenu && closeSubmenu()}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname.startsWith(item.path)
                      ? 'bg-official-50 text-official'
                      : 'text-gray-600 hover:text-official hover:bg-official-50'
                  }`}
                >
                  {renderIcon(item.icon)}
                  {getNavLabel(item)}
                  {item.submenu && <IconChevronDown className="w-3 h-3 ml-0.5" />}
                </Link>
                {item.submenu && activeSubmenu === item.path && (
                  <motion.div
                    ref={submenuRef}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-white shadow-lg border border-gray-200 p-2 z-50"
                    onMouseEnter={onSubmenuEnter}
                    onMouseLeave={onSubmenuLeave}
                  >
                    <div className="grid gap-0.5">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-3.5 py-2 rounded-lg text-sm text-gray-600 hover:text-official hover:bg-official-50 transition-all font-medium"
                          onClick={() => closeSubmenu()}
                        >
                          {sub.label || sub.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
            
            {/* IT-KUB badge */}
            <Link
              to="/it-cube"
              className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-50 text-accent-dark text-xs font-bold border border-accent-100 hover:bg-accent-100 transition-all"
            >
              <IconRobot className="w-4 h-4" />
              IT-Куб
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="max-h-[75vh] overflow-y-auto p-4">
                {filteredNav.map((item) => (
                  <div key={item.path || item._id} className="mb-0.5">
                    <Link
                      to={item.path}
                      onClick={() => !item.submenu && setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-official-50 hover:text-official transition-all text-sm"
                    >
                      <span className="flex items-center gap-2.5">
                        {renderIcon(item.icon)}
                        <span className="font-medium">{item.label || item.title}</span>
                      </span>
                      {item.submenu && (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setActiveSubmenu(activeSubmenu === item.path ? null : item.path)
                          }}
                          className="p-1 hover:bg-gray-100 rounded-lg"
                          aria-label="Открыть подменю"
                        >
                          <IconChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeSubmenu === item.path ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </Link>
                    {item.submenu && activeSubmenu === item.path && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="ml-7 pl-4 border-l-2 border-official-100"
                      >
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setMobileOpen(false)}
                            className="block px-3.5 py-2.5 rounded-lg text-sm text-gray-500 hover:text-official hover:bg-official-50 transition-all"
                          >
                            {sub.label || sub.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="px-3 text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1.5">Дополнительно</p>
                  {additionalLinks.slice(0, 6).map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-official hover:bg-official-50 transition-all"
                    >
                      {link.label || link.title}
                    </Link>
                  ))}
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => { toggleTheme(); }}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-official-50 text-official hover:bg-official-100 transition-all"
                    aria-label={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
                  >
                    {theme === 'dark' ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
                  </button>
                  <Link
                    to="/calculator"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-accent-50 text-accent-dark text-sm font-semibold border border-accent-200 hover:bg-accent-100 transition-all"
                  >
                    <IconCalculator className="w-4 h-4" />
                    Калькулятор
                  </Link>
                  <Link
                    to="/contacts"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 rounded-lg bg-official text-white text-sm font-semibold transition-all hover:bg-official-light"
                  >
                    Контакты
                  </Link>
                  <Link
                    to="/it-cube"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 rounded-lg bg-accent-50 text-accent-dark text-sm font-semibold border border-accent-100 hover:bg-accent-100 transition-all"
                  >
                    IT-Куб
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Spacer */}
      <div className="h-[116px]" />
    </>
  )
}