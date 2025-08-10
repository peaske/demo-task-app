import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:3001/api';
  const sessionId = 'session-' + Math.random().toString(36).substring(7);

  console.log('App component loaded');
  console.log('API_BASE:', API_BASE);
  console.log('sessionId:', sessionId);

  // API連携の実装
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks from:', `${API_BASE}/tasks`);
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/tasks`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const tasks = await response.json();
      console.log('Fetched tasks:', tasks);
      setTasks(tasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setError(`Failed to load tasks: ${error.message}`);
      setTasks([]); // フォールバック用空配列
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await fetch(`${API_BASE}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Session-Id': sessionId
          },
          body: JSON.stringify({ text: newTask.trim() })
        });
        if (response.ok) {
          fetchTasks();
          setNewTask('');
        }
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'X-Session-Id': sessionId }
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const toggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      try {
        const response = await fetch(`${API_BASE}/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Session-Id': sessionId
          },
          body: JSON.stringify({ completed: !task.completed })
        });
        if (response.ok) {
          fetchTasks();
        }
      } catch (error) {
        console.error('Failed to toggle task:', error);
      }
    }
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = async () => {
    if (editText.trim()) {
      try {
        const response = await fetch(`${API_BASE}/tasks/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Session-Id': sessionId
          },
          body: JSON.stringify({ text: editText.trim() })
        });
        if (response.ok) {
          fetchTasks();
        }
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd'
    }}>
      <h1 style={{
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center'
      }}>
        Task List
      </h1>

      {/* ローディング・エラー表示 */}
      {loading && (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: 'lightblue',
          marginBottom: '15px'
        }}>
          Loading tasks...
        </div>
      )}
      
      {error && (
        <div style={{
          padding: '20px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          marginBottom: '15px',
          border: '1px solid #ef5350'
        }}>
          <strong>Error:</strong> {error}
          <br />
          <button 
            onClick={fetchTasks}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Retry
          </button>
          <button 
            onClick={() => {
              setError(null);
              setLoading(false);
              setTasks([
                { id: 1, text: 'Demo task (offline mode)', completed: false }
              ]);
            }}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Use Offline Mode
          </button>
        </div>
      )}

      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '15px',
        marginBottom: '15px',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Enter new task"
          style={{
            flex: 1,
            padding: '8px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e0e0e0',
            border: '1px solid #ccc',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Add
        </button>
      </div>
      
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '15px'
      }}>
        {tasks.map(task => (
          <div key={task.id} style={{
            padding: '10px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              style={{ margin: 0, cursor: 'pointer' }}
            />
            
            {editingId === task.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') saveEdit();
                  if (e.key === 'Escape') cancelEdit();
                }}
                onBlur={saveEdit}
                autoFocus
                style={{
                  flex: 1,
                  padding: '4px',
                  border: '1px solid #ccc',
                  fontSize: '14px'
                }}
              />
            ) : (
              <span
                onDoubleClick={() => startEdit(task.id, task.text)}
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#888' : '#333',
                  fontSize: '14px',
                  flex: 1,
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                {task.text}
              </span>
            )}
            
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
      <div style={{
        marginTop: '15px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#666'
      }}>
        {tasks.filter(t => !t.completed).length} tasks remaining
      </div>
    </div>
  );
}

export default App;
