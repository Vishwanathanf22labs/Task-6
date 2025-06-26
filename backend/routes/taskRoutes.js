const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

const uuidPattern = '[0-9a-fA-F\\-]{36}';


router.get('/', async (req, res) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    const tasks = includeInactive
      ? await Task.scope('withInactive').findAll({ order: [['createdAt', 'DESC']] })
      : await Task.findAll({ order: [['createdAt', 'DESC']] });

    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get(`/:id(${uuidPattern})`, async (req, res) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    const task = includeInactive
      ? await Task.scope('withInactive').findByPk(req.params.id)
      : await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json(task);
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/inactive/all', async (req, res) => {
  try {
    const tasks = await Task.scope('onlyInactive').findAll({ order: [['updatedAt', 'DESC']] });
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching inactive tasks:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    const task = await Task.create({ title, description, inactive: false });
    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.put(`/:id(${uuidPattern})`, async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.update({ title, description, completed });
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.delete(`/:id(${uuidPattern})`, async (req, res) => {
  try {
    const task = await Task.scope('withInactive').findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.update({ inactive: true });
    res.json({ message: 'Task deleted successfully', taskId: task.id });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post(`/:id(${uuidPattern})/restore`, async (req, res) => {
  try {
    const task = await Task.scope('onlyInactive').findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Inactive task not found' });

    await task.update({ inactive: false });
    res.json({ message: 'Task restored successfully', task });
  } catch (err) {
    console.error('Error restoring task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete(`/:id(${uuidPattern})/permanent`, async (req, res) => {
  try {
    const task = await Task.scope('onlyInactive').findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Inactive task not found' });

    await task.destroy();
    res.json({ message: 'Task permanently deleted', taskId: req.params.id });
  } catch (err) {
    console.error('Error permanently deleting task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
