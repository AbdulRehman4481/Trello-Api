const express = require("express");
const router = express.Router();
const authenticateUser = require("../../../middleware/middleware");
const { categoryController } = require("../../../controllers");

router.post("/categories", authenticateUser, categoryController.addCategory);
router.get("/categories", authenticateUser, categoryController.getCategories);
router.delete("/categories/:id", authenticateUser, categoryController.deleteCategory);
router.put("/categories/:id", authenticateUser, categoryController.updateCategory);

module.exports = router;
