import { useCallback, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error("Could not load tasks. Is the backend running?");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Could not connect to the API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function addTask(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    setBusy(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: cleanTitle })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not add task.");
      setTitle("");
      setNotice("Task added successfully.");
      await loadTasks();
    } catch (err) {
      setError(err.message || "Could not connect to the API.");
    } finally {
      setBusy(false);
    }
  }

  async function toggleTask(task) {
    setError("");
    setNotice("");
    try {
      const response = await fetch(`${API_URL}/tasks/${task._id || task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update task.");
      await loadTasks();
    } catch (err) {
      setError(err.message || "Could not connect to the API.");
    }
  }

  async function deleteTask(task) {
    setError("");
    setNotice("");
    try {
      const response = await fetch(`${API_URL}/tasks/${task._id || task.id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not delete task.");
      setNotice("Task deleted.");
      await loadTasks();
    } catch (err) {
      setError(err.message || "Could not connect to the API.");
    }
  }

  const completed = tasks.filter((task) => task.completed).length;

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">DAY 12 · FULL-STACK</p>
        <h1>Task <span>Studio</span></h1>
        <p>React frontend connected to a REST API.</p>
        <div className="summary">
          <div><strong>{tasks.length}</strong><span>Total tasks</span></div>
          <div><strong>{completed}</strong><span>Completed</span></div>
          <div><strong>{tasks.length - completed}</strong><span>Remaining</span></div>
        </div>
      </header>

      <section className="panel">
        <h2>Your tasks</h2>
        <form onSubmit={addTask} className="task-form">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What do you want to do?"
            aria-label="New task title"
            maxLength={120}
          />
          <button disabled={busy || !title.trim()} type="submit">
            {busy ? "Adding…" : "Add task"}
          </button>
        </form>

        {error && <p className="message error" role="alert">{error}</p>}
        {notice && <p className="message success" role="status">{notice}</p>}

        {loading ? <p className="empty">Loading tasks…</p> : (
          tasks.length === 0 ? <p className="empty">No tasks yet. Add your first one above.</p> :
          <ul className="task-list">
            {tasks.map((task) => (
              <li className={task.completed ? "task done" : "task"} key={task._id || task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={Boolean(task.completed)}
                    onChange={() => toggleTask(task)}
                  />
                  <span>{task.title}</span>
                </label>
                <button className="delete" type="button" onClick={() => deleteTask(task)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
        <button className="refresh" type="button" onClick={loadTasks}>Refresh tasks</button>
      </section>
      <footer>Day 12 · Learn → Connect → Build</footer>
    </main>
  );
}