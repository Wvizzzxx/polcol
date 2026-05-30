import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IconSearch, IconX, IconChevronRight } from '@tabler/icons-react'
import { mainNav as fallbackNav, additionalLinks } from '../data/navigation'

// Flatten all pages for search
function buildPagesIndex() {
  const pages = []
  const seen = new Set()

  const addPage = (title, path, section = '') => {
    if (seen.has(path)) return
    seen.add(path)
    pages.push({ title, path, section })
  }

  fallbackNav.forEach(item => {
    if (item.path) addPage(item.title, item.path, item.title)
    if (item.submenu) {
      item.submenu.forEach(sub => addPage(sub.title, sub.path, item.title))
    }
  })

  additionalLinks.forEach(link => addPage(link.title, link.path, 'Дополнительно'))

  addPage('Главная', '/')
  addPage('О колледже', '/about')
  addPage('Калькулятор', '/calculator')
  addPage('Все специальности', '/abiturientam/spetsialnosti')
  addPage('Новости', '/news')
  addPage('Карта сайта', '/sitemap')
  addPage('Приёмная комиссия', '/abiturientam/priemnaya-komissiya')
  addPage('Список поступления', '/abiturientam/spisok-postupleniya')
  addPage('Контакты', '/contacts')
  addPage('Документы', '/sveden/document')
  addPage('Образование', '/sveden/education')
  addPage('Педагогический состав', '/sveden/employees')
  addPage('IT-Куб', '/it-cube')

  return pages
}

const ALL_PAGES = buildPagesIndex()

function HighlightText({ text, query }) {
  if (!query.trim()) return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="bg-accent/30 text-accent-light font-semibold px-0.5 rounded">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  const openTimeRef = useRef(0)

  useEffect(() => {
    if (isOpen) {
      openTimeRef.current = Date.now()
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    return ALL_PAGES.filter(p => {
      return p.title.toLowerCase().includes(q) || 
             p.section.toLowerCase().includes(q) ||
             p.path.toLowerCase().includes(q)
    }).slice(0, 8)
  }, [query])

  const handleSelect = useCallback((path) => {
    navigate(path)
    onClose()
  }, [navigate, onClose])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex].path)
    }
  }, [results, selectedIndex, onClose, handleSelect])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => handleKeyDown(e)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: 'rgba(10, 20, 40, 0.97)' }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-16">
            <div className="relative">
              <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по сайту..."
                className="w-full pl-12 pr-20 py-4 bg-white/10 border border-white/15 rounded-xl text-white text-lg placeholder-white/30 outline-none focus:border-accent/50 focus:bg-white/15 transition-all font-medium"
              />
              <button
                onClick={onClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-white/40 text-xs font-medium border border-white/15 rounded-lg hover:bg-white/10 hover:text-white/70 transition-all hidden sm:block"
              >
                ESC
              </button>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white/70 transition-all sm:hidden"
                >
                  <IconX className="w-5 h-5" />
                </button>
              )}
            </div>

            <p className="mt-3 text-white/20 text-xs font-medium text-right hidden sm:block">ESC для закрытия</p>

            {query.trim() && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 text-white/30 text-xs font-bold uppercase tracking-widest"
              >
                {results.length === 0 
                  ? 'Ничего не найдено' 
                  : `Найдено: ${results.length} ${results.length === 1 ? 'результат' : results.length < 5 ? 'результатa' : 'результатов'}`
                }
              </motion.p>
            )}
          </div>

          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 mt-4 overflow-y-auto flex-1" ref={listRef}>
            {results.map((item, idx) => (
              <motion.button
                key={item.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => handleSelect(item.path)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-xl mb-2 group transition-all border border-transparent ${
                  idx === selectedIndex 
                    ? 'bg-white/10 border-white/10' 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {item.section && item.section !== item.title && (
                      <p className="text-white/30 text-xs font-medium mb-1 truncate">
                        <HighlightText text={item.section} query={query} />
                        {' → '}
                        <HighlightText text={item.title} query={query} />
                      </p>
                    )}
                    <h3 className="text-white font-semibold text-base sm:text-lg leading-tight">
                      <HighlightText text={item.title} query={query} />
                    </h3>
                    <p className="text-white/20 text-xs mt-1.5 font-mono truncate">{item.path}</p>
                  </div>
                  <IconChevronRight className={`w-5 h-5 flex-shrink-0 transition-all ${
                    idx === selectedIndex ? 'text-accent translate-x-0.5' : 'text-white/20'
                  }`} />
                </div>
              </motion.button>
            ))}

            {query.trim() && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <IconSearch className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/30 text-sm font-medium">По запросу «{query}» ничего не найдено</p>
                <p className="text-white/15 text-xs mt-1">Попробуйте другой запрос</p>
              </motion.div>
            )}
          </div>

          {results.length > 0 && (
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-4">
              <div className="flex items-center justify-center gap-4 text-white/15 text-xs">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">↓</kbd>
                  навигация
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">↵</kbd>
                  открыть
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-mono">ESC</kbd>
                  закрыть
                </span>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}