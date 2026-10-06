import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <div className="empty"><div className="empty-icon">✓</div><h2>No tasks yet</h2><p>Add your first task above.</p></div>;
  return <div className="task-list">{tasks.map((task) => <TaskItem key={task._id} task={task} onToggle={onToggle} onDelete={onDelete} />)}</div>;
}

export default TaskList;
