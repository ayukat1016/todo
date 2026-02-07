import type { Todo, Category, Priority } from '../types/todo';
import { format, isPast, isToday } from 'date-fns';
import { ja } from 'date-fns/locale';

interface TodoItemProps {
  todo: Todo;
  category: Category | undefined;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const priorityColors: Record<Priority, string> = {
  low: 'bg-green-100 text-green-800 border-green-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  high: 'bg-orange-100 text-orange-800 border-orange-300',
  urgent: 'bg-red-100 text-red-800 border-red-300',
};

const priorityLabels: Record<Priority, string> = {
  low: '低',
  medium: '中',
  high: '高',
  urgent: '緊急',
};

export function TodoItem({ todo, category, onToggle, onEdit, onDelete }: TodoItemProps) {
  const handleDelete = () => {
    if (window.confirm('このTODOを削除しますか？')) {
      onDelete(todo.id);
    }
  };

  const isOverdue = todo.deadline && !todo.completed && isPast(todo.deadline) && !isToday(todo.deadline);
  const isDueToday = todo.deadline && !todo.completed && isToday(todo.deadline);

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 transition-all hover:shadow-lg ${
      todo.completed ? 'opacity-60' : ''
    } ${isOverdue ? 'border-red-500' : isDueToday ? 'border-yellow-500' : 'border-gray-300'}`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(todo)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                title="編集"
              >
                編集
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                title="削除"
              >
                削除
              </button>
            </div>
          </div>

          {todo.description && (
            <p className={`text-sm mb-2 ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 items-center">
            <span className={`px-2 py-1 rounded text-xs font-medium border ${priorityColors[todo.priority]}`}>
              優先度: {priorityLabels[todo.priority]}
            </span>

            {category && (
              <span
                className="px-2 py-1 rounded text-xs font-medium text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.icon} {category.name}
              </span>
            )}

            {todo.deadline && (
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                isOverdue
                  ? 'bg-red-100 text-red-800 border border-red-300'
                  : isDueToday
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-300'
              }`}>
                📅 {format(todo.deadline, 'yyyy/MM/dd (E)', { locale: ja })}
                {isOverdue && ' 期限切れ'}
                {isDueToday && ' 今日まで'}
              </span>
            )}

            {todo.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {todo.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs border border-blue-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-2 text-xs text-gray-400">
            作成: {format(todo.createdAt, 'yyyy/MM/dd HH:mm')}
            {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
              <span className="ml-2">更新: {format(todo.updatedAt, 'yyyy/MM/dd HH:mm')}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
