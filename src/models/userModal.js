const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.ObjectId,
    name: String,
    email: String,
    password: String
  },
  
  { collection: "user", versionKey: false }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
