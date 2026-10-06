# MERN To-Do List Application

## Backend

The backend is built using Node.js, Express.js and MongoDB with Mongoose.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Add a new task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Environment Variables

Create a `.env` file in the backend folder:

MONGO_URI=mongodb://127.0.0.1:27017/todoapp

PORT=5000

## Run Backend

```bash
npm install
npm start

### Step 2 — Commit it

Commit message:

```text
Add backend API documentation
