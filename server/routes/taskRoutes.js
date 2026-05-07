import express from "express";

import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";


const router = express.Router();


// CREATE TASK
router.post(
  "/",
  protect,
  createTask
);


// GET TASKS
router.get(
  "/",
  protect,
  getTasks
);


// UPDATE STATUS
router.put(
  "/:id",
  protect,
  updateTaskStatus
);


// DELETE TASK
router.delete(
  "/:id",
  protect,
  deleteTask
);


export default router;