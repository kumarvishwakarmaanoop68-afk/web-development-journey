# 🍃 MongoDB + Express — Day 10

Day 10 of my Web Development learning journey.

## Topics

- MongoDB and NoSQL
- Collections and documents
- Mongoose
- Schemas and models
- CRUD operations
- Async/await
- Environment variables
- Express + database integration

## Project

### Task REST API with MongoDB

Day 9's Task API is upgraded to use MongoDB for persistent data storage.

## API Routes

| Method | Route | Purpose |
|---|---|---|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get one task |
| POST | /api/tasks | Create a task |
| PATCH | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Setup

Create a .env file from .env.example and set:

    PORT=3000
    MONGODB_URI=mongodb://127.0.0.1:27017/task_api

Then run:

    npm install
    npm start

Development:

    npm run dev

Server:

    http://localhost:3000

## Example

POST /api/tasks

    {
      "title": "Learn MongoDB"
    }

PATCH /api/tasks/:id

    {
      "completed": true
    }

Never commit your real .env file or database credentials.

## Learning Goal

Connect an Express backend to MongoDB and perform database CRUD operations through a REST API.