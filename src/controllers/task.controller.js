const Tasks = require("../models/taskModal");
const mongoose = require("mongoose");
const addTask = async (req, res, next) => {
  try {
    const taskData = new Tasks({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      userId: req.user.id,
    });
    const result = await taskData.save();
    res.json(result);
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
};

const getTasks = async (req, res, next) => {
  try {
    const taskData = await Tasks.find({ userId: req.user.id });
    res.json(taskData);
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const taskData = await Tasks.findOne({ _id: taskId, userId: req.user.id });

    if (!taskData) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.json(taskData);
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Tasks.findOneAndDelete({
      _id: taskId,
      userId: req.user.id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    return res.json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const tasksId = req.params.id;
    const dataToUpdate = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
    };
    const updateData = await Tasks.findOneAndUpdate(
      { _id: tasksId, userId: req.user.id },
      dataToUpdate,
      { new: true }
    );

    if (!updateData) {
      return res.status(404).json({ message: "Tasks not found!" });
    }
    return res.json({ message: "Tasks updated successfully!" });
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
};
module.exports = {
  addTask,
  getTasks,
  getTaskById,
  deleteTask,
  updateTask,
};
