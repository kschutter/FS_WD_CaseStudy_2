const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Parse extended requests and json requests
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Configure the db
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connect to the db
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("Connection to database failed, exiting now");
    process.exit();
});

// Simple route
app.get('/', (req, res) => {
    res.json({"message": "This is my easyNotes application"});
});

require('./app/routes/note.routes.js')(app);

// Listening on 3000
app.listen(3000, () => {
    console.log("Server is listening on 3000");
})

