// Import dependancies
const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const path = require('path');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const items = require('./routes/api/items');


// initilise Express

const app = express();

// BodyParser Middleware  can now just use express

//app.use(bodyParser.json());

app.use(express.json());

// MongoDB from MongoDB Atlas

 
  //  let db = require('./config/keys').mongoURI;

  const db = process.env.MONGO_URI;


// Connect to MongoDB

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


// routes

app.use('/api/items', items);
app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))

// Serve static assets if in production

if (process.env.NODE_ENV === 'production') {

    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));


    });

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
