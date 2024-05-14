const Categories= require("../models/categoryModal")
const mongoose = require("mongoose");

const addCategory = async (req, res, next) => {
  try {
    const categoryData = new Categories({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      userId: req.user.id,  
    });
    const result = await categoryData.save();
    res.json(result);
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
};


const getCategories = async (req, res, next) => {
  try {
    const categoryData = await Categories.find({ userId: req.user.id });
    res.json(categoryData);
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const categoryTask = await Categories.findOneAndDelete({ _id: categoryId, userId: req.user.id });

    if (!categoryTask) {
      return res.status(404).json({ message: "Category not found!" });
    }

    return res.json({ message: "Category deleted successfully!" });
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const dataToUpdate = {
      name: req.body.name,
    };
    const updateData = await Categories.findOneAndUpdate(
      { _id: categoryId, userId: req.user.id },
      dataToUpdate,
      { new: true }
    );

    if (!updateData) {
      return res.status(404).json({ message: "Category not found!" });
    }
    return res.json({ message: "Category updated successfully!" });
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
};

module.exports = {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
