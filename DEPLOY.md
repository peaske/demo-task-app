# GitHub 本番プッシュ手順書

## 🚀 GitHub へのプッシュ手順

以下のコマンドを順番に実行してください：

### 1. Git リポジトリ初期化
```bash
cd /Users/peaske/Development/demo-task-app
git init
```

### 2. Git 設定（初回のみ）
```bash
git config user.name "peaske"
git config user.email "your-email@example.com"  # 実際のメールアドレスに変更
```

### 3. リモートリポジトリ設定
```bash
git remote add origin https://github.com/peaske/demo-task-app.git
```

### 4. 初期データファイル作成
```bash
npm run init-data
```

### 5. ファイルをステージング
```bash
git add .
```

### 6. 初回コミット
```bash
git commit -m "feat: Initial release v2.0.0 - Full-stack task app with edit history

🎯 Features:
- ✅ Complete CRUD operations for tasks
- ✅ Real-time edit history tracking
- ✅ IP address and session tracking
- ✅ RESTful API with Express.js
- ✅ React frontend with error handling
- ✅ JSON file database
- ✅ CORS support
- ✅ Health check endpoints

🛠️ Technical Stack:
- Frontend: React 18 + Vite
- Backend: Node.js + Express.js
- Database: JSON files
- Features: Edit history, IP tracking, session management

📚 Perfect for:
- Learning full-stack development
- Understanding RESTful API design
- Exploring React Hooks
- Database design patterns
- Session management concepts"
```

### 7. GitHub にプッシュ
```bash
git branch -M main
git push -u origin main
```

## 🔧 後続の更新時

```bash
# 変更をステージング
git add .

# コミット
git commit -m "feat: 機能追加の説明"

# プッシュ
git push origin main
```

## 🎯 確認事項

プッシュ後、以下を確認してください：

1. **GitHub リポジトリページ**: https://github.com/peaske/demo-task-app
2. **README表示確認**: マークダウンが正しく表示されているか
3. **ファイル構造確認**: 必要なファイルがすべてアップロードされているか
4. **リリースタグ作成**: v2.0.0 タグの作成を検討

## 📋 プッシュ内容

以下のファイルがプッシュされます：

### フロントエンド
- `src/App.jsx` - メインコンポーネント（API連携済み）
- `src/main.jsx` - React エントリーポイント
- `index.html` - HTMLテンプレート
- `vite.config.js` - Vite設定
- `package.json` - v2.0.0、本番用スクリプト追加

### バックエンド
- `backend/server.js` - Express サーバー（完全版）
- `backend/package.json` - v2.0.0、本番用設定
- `backend/data/tasks.init.json` - 初期タスクデータ
- `backend/data/history.init.json` - 初期履歴データ
- `backend/data/.gitkeep` - ディレクトリ保持

### 設定ファイル
- `.gitignore` - Git除外設定
- `README.md` - 本番用ドキュメント

## ❗ 注意事項

- 実際のデータファイル（tasks.json, history.json）は.gitignoreで除外済み
- 初期データファイル（*.init.json）から本番環境でコピー
- 個人情報や機密情報は含まれていません

---

**準備完了！上記コマンドを実行してGitHubにプッシュしてください。** 🚀
