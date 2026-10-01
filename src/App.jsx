import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskflow-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  /* -----------------------------
     ADD TASK
  ----------------------------- */

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  /* -----------------------------
     TOGGLE TASK
  ----------------------------- */

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  /* -----------------------------
     DELETE TASK
  ----------------------------- */

  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  /* -----------------------------
     CLEAR COMPLETED
  ----------------------------- */

  const clearCompleted = () => {
    setTasks((prev) =>
      prev.filter((task) => !task.completed)
    );
  };

  /* -----------------------------
     FILTER + SEARCH
  ----------------------------- */

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const activeTasks = totalTasks - completedTasks;

  return (
    <div
      className={`app ${
        compactMode ? "compact-mode" : ""
      }`}
    >

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">
            ✓
          </div>

          <div>
            <h2>
              Task<span>Flow</span>
            </h2>

            <p>Simple. Focused. Productive.</p>
          </div>
        </div>


        <nav className="sidebar-nav">

          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            <span>▦</span>
            All Tasks
            <small>{totalTasks}</small>
          </button>

          <button
            className={
              filter === "active" ? "active" : ""
            }
            onClick={() => setFilter("active")}
          >
            <span>○</span>
            Active
            <small>{activeTasks}</small>
          </button>

          <button
            className={
              filter === "completed"
                ? "active"
                : ""
            }
            onClick={() => setFilter("completed")}
          >
            <span>✓</span>
            Completed
            <small>{completedTasks}</small>
          </button>

        </nav>


        <div className="sidebar-bottom">

          <button
            className="settings-button"
            onClick={() =>
              setShowSettings(true)
            }
          >
            <span>⚙</span>
            Settings
          </button>

          <p>TaskFlow v1.0</p>

        </div>

      </aside>


      {/* MAIN */}

      <main className="main">

        {/* HEADER */}

        <header className="header">

          <div>
            <p className="header-label">
              TASK MANAGEMENT
            </p>

            <h1>
              My Tasks
            </h1>

            <p className="header-description">
              Keep your work organized and focused.
            </p>
          </div>


          <div className="header-actions">

            <div className="search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            <button
              className="settings-icon"
              onClick={() =>
                setShowSettings(true)
              }
            >
              ⚙
            </button>

          </div>

        </header>


        {/* MAIN CONTENT */}

        <section className="workspace">

          {/* TASK FORM */}

          <TaskForm onAddTask={addTask} />


          {/* TASK LIST */}

          <TaskList
            tasks={filteredTasks}
            filter={filter}
            setFilter={setFilter}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />

        </section>


        {/* FOOTER */}

        <footer>

          <span>
            {activeTasks} active
          </span>

          <span className="footer-dot">
            •
          </span>

          <span>
            {completedTasks} completed
          </span>

        </footer>

      </main>


      {/* SETTINGS MODAL */}

      {showSettings && (

        <div
          className="settings-overlay"
          onClick={() =>
            setShowSettings(false)
          }
        >

          <div
            className="settings-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="settings-header">

              <div>
                <p>APPLICATION</p>
                <h2>Settings</h2>
              </div>

              <button
                onClick={() =>
                  setShowSettings(false)
                }
              >
                ×
              </button>

            </div>


            <div className="setting-item">

              <div>
                <strong>
                  Compact mode
                </strong>

                <span>
                  Reduce spacing between tasks
                </span>
              </div>

              <button
                className={`toggle ${
                  compactMode ? "on" : ""
                }`}
                onClick={() =>
                  setCompactMode(
                    !compactMode
                  )
                }
              >
                <span></span>
              </button>

            </div>


            <div className="setting-item">

              <div>
                <strong>
                  Clear completed tasks
                </strong>

                <span>
                  Remove all completed tasks
                </span>
              </div>

              <button
                className="clear-button"
                onClick={clearCompleted}
              >
                Clear
              </button>

            </div>


            <div className="settings-info">
              <span>Storage</span>
              <strong>Local Storage</strong>
            </div>

            <div className="settings-info">
              <span>Total tasks</span>
              <strong>{totalTasks}</strong>
            </div>


            <button
              className="close-settings"
              onClick={() =>
                setShowSettings(false)
              }
            >
              Done
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;