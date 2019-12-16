/**
* @desc Gets the input from front end pass to model
* @param req request contains all the requested data
* @param callback sends the data back or err
* @return responses with a http response
*/
//exports register for the user
const userServices = require('../services/userServices')

const tokenGenerate = require('../middlewear/token')
const nodeMail = require('../middlewear/nodeMailer')

exports.register = (request, res) => {
    try {
        //request for the details
        request.checkBody('firstName', 'firstname is invalid').notEmpty().isAlpha();
        request.checkBody('lastName', 'lastName is invalid').notEmpty().isAlpha();
        request.checkBody('email', 'email is invalid').notEmpty().isEmail();
        request.checkBody('password', 'password is invalid').notEmpty().len(7, 13)

        var error = request.validationErrors()//for the validation of errors
        var response = {}
        if (error) {
            response.error = error                                                                                                                
            response.success = false
            console.log('error-register', error)
            console.log('response', response)
        }
        else {
            //register checks the request in the user services
            userServices.register(request, (err, data) => {

                if (err) {
                    response.success = false
                    response.err = err
                    res.status(500).send(response)
                } else {
                    response.success = true
                    response.data = data
                    res.status(200).send(response)
                }
            })
        }

    } catch (e) {
        console.log(e)
    }
}
/**
* @desc Gets the input from front end filters and performs validation
* @param req request contains all the requested data
* @param response sends the data or err
* @return responses with a http response
*/
//exports login
exports.login = (request, res) => {
    try {
        console.log("Loging on");
        //requests for the email and password
        request.checkBody('email', 'email is invaild').notEmpty().isEmail();
        request.checkBody('password', 'Password is inavlid').notEmpty().len(8, 13);
        var error = request.validationErrors();
        var response = {};
        if (error) {
            response.error = error;
            response.failure = false;
            console.log("Error in login", error)
        }
        else {
            userServices.login(request, (err, data) => {
                if (err) {
                    response.failure = false;
                    response.data = err;
                    res.status(200).send(response);
                }

            })
        }
    } catch (e) {
        console.log(e);
    }
}
/**
* @desc Gets the input from front end filters and performs validation
* @param req request contains all the requested data
* @param response sends the data or err
* @return responses with a http response
*/
//exports forgotpassword
exports.forgotpassword = (request, res) => {
    try {
        console.log('Forgot password')
        //request for the email,password and new password
        request.checkBody('email', 'email is invalid').notEmpty().isEmail()
        var error = request.validationErrors()
        var response = {}
        if (error) {
            response.error = error
            response.failure = false
            res.status(422).send(response);
        } else {
            userServices.forgotpassword(request, (err, data) => {
                if (err) {
                    response.failure = false
                    response.data = err
                    res.status(402).send(response)
                } else {
                    console.log('data')
                    let payLoad = data._id;
                    let obj = tokenGenerate.GenerateToken(payLoad);
                    console.log("controller pay load", obj);
                    let url = `http://localhost:3000/resetPassword/${obj.token}`

                    console.log("controller pay load", url);
                    console.log("email", request.body.email)
                    nodeMail.sendMailer(url, request.body.email)
                    response.sucess = true;
                    response.data = data;
                    res.status(200).send(response);
                }
            })
        }


    } catch (e) {
        console.log(e)
    }
}
/**
* @desc Gets the input from front end filters and performs validation
* @param req request contains all the requested data
* @param response sends the data or err
* @return responses with a http response
*/
//exports reset password
exports.resetPassword = (request, res) => {
    try {
        //request for the password and confirm password
        console.log("Re-setting password");
        request.checkBody('password', 'password is invalid').notEmpty().len(7, 13);
        request.checkBody('confirmPassword', 'password is invalid').notEmpty().len(7, 13);
        var error = request.validationErrors();
        if (request.body.password != request.body.confirmPassword)
            var error = "confirmpassword is incorrect";
        var response = {};
        if (error) {
            response.error = error;
            response.failure = false;
            return res.status(422).send(response);
        } else{
            userServices.resetPassword(request, (err, data) => {
                if (err) {
                    res.status(404).send(response);
                } else {
                    res.status(200).send(data);
                }
            })
    }
}
 catch (e) {
    console.log(e);
}
}