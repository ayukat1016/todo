export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  deadline: Date | null;
  priority: Priority;
  category: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface AppState {
  todos: Todo[];
  categories: Category[];
}

export interface FilterState {
  category: string | null;
  priority: Priority | null;
  completed: 'all' | 'active' | 'completed';
  search: string;
}

export type SortBy = 'createdAt' | 'deadline' | 'priority';
