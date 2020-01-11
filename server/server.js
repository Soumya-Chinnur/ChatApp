/**********************************************************************************
* @description :Chat application
* @overview : chat application where the API are created
* @author : Soumya Chinnur
*************************************************************************************/
const express = require('express')//allows to setup middlewares
const bodyParser = require('body-parser');//body parsing middleware
const app = express();//creating an express app
const routes = require('./router/router')
//it is a middleware that validates the body of a request and returns a response with error if the validation rules fail
const expressValidator = require('express-validator')
const dbconfig = require('./configuration/dbconfig')
const mongoose = require('mongoose');
var cors = require('cors')
var userControl = require('./controller/userController')


require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))//urlencoded is used to translate unprintable characters
app.use(expressValidator())
app.use(cors())
app.use('/', routes);//router is attached to an instance of the express class.

console.log(dbconfig.url);

mongoose.connect(dbconfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    //.then() is used to return a promise
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch(() => {
        console.log('Could not connect to the database');
        process.exit();
    })
//loads environment variables from dotenv files
// app.listen(process.env.PORT, () => {
//     console.log("Server is listening on port 3000")
// });
var server = app.listen(process.env.PORT, () => {
    console.log("Server is listing on port 3000")
});
const io = require('socket.io').listen(server);
io.on('connection', (socket) => {
    console.log("user connected")
    socket.on('newMsg', data => {
        console.log("data in sockets", data);

        console.log("chat data", userController.sendMessage(data))
        io.sockets.emit('Message', data)
    })
})
var server = app.listen(3000, () => {
    console.log("Server is listing on port 3001");
    });
    const io = require('socket.io').listen(server);
    io.on('connection', (socket) => {
    console.log('user connected now...')
    socket.on('newMsg', data => {
    console.log('data of socket', data);
    controller.sendMessage(data);
    
    })
module.exports = {app}
