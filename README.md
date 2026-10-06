

````markdown
# MERN To-Do List Application

A full-stack To-Do List application developed using the MERN stack.

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Mongoose

## Project Structure

```text
backend/
frontend/
````

## Backend

The backend uses Node.js, Express.js and MongoDB with Mongoose.

### API Endpoints

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/tasks     | Get all tasks  |
| POST   | /api/tasks     | Add a new task |
| PUT    | /api/tasks/:id | Update a task  |
| DELETE | /api/tasks/:id | Delete a task  |

### Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/todoapp
PORT=5000
```

### Run Backend

```bash
cd backend
npm install
npm start
```

## Frontend

The frontend is developed using React.js.

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## Features

* Add new tasks
* Mark tasks as completed
* Update tasks
* Delete tasks
* MongoDB database storage
* REST API integration
* React frontend without page reload

## Security

The `.env` file is not included in the repository. Use `.env.example` as a reference.

```

#### 3. Commit message

Use:

**Update README for complete MERN application**

If GitHub asks where to commit, you can use your current `main` for this documentation update.

---

After saving the README, **don't do anything else yet**.

Tell me **“README done”**, and we'll do the **final GitHub/PR check**.
```
