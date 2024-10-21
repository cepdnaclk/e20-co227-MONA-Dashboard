// backend/models/Machine.js
const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    MachineID: {
        type: String,
        required: true
    },
    MachienName: {
        type: String,
        required: true
    },
    Material: {
        type: String,
        required: true
    },
    ProductionRate:{
        type: String,
        required: true
    },
    
    TotalShots: {
        type: Number,
        required: true
    },
    SuccessShots: {
        type: Number,
        required: true
    },
    TargetShots: {
        type: Number,
        required: true
    },
    FailedShots: {
        type: Number,
        required: true
    },
    SuccesivePercentage: {
        type: String,
        required: true
    },
    CompletedPercentage:{
        type: String,
        required: true
    },
    Material:{
        type: String,
        required: true
    },
    WorkingHours:{
        type: String,
        required: true
    },
    RelevantPart:{
        type: String,
        required: true
    
    }
});

module.exports = mongoose.model('Machine', machineSchema);


