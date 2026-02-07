import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Category } from '../types/todo';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const DEFAULT_CATEGORIES: Category[] = [
  { id: uuidv4(), name: '個人', color: '#3b82f6', icon: '👤' },
  { id: uuidv4(), name: '仕事', color: '#ef4444', icon: '💼' },
  { id: uuidv4(), name: '買い物', color: '#10b981', icon: '🛒' },
];

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(() => {
    const stored = loadFromStorage();
    return stored?.categories && stored.categories.length > 0
      ? stored.categories
      : DEFAULT_CATEGORIES;
  });

  useEffect(() => {
    const stored = loadFromStorage();
    const currentState = stored || { todos: [], categories: [] };
    saveToStorage({ ...currentState, categories });
  }, [categories]);

  const addCategory = (name: string, color: string, icon?: string) => {
    const newCategory: Category = {
      id: uuidv4(),
      name,
      color,
      icon,
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Omit<Category, 'id'>>) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, ...updates } : cat
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id);
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  };
}
