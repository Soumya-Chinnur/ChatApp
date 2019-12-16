/****************************************************************************************
* @description :Chat application
* @overview : chat application where the API are created
* @author : Soumya Chinnur
*************************************************************************************/
const express = require('express')//allows to setup middlewares
const bodyParser = require('body-parser');//body parsing middleware
const app = express();//creating an express app
const routes = require('./router/router.js')
//it is a middleware that validates the body of a request and returns a response with error if the validation rules fail
const expressValidator = require('express-validator')
const dbconfig = require('./configuration/dbConfig')
const mongoose = require('mongoose');

require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))//urlencoded is used to translate unprintable characters
app.use(expressValidator())

app.use('/', routes);//router is attached to an instance of the express class.

// mongoose.Promise = global.Promise;
//connecting to the database
console.log(dbconfig.url);

mongoose.connect(dbconfig.url, {
    //to pass the new parser and connect to the mongoose.connect
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
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port 3000")
});
 
