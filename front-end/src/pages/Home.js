import React, { useState ,useEffect} from "react";
import "./Home.css";
import doctor from "../images/doctors.jpg";
import { useNavigate } from "react-router-dom";
function Home()
{
    let navigate=useNavigate();
    let [present,updatePresent]=useState(null);
    const token=localStorage.getItem("token");
    useEffect(()=>{
        if(token)
        {
            updatePresent(true);
        }
        else
        {
            updatePresent(false);
        }
    },[token]);
    return (<div className="homePage">
        <div className="homePageImage">
            <img src={doctor} alt="doctor"></img>
        </div>
        <div className="homePageContent">
            <h1>Book Appointment</h1>
            <h1>With trusted doctors</h1>
            <p>DOCSPOT is a web-based application that streamlines the process of booking appointments with doctors. The platform enables patients to easily find, evaluate, and book consultations with healthcare professionals based on specialization, availability, and location.</p>
            {
                present ? (<button onClick={() => navigate("/doctors")}>Book Doctor</button>) : (<button onClick={() => navigate("/register")}>Book Doctor</button>)
            }
        </div>
    </div>);
}
export default Home;