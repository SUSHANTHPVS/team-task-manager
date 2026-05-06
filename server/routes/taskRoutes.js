const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

const {
  protect,
} = require("../middleware/authMiddleware");


// CREATE TASK
router.post("/", protect, createTask);


// GET TASKS
router.get("/", protect, getTasks);


// UPDATE STATUS
router.put("/:id", protect, updateTaskStatus);


// DELETE TASK
router.delete("/:id", protect, deleteTask);


module.exports = router;