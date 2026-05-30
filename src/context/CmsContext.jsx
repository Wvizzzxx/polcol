import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const content = await api.getContent();
      setData(content);
    } catch (err) {
      console.error('CMS load error:', err);
      setError(err.message);
      // Fallback: пробуем загрузить из экспортированных JS-модулей
      try {
        const script = document.createElement('script');
        script.src = '/api/public/exports/cms-data.js';
        script.onload = () => {
          if (window.__CMS_DATA) {
            setData(window.__CMS_DATA);
            setError(null);
          }
        };
        document.head.appendChild(script);
      } catch {
        // Игнорируем — данные недоступны
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Рефреш при повторном монтировании (после редиректа из админки)
  const refresh = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return (
    <CmsContext.Provider value={{ data, loading, error, refresh }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within CmsProvider');
  return ctx;
}
