const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/authMiddleware");
const { bookAppointment } = require("../controllers/bookAppointment");
router.post("/", requireAuth, bookAppointment);

module.exports = router;