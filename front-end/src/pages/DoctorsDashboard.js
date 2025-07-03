import React from "react";
import {doctors} from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
import "./DoctorsDashboard.css";
function DoctorsDashboard()
{
    let doctorsInDb=doctors;
    let navigate=useNavigate();
    return (<div className="doctorsDashboard">{
            doctorsInDb.map((doctor)=>{
                return (
                    <div key={doctor._id} className="doctorInDb" onClick={()=>{navigate(`/doctorsDashboard/${doctor._id}`)}}>
                        <img src={doctor.image} alt="images"></img>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <p style={{width:"10px",height:"10px",backgroundColor:"orange",borderRadius:"5px"}}></p>
                            <p style={{color:"orange"}}>Available</p>
                        </div>
                        <h1>{doctor.name}</h1>
                        <p>{doctor.speciality}</p>
                    </div>)
            })
        }
    </div>);
}
export default DoctorsDashboard;