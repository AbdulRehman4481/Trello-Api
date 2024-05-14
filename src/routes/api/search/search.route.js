const express = require("express");
const router = express.Router();
const Tasks = require("../../../models/taskModal");
const authenticateUser = require("../../../middleware/middleware");

const getTasks = async (req, res, next) => {
  try {
    const key = req.params.key;
    const userId = req.user.id;
    const taskData = await Tasks.find({
      userId: userId,
      "$or": [{
        "title": { $regex: key, $options: "i" }
      }]
    });

    res.json(taskData);
  } catch (error) {
    console.error("error : ", error);
    res.status(500).json({ error: "something went wrong!" });
  }
};

router.get("/search/:key",authenticateUser, getTasks);

module.exports = router;
