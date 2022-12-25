var express = require('express');
var server = express();
var routes = require('./routes/router');
var mongoose = require('mongoose');
const cors = require('cors');
mongoose.set('strictQuery', false);

server.use(cors());
server.use(express.json());
server.use(routes);



server.listen(8000, async() => {
    console.log(`Server is running on port 8000`)
    await mongoose.connect('mongodb://127.0.0.1:27017/angulr', function(err) {
        if (err) throw err;
        console.log('connected');
    })
})