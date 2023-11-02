const axios = require('axios');
const UserSessions = require('../cache/userSessions');

const cache = {};

// Search spotify using plain text query
const search = async (req, res) => {

  //  Get the user's search query
  const query = req.body.query;

  // Return 400 status if there is no search query
  if (!query) res.status(400).send("A search term is required");

  // Make sure we are authorized
  await authorize();

  console.log("Spotify Token:", cache.spotifyToken);

  // Construct the request URL
  const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;

  // Attempt to get search information from Spotify Web API
  axios
    .get(apiUrl, { headers: { Authorization: `Bearer ${cache.spotifyToken.token}` } })
    .then( res => res.data)
    .then( data => res.status(200).json(data))
    .catch( err => res.status(500).send(err))
};

const authorize = async () => {

  return new Promise((resolve, reject) => {

    // If we are already authorized, resolve immediately
    if ( isAuthorized() ) resolve();

    // Credientials
    const clientId = process.env.SPOTIFY_CLIENTID;
    const clientSecret = process.env.SPOTIFY_SECRET;
  
    // Base64-encode the credentials
    const base64AuthString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
    // Make a POST request to obtain an access token
    axios.post('https://accounts.spotify.com/api/token', null, {
      params: { grant_type: 'client_credentials' },
      headers: {
        Authorization: `Basic ${base64AuthString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {

        // Cache the token so we only have to request one if we don't already have one
        cache.spotifyToken = {
          expires: ( new Date().getTime() ) + response.data.expires_in * 1000,
          token: response.data.access_token
        }

        // Resolve the promise
        resolve();
      })
      .catch( err => reject(err))
  })
}

const isAuthorized = () => {
  
    // If we don't have a token, we are not authorized
    if ( !cache.spotifyToken?.token ) return false;
  
    // If the token is expired, we are not authorized
    if ( cache.spotifyToken.token.expires < new Date().getTime() ) return false;
  
    // Otherwise, we are authorized
    return true;
}

module.exports = {
  search,
  authorize
};