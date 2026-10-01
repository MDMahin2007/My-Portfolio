const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// GET all testimonials
router.get('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.json([]);
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create testimonial
router.post('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: 'The database is not configured yet.' });
  const testimonial = new Testimonial(req.body);
  try {
    const saved = await testimonial.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
