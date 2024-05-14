const User = require("../models/userModal");
const Blacklist = require("../models/blackListModal");
const bcrypt = require("bcrypt");
 const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


const loginUser = async (req, res, next) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid password." });
    }
    var token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    res.status(200).json({ message: "Login successful", user: user,token: token });
  
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
const addUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, 
    });
    const result = await userData.save();
    res.json(result);
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
};

const logoutUser=async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const blacklistedToken = new Blacklist({ token });
    await blacklistedToken.save();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('error : ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  loginUser,
  addUser,
  logoutUser
};
