const mongoose = require('mongoose');
const dayInfoSchema = new mongoose.Schema({
    Doc: {
        type: String,
        required: true
    },
    SuccessItems: {
        type: String,
        required: true
    },
    FailureItems: {
        type: String,
        required: true
    },
    TotalItems: {
        type: String,
        required: true
    },
    SuccessRate: {
        type: String,
        required: true
    }
});

const dayInfo = mongoose.model('dayinfo', dayInfoSchema);
module.exports = dayInfo;