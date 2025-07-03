import React ,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom"; 
import "./MyAppointments.css";
function MyAppointments()
{
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]); 
    useEffect(()=>{
        async function getMyAppointments(){
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in first");
                navigate("/login");
                return;
            }
            try {
                const res = await fetch("http://localhost:5000/api/appointments/myappointments", {
                    method: "GET",
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setAppointments(data);
                    console.log(data);
                } else {
                    console.error("Failed to get appointments :", res.status);
                }
            } catch (err) {
                console.error("Error fetching appointments :", err);
            }
        }
        getMyAppointments();
    },[navigate]);
    async function handleCancel(id)
    {
        try{
            let response=await fetch(`http://localhost:5000/api/appointments/cancel/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (response.ok) 
            {
              alert("Appointment cancelled successfully.");
              setAppointments(prev => prev.map(appt => appt._id === id ? { ...appt, status: "cancelled" } : appt
                )
              );
            }
            else 
            {
                alert(data.message || "Failed to cancel appointment.");
            }
        }
        catch(error)
        {
            console.error("Error cancelling appointment:", error);
            alert("Something went wrong.");
        }
    }
    return (<div className="myappointments">
        {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id} style={{border:"2px solid black",marginBottom:"5px",padding:"5px"}}>
              <strong>{appointment.doctorName}</strong> ({appointment.speciality}) <br />
              Date: {new Date(appointment.appointmentDate).toLocaleDateString("en-IN")} <br />
              Status: {appointment.status}
              <p style={{margin:"5px 0px 0px 0px",padding:"0px"}}><button onClick={()=>{handleCancel(appointment._id)}}>Cancel</button></p>
            </li>
          ))}
        </ul>
      )}
    </div>);
}
export default MyAppointments;