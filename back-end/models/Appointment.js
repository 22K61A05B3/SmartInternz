const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "booked",
  }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
