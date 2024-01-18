const express = require("express");
const User = require("../models/User.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser.js");

const JWT_SECRETE_KEY = "PRAJAPATIJAYCODINGCOURSE";

// ** creating a user using /api/auth/create-user end point
// ** i.e.sign up that means it doesn't require login

// ** ROUTE# 1: create a user using POST: /api/auth/create-user end point, no Login required

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
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        const saltRounds = 10;
        // console.log(salt);
        const salt = (await bcrypt.genSalt(saltRounds)).toString();
        const hash = (await bcrypt.hash(req.body.password, salt)).toString();
        user = await User.create({
          name: req.body.name.toString(),
          email: req.body.email,
          password: hash,
        });
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

        const data = {
          user: {
            userId: user._id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRETE_KEY);
        res.status(201).json({ authToken });
      } else {
        return res
          .status(400)
          .json({ error: "user with this email already exists" });
        console.log("user with this email already exists");
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




// ** ROUTE# 2: login a user using POST: /api/auth/login end point, to Login



router.post(
  "/login",
  [
    body("email", "please enter valid credentials").escape().isEmail(),
    body("password", "please enter valid credentials").escape().exists(),
  ],
  async (req, res) => {
    //** validate email and password
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      // ** fetching the user-email from the database and checking weather they are present in the db or not
      const validUser = await User.findOne({ email: req.body.email });
      if (!validUser) {
        return res
          .status(400)
          .json({ error: "please enter valid credentials" });
      }
      // ** fetching the user-password from the db and checking using bcrypt.compare method
      // ** validUser.password = hashed password stored in the db
      // ** req.body.password = original password entered by the user
      // ** remember that bcrypt.compare() method will internally match pass and its hash.

      const password = await bcrypt.compare(
        req.body.password,
        validUser.password
      );
      if (!password) {
        return res
          .status(400)
          .json({ error: "please enter valid credentials" });
      }
      const data = {
        user: {
          userId: validUser._id,
        },
      };
      // ** jwt.sign() is sync function , so it doesn't require await as it don't return promise
      const authToken = jwt.sign(data, JWT_SECRETE_KEY);

      res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ** ROUTE 3: getting user details using api/auth/get-user end point , Login required.
// ** getting user details using jwt


router.post("/get-user", fetchUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userDetails = await User.findById(userId).select("-password");
    return res.status(200).json({ userDetails });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
