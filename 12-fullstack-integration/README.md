# 🚀 Full-Stack Integration — Day 12

Day 12 of my Web Development learning journey.

## Project: Task Studio

A React task manager that communicates with a REST API using the browser Fetch API.

## What I practised

- Connecting React to a backend
- Fetching API data with `useEffect`
- Reusable async functions with `useCallback`
- Sending JSON with `fetch()`
- HTTP methods: GET, POST, PATCH, DELETE
- Loading, error, and success states
- Controlled React forms
- Updating and deleting server-side tasks
- Environment configuration with Vite

## Run the frontend

Install Node.js, then from this folder:

    npm install
    npm run dev

Vite prints the local development URL.

## Connect to the backend

By default, the frontend calls:

    http://localhost:3000/api

You can override this by creating a `.env` file based on `.env.example`:

    VITE_API_URL=http://localhost:3000/api

The backend needs these routes:

- GET /api/tasks
- POST /api/tasks
- PATCH /api/tasks/:id
- DELETE /api/tasks/:id

The Day 10 MongoDB API provides these routes. Start that backend separately and ensure it allows requests from the Vite development origin through CORS. If CORS is not enabled in the backend, add Express CORS middleware before trying the frontend.

## Note about data formats

The frontend supports task IDs named either `_id` (typical MongoDB documents) or `id`. The API should return JSON task objects with `title` and `completed` fields.

## Learning goal

Understand how a React interface reads and changes data through a backend API instead of storing everything only in the browser.

This project was added as a learning exercise and has not been run against a live backend in this environment.