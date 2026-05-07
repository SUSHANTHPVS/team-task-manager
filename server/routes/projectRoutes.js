import express from "express";

import {
  createProject,
  getProjects,
  addMember,
  removeMember,
  editProject,
deleteProject,
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly
from "../middleware/adminMiddleware.js";


const router = express.Router();


// CREATE PROJECT
router.post(
  "/",
  protect,
  adminOnly,
  createProject
);
router.put(
  "/:id/members",
  protect,
  adminOnly,
  addMember
);
router.put(
  "/:id",
  protect,
  adminOnly,
  editProject
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProject
);
router.get(
  "/:id/members",
  protect,
  adminOnly,
  getProjectMembers
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
router.delete(
  "/:id/members",
  protect,
  adminOnly,
  removeMember
);

export default router;