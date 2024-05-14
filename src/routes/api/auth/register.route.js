const express = require("express");
const { authController } = require("../../../controllers");
const router = express.Router();

router.post("/register", authController.addUser);

module.exports = router;    
