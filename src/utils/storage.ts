import type { AppState } from '../types/todo';

const STORAGE_KEY = 'todo-app-state';

export const loadFromStorage = (): AppState | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsed = JSON.parse(data);

    // Convert date strings back to Date objects
    if (parsed.todos) {
      parsed.todos = parsed.todos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load from storage:', error);
    return null;
  }
};

export const saveToStorage = (state: AppState): void => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save to storage:', error);
  }
};

export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
};
