import React, { useState, useEffect } from "react";
import "./Appointment.css";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../assets/assets_frontend/assets";

function Appointment() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [doctorUse, updateDoctorUse] = useState(null); // Start as null
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        const matchedDoctor = doctors.find((doctor) => doctor._id === _id);
        updateDoctorUse(matchedDoctor || null);
    }, [_id]);

    function handleSubmit(e) {
        e.preventDefault();
        alert("Booking Completed.");
        navigate("/");
        console.log("Appointment with:", doctorUse.name);
        console.log("Scheduled on:", dateTime);
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
                <h3 style={{margin:"0px"}} className="appointmentDoctor">Doctor Details :</h3>
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
