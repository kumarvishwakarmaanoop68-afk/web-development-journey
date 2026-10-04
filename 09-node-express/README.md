# 🟢 Node.js + Express — Day 9

Day 9 of my Web Development learning journey.

## Topics

- What is Node.js?
- npm and package.json
- What is Express?
- Creating a web server
- Routes
- HTTP methods: GET, POST, PATCH, DELETE
- Request and response
- JSON data
- Middleware
- Route parameters
- Status codes
- 404 handling
- Basic error handling

## Project

### 📝 Task REST API

A beginner REST API for managing tasks.

## API Routes

| Method | Route | Purpose |
|---|---|---|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get one task |
| POST | /api/tasks | Create a task |
| PATCH | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Run

From this directory:

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`.

## Example

Create a task with:

```json
{
  "title": "Learn Express"
}
```

## Learning Goal

Understand how Node.js and Express are used to build backend servers and REST APIs.
