// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    targetProductCount: {
        type: Number,
        required: true
    },
    completedProductCount: {
        type: Number,
        required: true
    },
    productsToBeMade: {
        type: Number,
        required: true
    },
    completedproductPercentage: {
        type: String, 
        required: true
    },
    
});

module.exports = mongoose.model('Product', productSchema);
