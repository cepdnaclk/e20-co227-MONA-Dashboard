const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const machineInfo = require('../models/machineInfo');
const rateInfo = require('../models/rateinfo');
const partInfo =require('../models/partinfo')

const app = express();
app.use(cors());
app.use(express.json());



// port number can be any number
const port = process.env.PORT || 8000;

const connectToDatabase = require("../DataBaseConnection/dbConfig");
connectToDatabase();

app.get('/machineinfo', async (req, res) => {
        
        machineInfo.find()
        .then(users2 => res.json(users2))
        .catch(err => res.json('Error: ' + err))
})

app.put('/machineinfo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json('Invalid machine ID');
        }

        // Find the machine document by ID
        const machine = await machineInfo.findById(id);

        if (!machine) {
            return res.status(404).json('Machine not found');
        }

        // Update machine properties with data from the request body
        machine.MachineName = req.body.MachineName;
        machine.Production = req.body.Production;
        machine.Part = req.body.Part;
        machine.TargetSlots = req.body.TargetSlots;
        machine.Info = req.body.Info;

        // Save the updated machine document
        await machine.save();

        // Send a success response
        res.json('Machine updated successfully!');
    } catch (err) {
        // Handle errors and send error response
        res.status(400).json('Error: ' + err.message);
    }
});


        

app.get('/rateinfo', async (req, res) => {
        
        rateInfo.find()
        .then(users3 => res.json(users3))
        .catch(err => res.json('Error: ' + err))
});


app.get('/partinfo', async (req, res) => {
        
    partInfo.find()
    .then(users4 => res.json(users4))
    .catch(err => res.json('Error: ' + err))
})



app.listen(port, () => {
  console.log(`Serverd listening on port ${port}`);
});

