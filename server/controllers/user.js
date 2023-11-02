const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

// UserSessions cache
const UserSessions = require('../cache/userSessions');

// Assigning users to the variable User
const User = db.users;

// Register a new user
const signup = async (req, res) => {
  try {
    const { user_name, first_name, last_name, email, password } = req.body;
    const data = {
      user_name,
      first_name,
      last_name,
      email,
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
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);

      //send users details
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};


// Authenticate a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.PASSKEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);

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
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
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
  signup,
  login,
  logout
};