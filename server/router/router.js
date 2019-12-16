const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

//POST method is used to submit an entity to the specified resource
//User register using post http method
router.post('/register', userController.register)
//GET method requests a representation of the specified resource
//User login using get http method
router.post('/login', userController.login)
//Forgot password using POST http methods
router.post('/forgotpassword', userController.forgotpassword)
//Post http method for reset password
router.post('/resetpassword', userController.resetPassword)

module.exports = router;