import { useEffect, useState } from "react";

const starterTasks = [
    { id: 1, title: "Revise JavaScript", completed: true },
    { id: 2, title: "Learn React components", completed: false },
    { id: 3, title: "Build a React project", completed: false }
];

function Header({ completed, total }) {
    return (
        <header className="hero">
            <p className="eyebrow">DAY 8 • REACT</p>
            <h1>React Task Dashboard</h1>
            <p>
                Components + props + state + events + hooks in one beginner project.
            </p>
            <div className="progress">
                {completed} of {total} tasks completed
            </div>
        </header>
    );
}

function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const cleanTitle = title.trim();

        if (!cleanTitle) {
            return;
        }

        onAdd(cleanTitle);
        setTitle("");
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Add a new task..."
                aria-label="New task"
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

function TaskItem({ task, onToggle, onDelete }) {
    return (
        <li className={`task-item ${task.completed ? "completed" : ""}`}>
            <label>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />
                <span>{task.title}</span>
            </label>

            <button
                type="button"
                className="delete-button"
                onClick={() => onDelete(task.id)}
            >
                Delete
            </button>
        </li>
    );
}

function TaskList({ tasks, onToggle, onDelete }) {
    if (tasks.length === 0) {
        return <p className="empty">No tasks yet. Add one above!</p>;
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default function App() {
    const [tasks, setTasks] = useState(starterTasks);

    const completed = tasks.filter((task) => task.completed).length;
    const active = tasks.length - completed;

    useEffect(() => {
        document.title = `React Tasks (${active})`;
    }, [active]);

    function addTask(title) {
        setTasks((currentTasks) => [
            ...currentTasks,
            {
                id: Date.now(),
                title,
                completed: false
            }
        ]);
    }

    function toggleTask(id) {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    }

    function deleteTask(id) {
        setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== id)
        );
    }

    return (
        <main className="container">
            <Header completed={completed} total={tasks.length} />

            <section className="app-card">
                <div className="stats">
                    <div>
                        <strong>{tasks.length}</strong>
                        <span>Total</span>
                    </div>
                    <div>
                        <strong>{active}</strong>
                        <span>Active</span>
                    </div>
                    <div>
                        <strong>{completed}</strong>
                        <span>Completed</span>
                    </div>
                </div>

                <TaskForm onAdd={addTask} />

                <TaskList
                    tasks={tasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                />
            </section>
        </main>
    );
}
