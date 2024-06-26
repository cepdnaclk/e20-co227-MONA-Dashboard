const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const machineInfo = require('./models/machineInfo');
const dayInfo = require('./models/dayinfo');

const app = express();
app.use(cors());
app.use(express.json());



// port number can be any number
const port = process.env.PORT || 8000;

// url
const DB_URI = "mongodb+srv://bhagya:bhagya123@monadash.v8cvc3k.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(DB_URI)
        .then(() => {
        console.log('Connected to MongoDB');
        })
        .catch((err) => {
        console.error(err);
        });

        app.get('/machineinfo', async (req, res) => {
        
                machineInfo.find()
                .then(users2 => res.json(users2))
                .catch(err => res.json('Error: ' + err))
        })
        
        app.get('/dayinfo', async (req, res) => {
                dayInfo.find()
                        
                .then(users1 => res.json(users1))
                .catch(err => res.json('Error: ' + err))
                })



app.listen(port, () => {
  console.log(`Serverd listening on port ${port}`);
});

