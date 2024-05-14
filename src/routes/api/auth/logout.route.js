const express = require("express");
const router = express.Router();
const { authController } = require("../../../controllers");

router.post("/logout", authController.logoutUser);

module.exports = router;
