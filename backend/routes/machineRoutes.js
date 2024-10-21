const express = require('express');
const router = express.Router();
const Machine = require('../models/Machine');

// Fetch machine data by machine ID and duration (week_count)
router.get('/:machineId', async (req, res) => {
    const { machineId } = req.params;
    const { duration } = req.query;

    const weekCounts = {
        "1_week": 1,
        "2_weeks": 2,
        "1_month": 4,  // Assuming 1 month = 4 weeks
        "3_months": 12,  // Assuming 3 months = 12 weeks
        "1_year": 52  // Assuming 1 year = 52 weeks
    };

    const weekCountLimit = weekCounts[duration] || 1;

    try {
        const machines = await Machine.find({
            machine_id: machineId,
            week_count: { $lte: weekCountLimit }
        }).sort({ week_count: -1 });

        res.json(machines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch machine linechart data
router.get('/:machineId/linechart', async (req, res) => {
    const { machineId } = req.params;
    const { duration } = req.query;

    const weekCounts = {
        "1_week": 1,
        "2_weeks": 2,
        "1_month": 4,
        "3_months": 12,
        "1_year": 52
    };

    const weekCountLimit = weekCounts[duration] || 1;

    try {
        const machines = await Machine.find({
            machine_id: machineId,
            week_count: { $lte: weekCountLimit }
        }).sort({ week_count: -1 });

        // Assuming you want to aggregate slots for line chart data
        const total_slots = machines.map(machine => machine.total_slots_count);
        const success_slots = machines.map(machine => machine.success_slot_count);
        const failed_slots = machines.map(machine => machine.failed_slot_count);

        res.json({ total_slots, success_slots, failed_slots });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Fetch all machines for the dropdown


router.get('/dropdown', async (req, res) => {
    try {
        const machines = await Machine.find({}, { machine_id: 1, machine_name: 1 }); // Fetch only machine_id and machine_name
        res.json(machines);  // Send back the list of machines
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
