const mongoose = require('mongoose');


const MachineStatus = require('../models/mstatus');

const express = require('express');
const router = express.Router();

router.get('/mstatus', async (req, res) => {
    try {
        const machines = await MachineStatus.find();
        res.json(machines);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching machines data");
    }
});

module.exports = router;
