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

module.exports = { bookAppointment };
