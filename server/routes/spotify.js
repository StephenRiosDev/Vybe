const express = require('express')
const spotifyController = require('../controllers/spotify_app')
const { search, getGenres, authorize } = spotifyController

const router = express.Router()

// Search endpoint
router.post('/search', search)

// Genres endpoint
router.post('/getGenres', getGenres)

// Authorization endpoint
router.post('/authorize', authorize )

module.exports = router