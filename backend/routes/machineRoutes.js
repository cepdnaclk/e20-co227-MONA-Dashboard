const express = require('express');
const Machine = require('../models/Machine'); // Adjust the path as necessary
const router = express.Router();

// GET all machines for dropdown
router.get('/dropdown', async (req, res) => {
    try {
        const machines = await Machine.find({}, { machine_id: 1, machine_name: 1 });
        res.json(machines);
    } catch (error) {
        console.error("Error fetching machines:", error);
        res.status(500).json({ error: "An error occurred while fetching machines." });
    }
});

// GET machine data by machine_id and duration
router.get('/:machineId', async (req, res) => {
    const { machineId } = req.params;
    const { duration } = req.query; // Assuming you will filter by duration later

    try {
        const machineData = await Machine.find({ machine_id: machineId, week_count: { $gte: getWeekCountFromDuration(duration) } });
        res.json(machineData);
    } catch (error) {
        console.error("Error fetching machine data:", error);
        res.status(500).json({ error: "An error occurred while fetching machine data." });
    }
});

// GET line chart data for machine by machine_id and duration
router.get('/:machineId/linechart', async (req, res) => {
    const { machineId } = req.params;
    const { duration } = req.query; // Assuming you will filter by duration later

    try {
        const lineChartData = await Machine.find({ machine_id: machineId, week_count: { $gte: getWeekCountFromDuration(duration) } });
        // Transform lineChartData to match the expected format for your line chart
        res.json(transformLineChartData(lineChartData));
    } catch (error) {
        console.error("Error fetching machine line chart data:", error);
        res.status(500).json({ error: "An error occurred while fetching machine line chart data." });
    }
});

// Helper function to convert duration to week count
function getWeekCountFromDuration(duration) {
    switch (duration) {
        case '1_week': return 1;
        case '2_weeks': return 2;
        case '1_month': return 4; // Approximation
        case '3_months': return 12; // Approximation
        case '1_year': return 52; // Approximation
        default: return 1;
    }
}

// Helper function to transform data for line chart
function transformLineChartData(data) {
    const total_slots = [];
    const success_slots = [];
    const failed_slots = [];

    data.forEach(item => {
        total_slots.push(item.total_slots_count);
        success_slots.push(item.success_slot_count);
        failed_slots.push(item.failed_slot_count);
    });

    return {
        total_slots,
        success_slots,
        failed_slots,
    };
}

module.exports = router;
