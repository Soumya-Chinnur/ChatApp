/***************************************************************************************
 * @purpose: ChatApp
 * @author: Soumya Chinnur
 * @file: server.js
 ***************************************************************************************/
const express = require('express')//express is framework used to give an application proper structure
const bodyParser = require('body-parser');//body parser used to extract data
const expressValidator = require('express-validator');
 require('dotenv').config()
const app = express();
const routers = require('../server/router/router')
// 
app.use(bodyParser.json());  //extracting data from json      
app.use(bodyParser.urlencoded({ extended: true }))  //url encode transmits special charcter into normal format
app.use(expressValidator());


const dbconfig = require('./configuration/dbConfig')//default port number og mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch(() => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    })

app.use('/', routers);

app.listen(process.env.PORT, () => {
    console.log("Server is listing on port 3000")
});

