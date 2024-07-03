const mongoose = require("mongoose");

const connectToDatabase = () => {
        // url
const DB_URI = "mongodb+srv://bhagya:bhagya123@monadash.v8cvc3k.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(DB_URI)
        .then(() => {
        console.log('Connected to MongoDB');
        })
        .catch((err) => {
        console.error(err);
        });
};

module.exports = connectToDatabase;