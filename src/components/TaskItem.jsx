import { useState } from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  const [busy, setBusy] = useState(false);

  async function handle(action) {
    try { setBusy(true); await action(task); }
    catch (error) { window.alert(error.message); }
    finally { setBusy(false); }
  }

  return <article className={`task-item ${task.completed ? 'completed' : ''}`}>
    <label className="task-main">
      <input type="checkbox" checked={task.completed} disabled={busy} onChange={() => handle(onToggle)} />
      <span>{task.title}</span>
    </label>
    <button className="delete" disabled={busy} onClick={() => handle(() => onDelete(task._id))} aria-label={`Delete ${task.title}`}>Delete</button>
  </article>;
}

export default TaskItem;
