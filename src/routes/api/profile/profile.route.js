const express = require('express');
const router = express.Router();
const User = require("../../../models/userModal");
const jwt = require("jsonwebtoken");

const userProfile = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);    
    const user = await User.findOne({email:decoded.email}); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { name, email } = req.body; 
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();
    const updatedUser = await User.findOne({ email: user.email });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};



router.get("/profile", userProfile);  
router.put("/profile", updateProfile);  

module.exports = router;
