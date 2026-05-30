import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IconHome, IconArrowLeft, IconSearch } from '@tabler/icons-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-8xl font-extrabold text-gradient">404</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-official mb-4"
        >
          Страница не найдена
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-base mb-8 leading-relaxed"
        >
          К сожалению, запрашиваемая страница не существует или была перемещена. 
          Проверьте правильность адреса или воспользуйтесь навигацией.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-official text-white font-semibold rounded-xl hover:bg-official-light transition-all shadow-md hover:shadow-lg"
          >
            <IconHome className="w-5 h-5" />
            На главную
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-official font-semibold rounded-xl hover:bg-gray-200 transition-all"
          >
            <IconArrowLeft className="w-5 h-5" />
            Назад
          </button>
          <Link
            to="/search"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-50 text-accent-dark font-semibold rounded-xl hover:bg-accent-100 transition-all border border-accent-200"
          >
            <IconSearch className="w-5 h-5" />
            Поиск
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-100"
        >
          <p className="text-gray-400 text-sm mb-4">Популярные разделы:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { title: 'О колледже', path: '/about' },
              { title: 'Абитуриентам', path: '/abiturientam' },
              { title: 'Специальности', path: '/abiturientam/spetsialnosti' },
              { title: 'Новости', path: '/news' },
              { title: 'Контакты', path: '/contacts' },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-official hover:border-official-200 hover:bg-official-50 transition-all"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}