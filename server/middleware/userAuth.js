const express = require("express");
const db = require("../models");
const UserSessions = require('../cache/userSessions');

//Assigning db.users to User variable
const User = db.users;

// Whitelist for pages that do not require authentication
const whitelist = [
  // User api routes
  /api\/users.+/,

  // Any non-api routes
  /^((?!\/api).)*$/
];

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {

  //search the database to see if user exist
  try {
    const username = await User.findOne({
      where: {
        user_name: req.body.username,
      },
    });
    
    //if username exist in the database respond with a status of 409
    if (username) {
      return res.status(409).json({error: "Username already exists"});
    }

    //checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.status(409).json({error: "Email already in use"});
    }

    next();
  } catch (error) {
    res.status(500).send("An unexpected error occurred");
  }
};

const isWhitelisted = ( url ) => {

  return whitelist.some( (item) => {
    return url.match(item);
  });
}

const authenticateSession = (req, res, next) => {

  // If this URL is whitelisted, do not authenticate
  if ( isWhitelisted(req.url) ) {
    next();
    return;
  }

  // Authenticate the session
  if( UserSessions.isValidSession(req.body.sessionToken) ) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }

  return;
}

//exporting module
module.exports = {
  saveUser,
  authenticateSession
};