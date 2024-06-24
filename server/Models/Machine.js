const mongoose = require("mongoose");

// Define a schema for your collection
const machineSchema = new mongoose.Schema({
    Machinenumber: Number,
    MachineName: String,
    Material: String,
    Status: Number,
    StartedTime: TimeRanges,
    LastUpdatedTime: TimeRanges,
    SuccessSlots: Number,
    FailureSlots: Number,
    TotalSlots: Number,
    Rate: Number,
});
 
// Create a model using the schema
const Machine = mongoose.model("machines", machineSchema);

// Export the Mold model
module.exports = Machine;