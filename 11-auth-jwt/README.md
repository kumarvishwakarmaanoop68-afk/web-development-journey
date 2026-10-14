# 🔐 Authentication + JWT — Day 11

Day 11 of my Web Development learning journey.

## Topics

- Register and login routes
- Password hashing with bcryptjs
- JSON Web Tokens (JWT)
- Bearer token authentication
- Express middleware
- Protected routes
- Environment variables
- Basic input validation

## Project

### JWT Auth API

A beginner authentication API with register, login, and a protected profile endpoint. User records are kept in memory for learning purposes; they reset when the server restarts.

## Routes

| Method | Route | Purpose |
|---|---|---|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Log in and receive a token |
| GET | /api/auth/me | View protected profile |

## Setup

1. Install Node.js.
2. Copy .env.example to .env.
3. Set JWT_SECRET to a long, random secret.
4. Run:

    npm install
    npm start

Server: http://localhost:3000

## Example register request

POST /api/auth/register

    {
      "name": "Anoop",
      "email": "anoop@example.com",
      "password": "choose-a-strong-password"
    }

For /api/auth/me, send this header after login:

    Authorization: Bearer YOUR_TOKEN

## Security notes

- Never commit .env or real secrets.
- This is a learning demo, not production-ready authentication.
- It uses in-memory user storage; use a database for real applications.
- Production apps also need HTTPS, rate limiting, email verification, and careful token/session handling.

## Learning Goal

Understand how password hashing, JWTs, and middleware protect backend routes.