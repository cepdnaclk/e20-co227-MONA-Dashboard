const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const machineInfo = require('./models/machineInfo');


const app = express();
app.use(cors());
app.use(express.json());

// port number can be any number
const port = process.env.PORT || 8000;

// url
const DB_URI = "mongodb+srv://bhagya:bhagya123@monadash.v8cvc3k.mongodb.net/?retryWrites=true&w=majority/my_test";


mongoose.connect(DB_URI)
        .then(() => {
        console.log('Connected to MongoDB');
        })
        .catch((err) => {
        console.error(err);
        });

app.get('/status', async (req, res) => {
        machineInfo.find()
        .then(users => res.json(users))
        .catch(err => res.json('Error: ' + err))
})


app.listen(port, () => {
  console.log(`Serverd listening on port ${port}`);
});


/*
const express = require('express');

const MongoClient = require('mongodb').MongoClient; // MongoDB driver

const app = express();
const port = process.env.PORT || 8000; // Use environment variable for port or default to 3000

// Replace these with your actual connection details
const uri = "mongodb+srv://bhagya:bhagya123@monadash.v8cvc3k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {}); //// Remove useNewUrlParser and useUnifiedTopology

app.get('/api/machines', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("my_test");
    const collection = database.collection("machines_1");

    // Project only MachineNumber and Status fields
    const projection = { _id: 0, MachineNumber: 1, Status: 1 };
    const machines = await collection.find({}, { projection }).toArray();

    res.json(machines); // Send the data as JSON

  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching machines data"); //  Handle errors appropriately

  } finally {
    await client.close(); // Close the connection after each request
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
*/