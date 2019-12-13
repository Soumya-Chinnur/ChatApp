const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

//POST method is used to submit an entity to the specified resource
router.post('/register', userController.register)
//GET method requests a representation of the specified resource
router.get('/login', userController.login)
router.post('/forgotpassword',userController.forgotpassword)

module.exports = router;