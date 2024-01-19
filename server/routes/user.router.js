const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { userModel } = require("../models/userModel");

const userController = Router();

//SignUp
// SignUp
userController.post("/signup", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const emailExists = await userModel.findOne({ email });

    if (emailExists) {
      return res.status(400).json({ Message: "User Already Exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new userModel({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({ Message: "SignUp Successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Message: "Signup failure" });
  }
});

//Login
userController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user == null) return res.json("email not found");
    const hash = user.password;
    const correct_password = bcrypt.compareSync(password, hash);
    if (correct_password) {
      let token = jwt.sign({ userId: user._id }, process.env.TOKEN, {
        expiresIn: "1h",
      });
      res.status(200).json({ Message: "Login Successfull", token });
    } else {
      res.json({ Message: "Wrong Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.send("Login Route Error");
  }
});

module.exports = { userController };
