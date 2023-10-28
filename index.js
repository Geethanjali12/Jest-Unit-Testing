const express = require('express');
const mongoose = require('mongoose');
const router = require('./router/UserRouter');

const app = express();

async function connectDB() {
 await mongoose.connect('mongodb://localhost:27017/jest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});   
}

connectDB();

app.use(express.json());
app.use('/', router);

app.listen(6000, () => {
    console.log('app is running');
});

module.exports = app;