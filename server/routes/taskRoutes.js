import express from "express";

import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
  editTask,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly
from "../middleware/adminMiddleware.js";


const router = express.Router();


// CREATE TASK
router.post(
  "/",
  protect,
  adminOnly,
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
  "/edit/:id",
  protect,
  adminOnly,
  editTask
);
router.put(
  "/:id",
  protect,
  updateTaskStatus
);

// DELETE TASK
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteTask
);


export default router;