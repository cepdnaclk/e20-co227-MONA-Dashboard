import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js'; // ensure this path is correct

dotenv.config();
const app = express(); // initialize app
app.use(cors()); // adding newword to application
app.use(express.json({ limit: '50mb' })); // limit

app.get('/', (req, res) => {
    res.send({ message: 'hello world' });
})

const startServer = async () => {
    try {
        // connect to the database
        await connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('server started on port http://localhost:8080'));
    } catch (error) {
        console.log('Failed to start the server:', error);
    }
}

startServer();
