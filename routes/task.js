const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

router.post("/daily/create", async (req, res) => {
  try {
    const { name, description, user, day } = req.body;
    const newTask = new Task({
      name: name,
      description: description,
      user: user,
      day: day,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/daily/all", async (req, res) => {
  try {
    const findTask = await Task.findById(req.query.id);
    if (req.query.id) {
      res.json(findTask);
    } else {
      res.json({ message: "bad request" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/daily/update", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
    });
    if (req.body.id && req.body.name) {
      res.json({ message: "task updated" });
    } else {
      res.json({ message: "missing id" });
    }
    await updatedTask.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/daily/delete", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.body.id);
    if (req.body.id) {
      res.json({ message: "task successfully deleted" });
    } else {
      res.json({ message: "missing id" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
