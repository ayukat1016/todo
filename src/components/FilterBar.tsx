import { useState, useEffect } from 'react';
import type { FilterState, Priority, Category } from '../types/todo';

interface FilterBarProps {
  filters: FilterState;
  categories: Category[];
  onFilterChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
}

export function FilterBar({ filters, categories, onFilterChange, onClearFilters }: FilterBarProps) {
  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search: searchInput });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const hasActiveFilters =
    filters.category !== null ||
    filters.priority !== null ||
    filters.completed !== 'all' ||
    filters.search !== '';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label htmlFor="filter-category" className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリ
          </label>
          <select
            id="filter-category"
            value={filters.category || ''}
            onChange={(e) => onFilterChange({ category: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">すべて</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-priority" className="block text-sm font-medium text-gray-700 mb-1">
            優先度
          </label>
          <select
            id="filter-priority"
            value={filters.priority || ''}
            onChange={(e) => onFilterChange({ priority: (e.target.value as Priority) || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">すべて</option>
            <option value="urgent">緊急</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>

        <div>
          <label htmlFor="filter-completed" className="block text-sm font-medium text-gray-700 mb-1">
            状態
          </label>
          <select
            id="filter-completed"
            value={filters.completed}
            onChange={(e) => onFilterChange({ completed: e.target.value as 'all' | 'active' | 'completed' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">すべて</option>
            <option value="active">未完了</option>
            <option value="completed">完了済み</option>
          </select>
        </div>

        <div>
          <label htmlFor="filter-search" className="block text-sm font-medium text-gray-700 mb-1">
            検索
          </label>
          <input
            type="text"
            id="filter-search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="タイトル、説明、タグで検索"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            フィルターをクリア
          </button>
        </div>
      )}
    </div>
  );
}
