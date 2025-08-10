# Demo Task App

フルスタックタスク管理アプリケーション（研修・本番対応）

## 🎯 概要

React + Express.js で構築されたシンプルなタスク管理アプリケーション。完全なCRUD操作、リアルタイム編集履歴記録、IP追跡機能を搭載。

## ✨ 機能

### フロントエンド
- ✅ タスクの追加・削除・編集
- ✅ 完了状態の切り替え
- ✅ ダブルクリックでテキスト編集
- ✅ RESTful API 連携
- ✅ エラーハンドリング
- ✅ オフラインモード対応

### バックエンド
- ✅ JSON ファイルデータベース
- ✅ 完全な編集履歴記録
  - IPアドレス・時刻・アクション種別
  - セッション識別子・ユーザーエージェント取得
  - 変更前後のデータ保存
- ✅ RESTful API エンドポイント
- ✅ CORS 対応
- ✅ ヘルスチェック機能

## 🚀 クイックスタート

### 1. リポジトリクローン
```bash
git clone https://github.com/peaske/demo-task-app.git
cd demo-task-app
```

### 2. 依存関係インストール
```bash
# フロントエンド
npm install

# バックエンド
cd backend
npm install
cd ..
```

### 3. 初期データファイル設定
```bash
# 初期データファイルをコピー
cp backend/data/tasks.init.json backend/data/tasks.json
cp backend/data/history.init.json backend/data/history.json
```

### 4. 開発サーバー起動

#### バックエンド起動（ターミナル1）
```bash
cd backend
npm start
# → http://localhost:3001 で起動
```

#### フロントエンド起動（ターミナル2）
```bash
npm run dev
# → http://localhost:5173 で起動
```

## 📡 API エンドポイント

### タスク管理
- `GET /api/tasks` - タスク一覧取得
- `POST /api/tasks` - タスク作成
- `PUT /api/tasks/:id` - タスク更新
- `DELETE /api/tasks/:id` - タスク削除

### 編集履歴
- `GET /api/history` - 編集履歴取得（JSON）
- `GET /api/history?pretty` - 編集履歴取得（HTML表示）

### システム
- `GET /` - ヘルスチェック

## 🎮 使用方法

- **追加**: テキスト入力してEnterまたはAddボタン
- **編集**: タスクテキストをダブルクリック
- **完了切替**: チェックボックスをクリック
- **削除**: Deleteボタンをクリック

## 🛠️ 技術構成

### フロントエンド
- **React 18** - UIライブラリ
- **Vite** - ビルドツール
- **Vanilla CSS** - スタイリング

### バックエンド
- **Node.js** - ランタイム
- **Express.js** - Webフレームワーク
- **CORS** - クロスオリジン対応
- **JSON Files** - データストレージ

## 📁 プロジェクト構造

```
demo-task-app/
├── README.md
├── package.json              # フロントエンド依存関係
├── vite.config.js           # Vite設定
├── index.html               # エントリーポイント
├── src/
│   ├── main.jsx            # React エントリーポイント
│   └── App.jsx             # メインコンポーネント
└── backend/
    ├── package.json        # バックエンド依存関係
    ├── server.js          # Express サーバー
    └── data/
        ├── .gitkeep       # ディレクトリ保持
        ├── tasks.init.json    # 初期タスクデータ
        ├── history.init.json  # 初期履歴データ
        ├── tasks.json         # タスクデータ (git除外)
        └── history.json       # 履歴データ (git除外)
```

## 🔧 本番環境デプロイ

### Heroku デプロイ例

1. **Heroku CLI インストール**
2. **アプリ作成**
   ```bash
   heroku create your-task-app-name
   ```

3. **環境変数設定**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PORT=3001
   ```

4. **デプロイ**
   ```bash
   git push heroku main
   ```

### Vercel デプロイ例（フロントエンド）

1. **Vercel CLI インストール**
2. **デプロイ**
   ```bash
   vercel --prod
   ```

## 📊 編集履歴機能

全ての操作が自動記録されます：

```json
{
  "id": 1234567890,
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ",
  "ipAddress": "xxx.xxx.xxx.xxx",
  "action": "CREATE|UPDATE|DELETE|TOGGLE",
  "taskId": 123,
  "changes": {
    "before": {...},
    "after": {...}
  },
  "userAgent": "Mozilla/5.0...",
  "sessionId": "session-xxxxx"
}
```

## 🎓 研修・学習ポイント

- ✅ フルスタック開発フロー
- ✅ RESTful API 設計
- ✅ React Hooks (useState, useEffect)
- ✅非同期通信 (fetch API)
- ✅ エラーハンドリング
- ✅ CORS設定
- ✅ JSON データベース操作
- ✅ セッション管理
- ✅ ログ記録システム

## 📋 TODO / 今後の改善予定

- [ ] ユーザー認証機能
- [ ] WebSocket によるリアルタイム更新
- [ ] データベース移行 (SQLite → PostgreSQL)
- [ ] モバイルアプリ対応
- [ ] プッシュ通知機能
- [ ] AI支援機能

## 🤝 コントリビューション

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 ライセンス

MIT License

## 👨‍💻 作成者

[@peaske](https://github.com/peaske)

---

**⭐ このリポジトリが役に立った場合は、ぜひStarをお願いします！**
