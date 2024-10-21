const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    machine_id: { type: String, required: true },
    machine_name: { type: String, required: true },
    target_slots_count: { type: Number, required: true },
    total_slots_count: { type: Number, required: true },
    success_slot_count: { type: Number, required: true },
    failed_slot_count: { type: Number, required: true },
    completed_slot_count: { type: Number, required: true },
    success_percentage: { type: Number, required: true },
    completed_percentage: { type: Number, required: true },
    relevant_parts: { type: [Number], required: true },
    relevant_product: { type: String, required: true },
    material: { type: String, required: true },
    working_hours: { type: Number, required: true },
    production_rate: { type: Number, required: true },
    week_count: { type: Number, required: true }
});

module.exports = mongoose.model('Machine', machineSchema);
