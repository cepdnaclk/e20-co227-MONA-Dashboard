const mongoose = require('mongoose');
const partInfoSchema = new mongoose.Schema({
    ProductNumber: {
        type: String,
        required: true
    },
    PartNumber: {
        type: String,
        required: true
    },
    MachineNumber: {
        type: String,
        required: true
    },

    
});
const partInfo = mongoose.model('partinfo', partInfoSchema);
module.exports = partInfo;


