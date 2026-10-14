import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { randomUUID } from "node:crypto";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
app.use(express.json());

// Demo only: memory storage resets whenever the server restarts.
const users = [];

function createToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Bearer token required" });
  }
  try {
    const token = header.slice("Bearer ".length);
    const payload = jwt.verify(token, JWT_SECRET);
    const user = users.find((item) => item.id === payload.sub);
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

app.get("/", (req, res) => {
  res.json({ message: "JWT Auth API is running 🚀" });
});

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    if (!name || !email || typeof password !== "string" || password.length < 8) {
      return res.status(400).json({ error: "Name, valid email, and password of at least 8 characters are required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Enter a valid email address" });
    }
    if (users.some((user) => user.email === email)) {
      return res.status(409).json({ error: "Email is already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const user = { id: randomUUID(), name, email, passwordHash };
    users.push(user);
    const token = createToken(user);
    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (error) { next(error); }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    if (!email || typeof password !== "string") {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = users.find((item) => item.email === email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token: createToken(user) });
  } catch (error) { next(error); }
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
});

app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error("Set JWT_SECRET in .env to a random secret at least 32 characters long.");
  process.exit(1);
}

app.listen(PORT, () => console.log(`Auth API running at http://localhost:${PORT}`));