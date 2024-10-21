// backend/models/Part.js
const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    partID: {
        type: String,
        required: true
    },
    partName: {
        type: String,
        required: true
    },
    targetPartCount: {
        type: Number,
        required: true
    },
    completedPartCount: {
        type: Number,
        required: true
    },
    partsToBeMade: {
        type: Number,
        required: true
    },
    completedPartsPercentage: {
        type: String, 
        required: true
    },
    productMadeByPart: {
        type: String, 
        required: true
    },
    material: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Part', partSchema);
