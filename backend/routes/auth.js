const express = require("express");
const User = require("../models/User.js");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// ** creating a user i.e. sign up that means it doesn't require authentication or login
router.post(
  "/create-user",
  [
    body("name", "enter valid name").escape().isLength({ min: 3 }),
    body("email", "enter valid email").escape().isEmail(),
    body("password", "password must be at-least 8 character long")
      .escape()
      .isLength({ min: 8 }),
  ],
  async (req, res) => {
    // ** if there are errors then return errors and bad req(i.e. status 400)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // ** creating user, remember that this user will be saved to database automatically
      let user = await User.findOne({email: req.body.email });
      if (user) {
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        })
          // ** if user created successfully then save it to db
          // .then((user) => {
          //   res.json(user);
          // })
          // ** else throw an error
          // .catch((error) => {
          //   console.log(error);
          // });
        //   const user = new User(req.body);
        //   const savedUser = await user.save();
        res.send(user);
      } else {
        return res.status(400).json({error: 'user with this email already exists'});
        console.log('user with this email already exists');
      }
      //   console.log(savedUser);
    } catch (error) {
      console.log(error);
      if (!res.headersSent) {
        res.status(500).send("Internal Server Error");
      }
    }
  }
);

module.exports = router;
