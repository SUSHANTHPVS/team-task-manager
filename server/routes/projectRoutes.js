const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const {
  protect,
} = require("../middleware/authMiddleware");


// CREATE PROJECT
router.post("/", protect, createProject);


// GET PROJECTS
router.get("/", protect, getProjects);


module.exports = router;