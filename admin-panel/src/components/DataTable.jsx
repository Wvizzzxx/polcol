import { useState, useMemo } from 'react'

export default function DataTable({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
  actions = true,
  searchable = true,
  pageSize = 10,
}) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [deleteModal, setDeleteModal] = useState(null)

  // Фильтрация по поисковому запросу
  const filteredData = useMemo(() => {
    if (!search.trim()) return data || []
    const q = search.toLowerCase().trim()
    return (data || []).filter((row) =>
      columns.some((col) => {
        const val = col.render ? col.render(row) : row[col.accessor]
        return val != null && String(val).toLowerCase().includes(q)
      })
    )
  }, [data, search, columns])

  // Пагинация
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, page, pageSize])

  // Сброс страницы при изменении поиска
  const handleSearch = (value) => {
    setSearch(value)
    setPage(1)
  }

  const handleConfirmDelete = async () => {
    if (!deleteModal) return
    try {
      await deleteModal.onConfirm(deleteModal.item)
    } finally {
      setDeleteModal(null)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 mt-2">Загрузка...</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">Нет данных</p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Поиск */}
        {searchable && (
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition"
            />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="text-left px-4 py-3 text-sm font-semibold text-gray-600 whitespace-nowrap"
                  >
                    {col.header}
                  </th>
                ))}
                {actions && (
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 whitespace-nowrap">
                    Действия
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="text-center py-8 text-gray-400 text-sm"
                  >
                    Ничего не найдено
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <tr key={row._id || rowIndex} className="hover:bg-gray-50 transition">
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="px-4 py-3 text-sm text-gray-700">
                        {col.render ? col.render(row) : row[col.accessor]}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-800 transition"
                              title="Редактировать"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => setDeleteModal({ item: row, onConfirm: onDelete })}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-800 transition"
                              title="Удалить"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-500">
              Показано {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredData.length)} из{' '}
              {filteredData.length}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                .map((p, idx, arr) => (
                  <span key={p} className="flex items-center gap-1">
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <span className="px-1 text-gray-400 text-sm">...</span>
                    )}
                    <button
                      onClick={() => setPage(p)}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                        p === page
                          ? 'bg-blue-900 text-white border-blue-900'
                          : 'border-gray-300 bg-white hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  </span>
                ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Модальное окно подтверждения удаления */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Подтверждение удаления</h3>
                <p className="text-sm text-gray-500">
                  Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Отмена
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}