const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  name: String,
  description: String,
  user: String,
  day: String,
});

module.exports = Task;
