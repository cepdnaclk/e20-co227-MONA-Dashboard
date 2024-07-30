const mongoose = require('mongoose');
const rateInfoSchema = new mongoose.Schema({
    MachineNumber: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    SuccessSlots: {
        type: String,
        required: true
    },
    FailureSlots: {
        type: String,
        required: true
    },
    LastUpdatedTime: {
        type: Date,
        required: true
    },
    Rate: {
        type: String,
        required: true
    },
    Production: {
        type: String,
        required: true
    }
    
});
const rateInfo = mongoose.model('rateinfo', rateInfoSchema);
module.exports = rateInfo;


