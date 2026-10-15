import TaskItem from "./TaskItem";

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  // Display a message when the task list is empty.
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>
        <h3>Your list is clear</h3>
        <p>Add a task above to get started.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default TaskList;
