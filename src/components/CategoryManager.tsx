import { useState } from 'react';
import type { Category } from '../types/todo';

interface CategoryManagerProps {
  categories: Category[];
  todos: any[];
  onAdd: (name: string, color: string, icon?: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Category, 'id'>>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function CategoryManager({ categories, todos, onAdd, onUpdate, onDelete, onClose }: CategoryManagerProps) {
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#3b82f6');
  const [newIcon, setNewIcon] = useState('📁');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');
  const [editIcon, setEditIcon] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAdd(newName.trim(), newColor, newIcon);
    setNewName('');
    setNewColor('#3b82f6');
    setNewIcon('📁');
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditColor(category.color);
    setEditIcon(category.icon || '');
  };

  const handleUpdate = (id: string) => {
    if (!editName.trim()) return;

    onUpdate(id, {
      name: editName.trim(),
      color: editColor,
      icon: editIcon,
    });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    const usedCount = todos.filter(todo => todo.category === id).length;

    if (usedCount > 0) {
      alert(`このカテゴリは${usedCount}件のTODOで使用されています。削除できません。`);
      return;
    }

    if (window.confirm('このカテゴリを削除しますか？')) {
      onDelete(id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">カテゴリ管理</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            title="閉じる"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleAdd} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">新規カテゴリ</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="md:col-span-2">
                <label htmlFor="new-name" className="block text-sm font-medium text-gray-700 mb-1">
                  カテゴリ名
                </label>
                <input
                  type="text"
                  id="new-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="例: プロジェクト"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="new-color" className="block text-sm font-medium text-gray-700 mb-1">
                  色
                </label>
                <input
                  type="color"
                  id="new-color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="new-icon" className="block text-sm font-medium text-gray-700 mb-1">
                アイコン（絵文字）
              </label>
              <input
                type="text"
                id="new-icon"
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                placeholder="例: 📁"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={2}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              追加
            </button>
          </form>

          <div>
            <h3 className="text-lg font-semibold mb-3">既存カテゴリ</h3>
            <div className="space-y-2">
              {categories.map((category) => {
                const usedCount = todos.filter(todo => todo.category === category.id).length;
                const isEditing = editingId === category.id;

                return (
                  <div
                    key={category.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                        <div>
                          <input
                            type="color"
                            value={editColor}
                            onChange={(e) => setEditColor(e.target.value)}
                            className="w-full h-8 border border-gray-300 rounded-md cursor-pointer"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <input
                            type="text"
                            value={editIcon}
                            onChange={(e) => setEditIcon(e.target.value)}
                            placeholder="アイコン"
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            maxLength={2}
                          />
                        </div>
                        <div className="md:col-span-3 flex gap-2">
                          <button
                            onClick={() => handleUpdate(category.id)}
                            className="flex-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                          >
                            保存
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex-1 bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                          >
                            キャンセル
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-lg">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                          <span className="text-sm text-gray-500">({usedCount}件使用中)</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(category)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            編集
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                            disabled={usedCount > 0}
                          >
                            削除
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
