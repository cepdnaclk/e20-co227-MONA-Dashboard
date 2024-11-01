const mongoose = require('mongoose');
const machineInfoSchema = new mongoose.Schema({
    MachineNumber: {
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
    Production:{
        type: String,
        required: true
    },
    Part: {
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
    TotalSlots: {
        type: String,
        required: true
    },
    Rate: {
        type: String,
        required: true
    },
    StatusChangedTime:{
        type: Date,
        required: true
    },
    TargetSlots:{
        type: String,
        required: true
    },
    ErrorPercentage:{
        type: String,
        required: true
    },
    Info:{
        type: String,
        required: true
    
    }
    
});
const machineInfo = mongoose.model('realtimeinfo', machineInfoSchema);
module.exports = machineInfo;


