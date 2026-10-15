function TaskItem({ task, onEdit, onDelete, onToggle }) {
  // Apply a different style when the task is completed.
  const taskClass = task.completed ? "task-item completed" : "task-item";

  return (
    <article className={taskClass}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.name} as ${
          task.completed ? "active" : "completed"
        }`}
      />

      <div className="task-content">
        <button
          type="button"
          className="task-name-button"
          onClick={() => onEdit(task)}
          title="Click to edit this task"
        >
          {task.name}
        </button>

        <p className="task-description">{task.description}</p>

        <span className="task-status">
          {task.completed ? "Completed" : "In progress"}
        </span>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="edit-button"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.name}`}
        >
          Edit
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.name}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
