const express = require('express')
const userController = require('../controllers/user')
const { register, login, logout } = userController
const userAuth = require('../middleware/userAuth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/register', userAuth.saveUser, register)

//login route
router.post('/login', login )

// Logout route
router.post('/logout', logout )

module.exports = router