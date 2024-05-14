const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  dueDate: { type: String, required: true },
  priority: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Tasks', taskSchema);
