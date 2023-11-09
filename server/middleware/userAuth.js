const jwt = require("jsonwebtoken");
const db = require("../models");

//Assigning db.users to User variable
const User = db.users;

// Whitelist for pages that do not require authentication
const whitelist = [
  // User api routes
  /api\/users.+/,

  // Any non-api routes
  /^((?!\/api).)*$/
];

const isWhitelisted = ( url ) => {

  return whitelist.some( (item) => {
    return url.match(item);
  });
}

const authenticateSession = (req, res, next) => {

  console.log(" AND FUCK YOU TO BITCH")

  // If this URL is whitelisted, do not authenticate
  if ( isWhitelisted(req.url) ) {
    next();
    return;
  }

  // Get the token
  const token = req.cookies.token;

  console.log(req.cookies.token);

  // Authenticate the session
  jwt.verify( token, process.env.PASSKEY, (err, decoded) => {

    // If there is an error, return a 401
    if ( err ) return res.status(401).json({error: "Unauthorized"});

    // Attach user data to the request
    req.user = decoded;

    // Continue
    next();
  })
}

//exporting module
module.exports = {
  authenticateSession
};