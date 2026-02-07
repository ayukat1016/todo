import { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Todo, Priority, FilterState, SortBy } from '../types/todo';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = loadFromStorage();
    return stored?.todos || [];
  });

  const [filters, setFilters] = useState<FilterState>({
    category: null,
    priority: null,
    completed: 'all',
    search: '',
  });

  const [sortBy, setSortBy] = useState<SortBy>('createdAt');

  useEffect(() => {
    const stored = loadFromStorage();
    const currentState = stored || { todos: [], categories: [] };
    saveToStorage({ ...currentState, todos });
  }, [todos]);

  const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, ...updates, updatedAt: new Date() }
        : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ));
  };

  const filteredAndSortedTodos = useMemo(() => {
    let result = [...todos];

    // Apply filters
    if (filters.category) {
      result = result.filter(todo => todo.category === filters.category);
    }

    if (filters.priority) {
      result = result.filter(todo => todo.priority === filters.priority);
    }

    if (filters.completed !== 'all') {
      result = result.filter(todo =>
        filters.completed === 'completed' ? todo.completed : !todo.completed
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchLower) ||
        todo.description.toLowerCase().includes(searchLower) ||
        todo.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return a.deadline.getTime() - b.deadline.getTime();

        case 'priority':
          const priorityOrder: Record<Priority, number> = {
            urgent: 4,
            high: 3,
            medium: 2,
            low: 1,
          };
          return priorityOrder[b.priority] - priorityOrder[a.priority];

        case 'createdAt':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    return result;
  }, [todos, filters, sortBy]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const clearFilters = () => {
    setFilters({
      category: null,
      priority: null,
      completed: 'all',
      search: '',
    });
  };

  return {
    todos: filteredAndSortedTodos,
    allTodos: todos,
    filters,
    sortBy,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    updateFilters,
    clearFilters,
    setSortBy,
  };
}
