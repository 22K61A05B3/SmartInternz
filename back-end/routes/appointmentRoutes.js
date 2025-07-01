// C:\Users\KIRAN BABU\Desktop\DOCSPOTProject\back-end\routes\appointmentRoutes.js
const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/authMiddleware"); // Ensure this path is correct
const { bookAppointment } = require("../controllers/bookAppointment");

// Your existing route
router.post("/", requireAuth, bookAppointment);

// TEMPORARY TEST ROUTE
router.get("/test-auth", requireAuth, (req, res) => {
    res.status(200).json({ message: "Auth successful for test route!" });
});

module.exports = router;