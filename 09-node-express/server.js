import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
    { id: 1, title: "Learn Node.js", completed: true },
    { id: 2, title: "Learn Express", completed: false },
    { id: 3, title: "Build a REST API", completed: false }
];

let nextId = 4;

app.get("/", (req, res) => {
    res.json({
        message: "Task REST API is running 🚀",
        endpoints: [
            "GET /api/tasks",
            "GET /api/tasks/:id",
            "POST /api/tasks",
            "PATCH /api/tasks/:id",
            "DELETE /api/tasks/:id"
        ]
    });
});

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((item) => item.id === id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
});

app.post("/api/tasks", (req, res) => {
    const title = req.body.title?.trim();

    if (!title) {
        return res.status(400).json({
            error: "Task title is required"
        });
    }

    const newTask = {
        id: nextId++,
        title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.patch("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((item) => item.id === id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    if (typeof req.body.title === "string") {
        const title = req.body.title.trim();

        if (title) {
            task.title = title;
        }
    }

    if (typeof req.body.completed === "boolean") {
        task.completed = req.body.completed;
    }

    res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const taskExists = tasks.some((item) => item.id === id);

    if (!taskExists) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks = tasks.filter((item) => item.id !== id);

    res.json({
        message: "Task deleted successfully"
    });
});

app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`Task API running at http://localhost:${PORT}`);
});
