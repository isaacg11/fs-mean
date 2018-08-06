
const express = require('express');
const path = require('path');
let mongoose = require('mongoose');
let passport = require('passport');
const bodyParser = require("body-parser");
const cors = require('cors')

mongoose.connect('mongodb://isaac:123@ds135540.mlab.com:35540/test-db');

const app = express();
app.use(bodyParser.json())
app.use(passport.initialize());

// !!! DEVELOPMENT ONLY (start) !!! //

// var corsOptions = {
//     origin: 'http://localhost:8080',
//     optionsSuccessStatus: 200 
// }

// app.use(cors(corsOptions))

// !!! DEVELOPMENT ONLY (end) !!! //

require('./models/todo');
require('./models/user');
const todos = require('./routes/todos');
const users = require('./routes/users');
app.use('/todos', todos);
app.use('/users', users);

var distDir = __dirname + "/dist/test-app/";
app.use(express.static(distDir));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + "/dist/test-app/"))
})

app.listen(process.env.PORT || 8080);