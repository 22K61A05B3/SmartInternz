import React, { useState, useEffect } from "react";
import "./Appointment.css";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../assets/assets_frontend/assets";

function Appointment() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [doctorUse, updateDoctorUse] = useState(null);
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        const matchedDoctor = doctors.find((doctor) => doctor._id === _id);
        updateDoctorUse(matchedDoctor || null);
    }, [_id]);

    async function handleSubmit(e) {
        e.preventDefault();

        console.log("handleSubmit called.");

        const token = localStorage.getItem("token");
        console.log("Token retrieved from localStorage:", token);

        if (!token) {
            console.log("Token is null or undefined. Showing alert and returning.");
            alert("You must be logged in to book an appointment.");
            return;
        }

        try {
            console.log("Attempting to send API request with token:", token.substring(0, 30) + '...'); // Log partial token
            console.log("Request Body:", {
                doctorId: doctorUse?._id, // Use optional chaining to be safe
                doctorName: doctorUse?.name,
                speciality: doctorUse?.speciality,
                appointmentDate: dateTime,
            });

            const response = await fetch("http://localhost:5000/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    doctorId: doctorUse._id,
                    doctorName: doctorUse.name,
                    speciality: doctorUse.speciality,
                    appointmentDate: dateTime,
                }),
            });

            const data = await response.json();
            console.log("API Response Status:", response.status);
            console.log("API Response Data:", data);

            if (response.ok) {
                alert("Appointment booked successfully.");
                navigate("/");
            } else {
                alert("Error: " + data.message);
            }
        } catch (err) {
            alert("Something went wrong.");
            console.error("Network error:", err);
        }
    }
    if (!doctorUse) {
        return (
            <div className="appointment">
                <div className="appointmentHeading">
                    <h1>Booking appointment</h1>
                    <p onClick={() => navigate("/")}>❌</p>
                </div>
                <p>Loading doctor details...</p>
            </div>
        );
    }

    return (
        <div className="appointment">
            <div className="appointmentHeading">
                <h1>Booking appointment</h1>
                <p onClick={() => navigate("/")}>❌</p>
            </div>

            <div>
                <h3 style={{ margin: "0px" }} className="appointmentDoctor">Doctor Details :</h3>
                <h4>Name: {doctorUse.name}</h4>
                <h4>Specialization: {doctorUse.speciality}</h4>
                <h2 className="dateAndTime">Appointment Date and Time:</h2>
            </div>

            <form name="slotForm" className="slotForm" onSubmit={handleSubmit}>
                <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                />
                <div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => navigate("/")}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default Appointment;