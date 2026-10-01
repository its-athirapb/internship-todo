import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  filter,
  setFilter,
  onToggle,
  onDelete,
}) {
  return (
    <section className="task-list-container">

      <div className="task-list-header">

        <div>
          <h2>Task List</h2>

          <p>
            Manage your tasks
          </p>
        </div>


        <div className="filters">

          <button
            className={
              filter === "all"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("all")
            }
          >
            All
          </button>

          <button
            className={
              filter === "active"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("active")
            }
          >
            Active
          </button>

          <button
            className={
              filter === "completed"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("completed")
            }
          >
            Completed
          </button>

        </div>

      </div>


      <div className="tasks">

        {tasks.length === 0 ? (

          <div className="empty">

            <div className="empty-icon">
              ✓
            </div>

            <h3>
              No tasks here
            </h3>

            <p>
              Add a task to get started.
            </p>

          </div>

        ) : (

          tasks.map((task) => (

            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />

          ))

        )}

      </div>

    </section>
  );
}

export default TaskList;