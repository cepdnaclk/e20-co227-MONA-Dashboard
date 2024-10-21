// backend/routes/machines.js
const express = require('express');
const router = express.Router();
const Machine = require('../models/Machine');

// Get all machines
router.get('/', async (req, res) => {
    try {
        const machines = await Machine.find();
        res.json(machines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new machine
router.post('/', async (req, res) => {
    const machine = new Machine(req.body);
    try {
        const savedMachine = await machine.save();
        res.status(201).json(savedMachine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Additional CRUD operations can be added here (update, delete)

module.exports = router;
