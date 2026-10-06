import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadTasks() {
    try {
      setError('');
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Could not load tasks');
      setTasks(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadTasks(); }, []);

  async function addTask(title) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Could not add task');
    setTasks((current) => [data, ...current]);
  }

  async function toggleTask(task) {
    const response = await fetch(`${API_URL}/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Could not update task');
    setTasks((current) => current.map((item) => item._id === data._id ? data : item));
  }

  async function deleteTask(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Could not delete task');
    setTasks((current) => current.filter((task) => task._id !== id));
  }

  const completed = tasks.filter((task) => task.completed).length;

  return (
    <main className="page">
      <section className="todo-card">
        <header className="header">
          <div><p className="eyebrow">MERN STACK</p><h1>To-Do List</h1><p className="subtitle">Stay organized. Get things done.</p></div>
          <div className="stats"><strong>{completed}/{tasks.length}</strong><span>completed</span></div>
        </header>

        <TaskForm onAdd={addTask} />
        {error && <div className="error">{error} <button onClick={loadTasks}>Retry</button></div>}
        {loading ? <p className="status">Loading tasks...</p> : <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />}
        <footer>MongoDB • Express • React • Node.js</footer>
      </section>
    </main>
  );
}

export default App;
