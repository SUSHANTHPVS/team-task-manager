const express = require("express");

const router = express.Router();

const {
  signupUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");


// SIGNUP
router.post("/signup", signupUser);


// LOGIN
router.post("/login", loginUser);


// PROFILE
router.get("/profile", protect, getUserProfile);


module.exports = router;