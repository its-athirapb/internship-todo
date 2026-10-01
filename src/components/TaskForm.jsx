import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask(title.trim());

    setTitle("");
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >

      <div className="form-icon">
        +
      </div>

      <div className="form-input">

        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <span>
          Press Enter ↵
        </span>

      </div>

      <button type="submit">
        Add Task
      </button>

    </form>
  );
}

export default TaskForm;