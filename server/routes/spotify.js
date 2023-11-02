const express = require('express')
const spotifyController = require('../controllers/spotify')
const { search, authorize } = spotifyController

const router = express.Router()

// Search endpoint
router.post('/search', search)

// Authorization endpoint
router.post('/authorize', authorize )

module.exports = router