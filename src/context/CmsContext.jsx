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
      console.warn('CMS API недоступен, используем пустые данные');
      setData({
        pages: [],
        navigation: [],
        news: [],
        employees: [],
        specialties: [],
        contacts: [],
        settings: null,
        documents: [],
        events: [],
        heroes: [],
      });
      setError(null);
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
