const express = require("express");
const { registerUser,loginUser,updateProfile,getUserProfile } = require("../controllers/userController");
const requireAuth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
router.put("/profile",requireAuth, updateProfile);
router.get("/profile", requireAuth, getUserProfile);
module.exports = router;