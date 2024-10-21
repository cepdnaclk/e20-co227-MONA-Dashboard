const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get product data by productID and date range
router.get('/product/:id', async (req, res) => {
    const productID = req.params.id;
    // Add filtering logic if necessary for date range
    try {
        const product = await Product.findOne({ productID });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
