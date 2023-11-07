const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const AWS = require("aws-sdk");
const { Op } = require("sequelize");

// UserSessions cache
const UserSessions = require('../cache/userSessions');

// Assigning users to the variable User
const User = db.users;

// Register a new user
const register = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    const data = {
      user_name: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: await bcrypt.hash(password, 10),
      date_created: new Date(),
      date_modified: new Date()
    };
    
    //saving the user
    const user = await User.create(data);

    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.PASSKEY, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

      //send users details
      return res.status(201).send(user);
    } else {

      // Return that the login was not successful
      return res.status(409).send("User could not be created");
    }
  } catch (error) {
    res.status(500).send("An unexpected error occurred");
  }
};


// Authenticate a user
const login = async (req, res) => {
  try {

    // Get login details
    const { username, password } = req.body;
    
    console.log(username, password);

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
        
        //generate token with the user's id and the secretKey in the env file
        let token = jwt.sign({ id: user.id }, process.env.PASSKEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        //if password matches with the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

        // Add the user session for this user now that they are logged in
        UserSessions.setSession( user, token );

        //send user data
        return res.status(201).send({
          user_name: user.user_name,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          id: user.id,
          token: token
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

  // Remove the user session for this user
  const success = UserSessions.unsetSession( req.body.sessionId );

  // Send a success message
  if (success ) res.status(200).send('User logged out successfully')
  else res.status(409).send('User not logged out successfully')
}

module.exports = {
  register,
  login,
  logout
};