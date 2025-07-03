const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/authMiddleware");
const { bookAppointment,myappointments,cancelAppointment } = require("../controllers/bookAppointment");
router.post("/", requireAuth, bookAppointment);
router.get("/myappointments",requireAuth,myappointments);
router.put("/cancel/:id",cancelAppointment);
module.exports = router;