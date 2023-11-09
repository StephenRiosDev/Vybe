const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const AWS = require("aws-sdk");
const { Op } = require("sequelize");

// Assigning users to the variable User
const User = db.users;

// Register a new user
const register = async (req, res) => {

  try {

    const { username, firstName, lastName, email, password } = req.body;

    //search the database to see if user exist
    const usernamecheck = await User.findOne({
      where: {
        user_name: username,
      },
    });
    
    //if username exist in the database respond with a status of 409
    if (usernamecheck) {
      return res.status(409).json({error: "Username already exists"});
    }

    //checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.status(409).json({error: "Email already in use"});
    }

    // Create the user data
    const data = {
      user_name: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: await bcrypt.hash(password, 10),
      date_created: new Date(),
      date_modified: new Date()
    };
    
    //save the user
    const user = await User.create(data);

    //if user details is captured
    if (user) {
      
      // Create token and cookie
      createTokenAndCookie( user, res );

      //send users details
      return res.status(201).send(user);

    } else {

      // Return that the login was not successful
      return res.status(409).send("User could not be created");
    }
  } catch (error) {
    res.status(500).send("An unexpected error occurred");
  };
};


// Authenticate a user
const login = async (req, res) => {
  try {

    // Get login details
    const { username, password } = req.body;
    
    //find a user by their email or username
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: { [Op.iLike]: `%${username}%`} }, 
          { user_name:  { [Op.iLike]: `%${username}%`} }
        ]
      }
    });

    //if user is found
    if (user) {

      //  Compare password with bcrypt
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      if (isSame) {
        
        // Create token and cookie
        createTokenAndCookie( user, res );

        //send user data
        return res.status(201).send({
          username: user.user_name,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          avatar_url: user.avatar_url
        });

      } else {
        return res.status(401).send("Login Details Incorrect");
      }
    } else {
      return res.status(401).send("Login Details Incorrect");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An unexpected error occured");
  }
};

// Log a user out
const logout = (req, res) => {

  // Remove the users HTTP-Only cookie to invalidate their session
  res.setHeader('Set-Cookie', 'token=; HttpOnly; Secure; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');

  // Send a success message
  res.status(200).send('User logged out successfully')
}

const createTokenAndCookie = (user, res) => {

  // Set the user token
  const token = jwt.sign( user.toJSON(), process.env.PASSKEY, { expiresIn: 1 * 24 * 60 * 60 * 1000 } );

  // Set the session cookie
  res.cookie("token", token, {HttpOnly: true, MaxAge: 1 * 24 * 60 * 60 * 1000, SameSite: "strict", Path: "/"});
}

module.exports = {
  register, 
  login,
  logout
};