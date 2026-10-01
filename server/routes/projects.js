const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Project = require('../models/Project');

// GET all projects
router.get('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.json([]);
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET featured projects
router.get('/featured', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.json([]);
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create project
router.post('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: 'The database is not configured yet.' });
  const project = new Project(req.body);
  try {
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: 'The database is not configured yet.' });
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
