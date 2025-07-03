const Appointment = require("../models/Appointment");

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, doctorName, speciality, appointmentDate } = req.body;

    if (!doctorId || !doctorName || !speciality || !appointmentDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAppointment = new Appointment({
      userId: req.user._id,         
      userName: req.user.fullName, 
      doctorId,
      doctorName,
      speciality,
      appointmentDate,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const myappointments = async (req, res) => {
  try {
    const userId = req.user.id; 

    const appointments = await Appointment.find({ userId });

    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error while fetching appointments." });
  }
};
const cancelAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  console.log(appointmentId);
  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "cancelled";
    await appointment.save();
    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Cancel error:", error);
    res.status(500).json({ message: "Server error while cancelling appointment" });
  }
};
const doctorsAppointments = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const appointments = await Appointment.find({ doctorId });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this doctor" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching doctor's appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { bookAppointment,myappointments,cancelAppointment,doctorsAppointments};
