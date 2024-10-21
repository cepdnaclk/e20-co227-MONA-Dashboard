const express = require('express');
const router = express.Router();
const Part = require('../models/Part');

// Get parts by product ID, part ID, and optional date range
router.get('/', async (req, res) => {
    try {
        const { productId, partId, startDate, endDate } = req.query;

        // Create query filters
        const query = {};
        if (productId) query.productMadeByPart = productId;
        if (partId) query.partID = partId;

        // Optionally filter by date range if startDate and endDate are provided
        if (startDate && endDate) {
            query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const parts = await Part.find(query);
        res.json(parts);
    } catch (err) {
        res.status(500).json({ message: err.message });
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


module.exports = router;
