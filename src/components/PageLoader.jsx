import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Animated logo */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-xl border-4 border-gray-200 border-t-accent"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-official">ВПК</span>
          </div>
        </div>
        
        {/* Loading bar */}
        <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1/2 h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
          />
        </div>
        
        <p className="text-gray-400 text-sm font-medium">Загрузка...</p>
      </motion.div>
    </div>
  )
}