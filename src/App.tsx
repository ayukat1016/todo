import { useState } from 'react';
import type { Todo } from './types/todo';
import { useTodos } from './hooks/useTodos';
import { useCategories } from './hooks/useCategories';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';
import { CategoryManager } from './components/CategoryManager';

function App() {
  const {
    todos,
    allTodos,
    filters,
    sortBy,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    updateFilters,
    clearFilters,
    setSortBy,
  } = useTodos();

  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  const handleAddTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    addTodo(todoData);
  };

  const handleUpdateTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, todoData);
      setEditingTodo(null);
    }
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 TODO管理アプリ</h1>
          <p className="text-gray-600">タスクを効率的に管理しましょう</p>
          <div className="mt-4">
            <button
              onClick={() => setShowCategoryManager(true)}
              className="bg-white text-gray-700 px-4 py-2 rounded-md shadow hover:shadow-md transition-shadow border border-gray-300"
            >
              🏷️ カテゴリ管理
            </button>
          </div>
        </header>

        <main>
          <TodoForm
            categories={categories}
            onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
            onCancel={editingTodo ? handleCancelEdit : undefined}
            initialData={editingTodo || undefined}
            mode={editingTodo ? 'edit' : 'create'}
          />

          <FilterBar
            filters={filters}
            categories={categories}
            onFilterChange={updateFilters}
            onClearFilters={clearFilters}
          />

          <TodoList
            todos={todos}
            categories={categories}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onToggle={toggleComplete}
            onEdit={handleEditClick}
            onDelete={deleteTodo}
          />
        </main>

        {showCategoryManager && (
          <CategoryManager
            categories={categories}
            todos={allTodos}
            onAdd={addCategory}
            onUpdate={updateCategory}
            onDelete={deleteCategory}
            onClose={() => setShowCategoryManager(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
