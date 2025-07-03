import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DoctorsAppointments.css";

function DoctorsAppointments() {
  const { id } = useParams();
  console.log(id);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function findAppointments() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/appointments/doctorAppointments/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    findAppointments();
  }, [id]);

  return (
    <div className="doctorsAppointments">
      <h1>Appointments for Doctor ID: {id}</h1>

      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id} className="appointment-item" style={{border:"2px solid black",marginBottom:"5px"}}>
              <strong>Patient:</strong> {appt.userName} <br />
              <strong>Date:</strong> {new Date(appt.appointmentDate).toLocaleDateString("en-IN")} <br />
              <strong>Status:</strong> {appt.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoctorsAppointments;