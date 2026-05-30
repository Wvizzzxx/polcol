import { useCms } from '../context/CmsContext';

// Хелперы для удобного доступа к данным
export function usePages() {
  const { data } = useCms();
  return data?.pages || [];
}

export function useNavigation() {
  const { data } = useCms();
  return data?.navigation || [];
}

export function useNews() {
  const { data } = useCms();
  return data?.news || [];
}

export function useEmployees() {
  const { data } = useCms();
  return data?.employees || [];
}

export function useSpecialties() {
  const { data } = useCms();
  return data?.specialties || [];
}

export function useContacts() {
  const { data } = useCms();
  return data?.contacts || [];
}

export function useSettings() {
  const { data } = useCms();
  return data?.settings || null;
}

export function useHeroes() {
  const { data } = useCms();
  return data?.heroes || [];
}

export function useEvents() {
  const { data } = useCms();
  return data?.events || [];
}

export function useDocuments() {
  const { data } = useCms();
  return data?.documents || [];
}

// Хук для получения страницы по пути
export function usePageByPath(path) {
  const pages = usePages();
  return pages.find(p => p.path === path) || null;
}