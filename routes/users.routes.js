const express = require("express");
const { UserModel } = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  const registeredUser = await UserModel.findOne({ email });
  if (registeredUser) {
    res.status(200).json({ msg: "User already exist, please login" });
  } else {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.status(402).json({ msg: err.message });
      } else {
        const user = new UserModel({
          name,
          email,
          gender,
          password: hash,
          age,
          city,
          is_married,
        });
        await user.save();
        res.status(201).json({ msg: "user is registered", user: req.body });
      }
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        // result == true
        if (result) {
          let token = jwt.sign(
            {
              userId: user._id,
              user: user.name,
            },
            "arun",
            { expiresIn: "7d" }
          );
          res.status(200).json({ msg: "logged in", token });
        } else {
          res.status(502).json({ msg: "invalid credentials" });
        }
      });
    } else {
      res.status(404).json({ msg: "user does not exists" });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

module.exports = {
  userRouter,
};
