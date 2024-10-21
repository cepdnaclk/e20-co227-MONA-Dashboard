// backend/models/Part.js
const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    name: String,
    count: Number,
});

module.exports = mongoose.model('Part', partSchema);
