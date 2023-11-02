const express = require('express')
const userController = require('../controllers/user')
const { signup, login, logout } = userController
const userAuth = require('../middleware/userAuth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)

//login route
router.post('/login', login )

// Logout route
router.post('/logout', logout )

module.exports = router