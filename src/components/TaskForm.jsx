import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const value = title.trim();
    if (!value) return setError('Please enter a task.');

    try {
      setSaving(true);
      setError('');
      await onAdd(value);
      setTitle('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return <form className="task-form" onSubmit={handleSubmit}>
    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?" aria-label="Task title" />
    <button disabled={saving}>{saving ? 'Adding...' : 'Add Task'}</button>
    {error && <small>{error}</small>}
  </form>;
}

export default TaskForm;
