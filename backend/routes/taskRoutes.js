const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

function cleanTitle(value) {
  return String(value ?? '').trim();
}

// GET /api/tasks - fetch all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// POST /api/tasks - create a task
router.post('/', async (req, res) => {
  try {
    const title = cleanTitle(req.body.title);
    if (!title) return res.status(400).json({ message: 'Title cannot be empty' });

    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task' });
  }
});

// PUT /api/tasks/:id - update title/completed status
router.put('/:id', async (req, res) => {
  try {
    const updates = {};

    if (Object.prototype.hasOwnProperty.call(req.body, 'title')) {
      const title = cleanTitle(req.body.title);
      if (!title) return res.status(400).json({ message: 'Title cannot be empty' });
      updates.title = title;
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'completed')) {
      updates.completed = Boolean(req.body.completed);
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ message: 'Task not found' });
    res.status(500).json({ message: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id - delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully', task });
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ message: 'Task not found' });
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

module.exports = router;
