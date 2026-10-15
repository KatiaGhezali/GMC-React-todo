import { useEffect, useState } from "react";

function TaskForm({ onSave, taskToEdit, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
    } else {
      setName("");
      setDescription("");
    }

    setError("");
  }, [taskToEdit]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !description.trim()) {
      setError("Please fill in both the task name and description.");
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
    });

    if (!taskToEdit) {
      setName("");
      setDescription("");
    }

    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{taskToEdit ? "Edit task" : "Add a new task"}</h3>

      <div className="form-group">
        <label htmlFor="task-name">Task name</label>
        <input
          id="task-name"
          type="text"
          placeholder="e.g. Finish my assignment"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          placeholder="What do you need to do?"
          rows="3"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setError("");
          }}
        />
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {taskToEdit ? "Save changes" : "Add task"}
        </button>

        {taskToEdit && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
