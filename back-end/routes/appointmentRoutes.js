const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/authMiddleware");
const { bookAppointment,myappointments,cancelAppointment,doctorsAppointments} = require("../controllers/bookAppointment");
router.post("/", requireAuth, bookAppointment);
router.get("/myappointments",requireAuth,myappointments);
router.put("/cancel/:id",cancelAppointment);
router.get("/doctorAppointments/:id",doctorsAppointments);
module.exports = router;