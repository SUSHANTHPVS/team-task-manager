import express from "express";

import {
  createProject,
  getProjects,
  addMember,
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";


const router = express.Router();


// CREATE PROJECT
router.post(
  "/",
  protect,
  createProject
);
router.put(
  "/:id/members",
  protect,
  addMember
);

// GET PROJECTS
router.get(
  "/",
  protect,
  getProjects
);
router.put(
  "/:id/members",
  protect,
  addMember
);

export default router;