import express from "express";

import {
  createProject,
  getProjects,
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";


const router = express.Router();


// CREATE PROJECT
router.post(
  "/",
  protect,
  createProject
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