import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("todo-tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Could not load saved tasks:", error);
      return [];
    }
  });

  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("todo-tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Could not save tasks:", error);
    }
  }, [tasks]);

  // Add a new task or update an existing one.
  function handleSaveTask(taskDetails) {
    if (taskToEdit) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskToEdit.id ? { ...task, ...taskDetails } : task,
        ),
      );

      setTaskToEdit(null);
    } else {
      const newTask = {
        id: `${Date.now()}-${Math.random()}`,
        name: taskDetails.name,
        description: taskDetails.description,
        completed: false,
      };

      setTasks((currentTasks) => [...currentTasks, newTask]);
    }
  }

  function handleToggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleDeleteTask(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (confirmed) {
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));

      // Close the edit form if the deleted task was being edited.
      if (taskToEdit?.id === id) {
        setTaskToEdit(null);
      }
    }
  }

  function handleEditTask(task) {
    setTaskToEdit(task);
  }

  // Cancel editing and return to the new-task form.
  function handleCancelEdit() {
    setTaskToEdit(null);
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="app-container">
      <header className="app-header">
        <p className="app-label">YOUR PERSONAL WORKSPACE</p>
        <h1>My To-Do List</h1>
        <p className="app-subtitle">One task at a time. Make today count.</p>
      </header>

      <section className="todo-panel">
        <div className="task-summary">
          <div>
            <h2>Your tasks</h2>
            <p>
              {tasks.length === 0
                ? "Nothing on your list yet."
                : `${completedCount} of ${tasks.length} tasks completed`}
            </p>
          </div>

          <span className="task-count">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        <TaskForm
          onSave={handleSaveTask}
          taskToEdit={taskToEdit}
          onCancel={handleCancelEdit}
        />

        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />
      </section>

      <footer className="app-footer">
        Your tasks are saved in this browser.
      </footer>
    </main>
  );
}

export default App;
