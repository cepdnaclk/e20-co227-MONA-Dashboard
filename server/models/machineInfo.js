const mongoose = require('mongoose');
const machineInfoSchema = new mongoose.Schema({
    MachineNumber: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    }
});
const machineInfo = mongoose.model('machines_1', machineInfoSchema);
module.exports = machineInfo;