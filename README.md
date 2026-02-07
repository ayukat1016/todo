# TODO管理アプリ

モダンなTODO管理Webアプリケーション。React、Vite、TypeScript、Tailwind CSSで構築されています。

## 機能

- ✅ **基本的なCRUD操作**: TODOの作成、読取、更新、削除
- 📅 **期限管理**: 期限設定と期限切れ警告
- 🎯 **優先度管理**: 低・中・高・緊急の4段階
- 🏷️ **カテゴリ分類**: カスタマイズ可能なカテゴリ
- 🔖 **タグ機能**: 複数タグによる分類
- 🔍 **フィルタリング**: カテゴリ、優先度、完了状態、テキスト検索
- 📊 **ソート機能**: 作成日時、期限、優先度で並び替え
- 💾 **データ永続化**: localStorageによる自動保存
- 📱 **レスポンシブデザイン**: モバイルフレンドリー

## 技術スタック

- **React 19** - UIライブラリ
- **Vite** - 高速ビルドツール
- **TypeScript** - 型安全性
- **Tailwind CSS** - ユーティリティファーストCSS
- **date-fns** - 日付操作
- **uuid** - ユニークID生成

## セットアップ

### 必要要件

- Node.js 22.21.1以上
- npm

### インストール

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ブラウザでアクセス
# http://localhost:5174 (デフォルト)
```

### ビルド

```bash
# 本番用ビルド
npm run build

# ビルドのプレビュー
npm run preview
```

## プロジェクト構造

```
src/
├── components/          # UIコンポーネント
│   ├── TodoList.tsx    # TODOリスト表示
│   ├── TodoItem.tsx    # 個別TODOアイテム
│   ├── TodoForm.tsx    # 作成・編集フォーム
│   ├── FilterBar.tsx   # フィルタリングUI
│   └── CategoryManager.tsx  # カテゴリ管理
├── hooks/              # カスタムフック
│   ├── useTodos.ts     # TODO操作ロジック
│   ├── useCategories.ts # カテゴリ管理ロジック
│   └── useLocalStorage.ts # localStorage抽象化
├── types/              # TypeScript型定義
│   └── todo.ts         # データモデル
├── utils/              # ユーティリティ関数
│   └── storage.ts      # localStorage操作
├── App.tsx             # ルートコンポーネント
└── main.tsx            # エントリーポイント
```

## 使い方

### TODOの作成

1. タイトル（必須）と説明を入力
2. 期限、優先度、カテゴリを設定
3. タグをカンマ区切りで入力（オプション）
4. 「追加」ボタンをクリック

### TODOの編集

1. TODOアイテムの「編集」ボタンをクリック
2. フォームで内容を修正
3. 「更新」ボタンをクリック

### TODOの削除

1. TODOアイテムの「削除」ボタンをクリック
2. 確認ダイアログで承認

### フィルタリング

- カテゴリ、優先度、完了状態でフィルター
- 検索バーでタイトル、説明、タグを検索
- 複数のフィルターを組み合わせて使用可能

### カテゴリ管理

1. ヘッダーの「カテゴリ管理」ボタンをクリック
2. 新規カテゴリを追加（名前、色、アイコン）
3. 既存カテゴリを編集・削除
4. ※使用中のカテゴリは削除できません

## データモデル

### Todo

```typescript
interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  deadline: Date | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  tags: string[];
}
```

### Category

```typescript
interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}
```

## ブラウザ対応

- Chrome/Edge (推奨)
- Firefox
- Safari
- モバイルブラウザ

## ライセンス

MIT

## 開発者

Claude Code による実装
