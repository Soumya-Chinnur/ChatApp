const model = require('../model/userModel')
/**
* @desc Gets the input from front end pass to model
* @param req request contains all the requested data
* @param callback sends the data back or err
* @return responses with a http response
*/
//export register
exports.register = (request, callback) => {
    try {
        model.Register(request, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })

    } catch (e) {
        console.log(e)
    }
}

/**
* @desc Gets the input from front end pass to model
* @param req request contains all the requested data
* @param callback sends the data back or err
* @return responses with a http response
*/
//export login
exports.login = (request, callback) => {
    try {
        model.Login(request, (err, data) => {
            if (err) {
                callback(err);
            } else
                callback(null, data);
        })
    } catch (e) {
        console.log(e);
    }
}

/**
* @desc Gets the input from front end pass to model
* @param req request contains all the requested data
* @param callback sends the data back or err
* @return responses with a http response
*/
//exports forgot password
exports.forgotpassword = (request, callback) => {
    try {
        model.forgotPassword(request, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    } catch (e) {
        console.log(e)
    }
}