import type { Todo, Category, SortBy } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  categories: Category[];
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoList({
  todos,
  categories,
  sortBy,
  onSortChange,
  onToggle,
  onEdit,
  onDelete,
}: TodoListProps) {
  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id);
  };

  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">TODOがありません</p>
        <p className="text-gray-400 text-sm mt-2">上のフォームから新しいTODOを追加してください</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          TODOリスト ({todos.length}件)
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-600">
            並び替え:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="createdAt">作成日時</option>
            <option value="deadline">期限</option>
            <option value="priority">優先度</option>
          </select>
        </div>
      </div>

      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            category={getCategoryById(todo.category)}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
