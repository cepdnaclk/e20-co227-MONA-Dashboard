// backend/routes/parts.js
const express = require('express');
const router = express.Router();
const Part = require('../models/Part');

// Get all parts
router.get('/', async (req, res) => {
    try {
        const parts = await Part.find();
        res.json(parts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new part
router.post('/', async (req, res) => {
    const part = new Part(req.body);
    try {
        const savedPart = await part.save();
        res.status(201).json(savedPart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Additional CRUD operations can be added here (update, delete)

module.exports = router;
