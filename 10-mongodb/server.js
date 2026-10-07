import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
app.use(express.json());

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true });
const Task = mongoose.model("Task", taskSchema);

app.get("/", (req, res) => {
  res.json({ message: "Task API with MongoDB is running 🚀" });
});

app.get("/api/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) { next(error); }
});

app.get("/api/tasks/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: "Invalid task ID" });
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) { next(error); }
});

app.post("/api/tasks", async (req, res, next) => {
  try {
    const title = req.body.title?.trim();
    if (!title) return res.status(400).json({ error: "Task title is required" });
    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (error) { next(error); }
});

app.patch("/api/tasks/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: "Invalid task ID" });
    const updates = {};
    if (typeof req.body.title === "string" && req.body.title.trim()) updates.title = req.body.title.trim();
    if (typeof req.body.completed === "boolean") updates.completed = req.body.completed;
    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) { next(error); }
});

app.delete("/api/tasks/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: "Invalid task ID" });
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) { next(error); }
});

app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

async function startServer() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing. Create a .env file first.");
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully.");
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}
startServer();