import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 3001;

// データファイルパス
const TASKS_FILE = join(__dirname, 'data', 'tasks.json');
const HISTORY_FILE = join(__dirname, 'data', 'history.json');

// ミドルウェア
app.use(cors());
app.use(express.json());

// ユーティリティ関数
const readJSONFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log(`Creating new file: ${filePath}`);
    return [];
  }
};

const writeJSONFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// 編集履歴記録関数
const logHistory = async (action, taskId, oldData, newData, req) => {
  const history = await readJSONFile(HISTORY_FILE);
  const sessionId = req.headers['x-session-id'] || `session-${Date.now()}`;
  
  const historyEntry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ipAddress: req.ip || req.connection.remoteAddress,
    action,
    taskId,
    changes: {
      before: oldData,
      after: newData
    },
    userAgent: req.headers['user-agent'],
    sessionId
  };
  
  history.push(historyEntry);
  await writeJSONFile(HISTORY_FILE, history);
};

// ヘルスチェックエンドポイント
app.get('/', (req, res) => {
  res.json({ 
    message: 'Demo Task App Backend is running!',
    endpoints: {
      tasks: '/api/tasks',
      history: '/api/history'
    }
  });
});

// API エンドポイント

// タスク一覧取得
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await readJSONFile(TASKS_FILE);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read tasks' });
  }
});

// タスク作成
app.post('/api/tasks', async (req, res) => {
  try {
    const { text } = req.body;
    const tasks = await readJSONFile(TASKS_FILE);
    
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    await writeJSONFile(TASKS_FILE, tasks);
    
    // 履歴記録
    await logHistory('CREATE', newTask.id, null, newTask, req);
    
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// タスク更新
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { text, completed } = req.body;
    const tasks = await readJSONFile(TASKS_FILE);
    
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const oldTask = { ...tasks[taskIndex] };
    const updatedTask = {
      ...tasks[taskIndex],
      ...(text !== undefined && { text: text.trim() }),
      ...(completed !== undefined && { completed }),
      updatedAt: new Date().toISOString()
    };
    
    tasks[taskIndex] = updatedTask;
    await writeJSONFile(TASKS_FILE, tasks);
    
    // 履歴記録
    const action = completed !== undefined ? 'TOGGLE' : 'UPDATE';
    await logHistory(action, taskId, oldTask, updatedTask, req);
    
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// タスク削除
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const tasks = await readJSONFile(TASKS_FILE);
    
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    await writeJSONFile(TASKS_FILE, tasks);
    
    // 履歴記録
    await logHistory('DELETE', taskId, deletedTask, null, req);
    
    res.json({ message: 'Task deleted', task: deletedTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// 編集履歴取得
app.get('/api/history', async (req, res) => {
  try {
    const history = await readJSONFile(HISTORY_FILE);
    
    // ブラウザでの表示用にpretty printオプション
    if (req.query.pretty) {
      res.setHeader('Content-Type', 'text/html');
      const htmlResponse = `
        <html>
        <head><title>Edit History</title></head>
        <body>
        <h2>Demo Task App - Edit History</h2>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${JSON.stringify(history, null, 2)}</pre>
        <p><a href="/api/history">Raw JSON</a> | <a href="/">Back to API Info</a></p>
        </body>
        </html>
      `;
      res.send(htmlResponse);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.json(history);
    }
  } catch (error) {
    console.error('Failed to read history:', error);
    res.status(500).json({ error: 'Failed to read history' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
