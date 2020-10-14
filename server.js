// Import dependancies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');


// initilise Express

const app = express();

// BodyParser Middleware

app.use(bodyParser.json());

// MongoDB from MongoDB Atlas

const db = require('./config/keys').mongoURI;

// Connect to MongoDB

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


// routes

app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
