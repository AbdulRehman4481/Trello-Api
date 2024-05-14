const express = require("express");
const router = express.Router();
const authenticateUser = require("../../../middleware/middleware");
const { taskController } = require("../../../controllers");

router.post("/task", authenticateUser, taskController.addTask);
router.get("/task/:id", authenticateUser, taskController.getTaskById);
router.get("/task", authenticateUser, taskController.getTasks);
router.delete("/task/:id", authenticateUser, taskController.deleteTask);
router.put("/task/:id", authenticateUser, taskController.updateTask);

module.exports = router;
