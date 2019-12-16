const mongoose = require("mongoose");
const bcrypt = require('bcrypt');//bcrypt is used for password hashing
const Schema = mongoose.Schema;//schema represents how the data is being organised
const emailExistence = require('email-existence')//checks existence of email address

const userData = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        //returns specific event created at and modified at
        timestamps: true
    })
let register = mongoose.model("users", userData)
/**
* @desc Gets the input from front end and stores data in database
* @param req request contains all the requested data
* @param callback a callback function
* @return return a callback function err or data
*/
//exports register
exports.Register = (request, callback) => {
//findone returns the criteria in document when it matches
    emailExistence.check(request.body.email, (err, result) => {
        if (result) {

            register.findOne({ "email": request.body.email }, (err, data) => {
                if (data) callback("Existing");
                else {
                    bcrypt.hash(request.body.password, 10, (err, encrypted) => {
                        var userDetails = new register({
                            "firstName": request.body.firstName,
                            "lastName": request.body.lastName,
                            "email": request.body.email,
                            "password": encrypted
                        })
                        userDetails.save((err, data) => {
                            if (err) {
                                callback(err);
                            } else callback(null, data);
                        })
                    })

                }
                console.log("model end")
            })
        }
        else {
            callback("email is invalid ")
        }
    })

}
/**
* @desc Gets the input from front end and stores data in database
* @param req request contains all the requested data
* @param callback a callback function
* @return return a call back function err and data
*/
//exports login
exports.Login = (request, callback) => {
    register.findOne({
        "email": request.body.email
    }, (err, data) => {
        if (data) {
            bcrypt.compare(request.body.password, data.password, (err, sucess) => {
                if (sucess)
                    callback(null, data);
                else
                    callback("Wrong Password");
            })
        }
        else callback("email doesnot match or exist");
    })

}
/**
* @desc Gets the input from front end and stores data in database
* @param req request contains all the requested data
* @param callback a callback function
* @return return a call back function err or data
*/
//exports forgot password
exports.forgotPassword = (request, callback) => {
    register.findOne({
        "email": request.body.email
    }, (err, data) => {
        if (data) {
            callback(null, data)
        }
        else {
            callback("invalid user email ");
        }
    })
}

/***
* @desc Gets the input from front end and stores data in deatabase
* @param req request contains all the requested data
* @param callback a callback function
* @return return a call back function err or data
***/
//exports reset password
exports.ResetPassword = (request, callback) => {
    console.log("reqqqqq", request.decoded);
    bcrypt.hash(request.body.password, 10, (err, encrypted) => {
        register.updateOne(
            { "_id": request.decoded.payload }, {
            "password": encrypted
        }
            , (err, data) => {
                if (data)
                    callback(null, data);
                else
                    callback("error");


            })
    })

}