import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { CmsProvider } from './context/CmsContext'
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient()

// Определяем mobile — отключаем анимации motion
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
<BrowserRouter basename={import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL}>
        <QueryClientProvider client={queryClient}>
          <CmsProvider>
            <App />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          </CmsProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
)