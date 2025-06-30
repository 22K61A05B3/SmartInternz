import React, { useState ,useEffect} from "react";
import "./Doctors.css"
import {specialityData} from "../assets/assets_frontend/assets";
import {doctors} from "../assets/assets_frontend/assets";
import { Navigate, useNavigate, useParams } from "react-router-dom";
function Doctors()
{
    let navigate=useNavigate();
    let params=useParams();
    console.log(params);
    let [speciality,updateSpeciality]=useState(specialityData);
    let [doctorsList,updateDoctors]=useState([]);
    useEffect(() => {
        if (params.speciality) {
            updateDoctors(doctors.filter((doctor) => doctor.speciality === params.speciality));
        } else {
            updateDoctors(doctors);
        }
    }, [params.speciality]);
    
    return (<div className="specialityData">
        <div className="speciality">
        {
            speciality.map((special)=>{
                return (
                    <div key={special.speciality} className="special" onClick={()=>{navigate(`/doctors/${special.speciality}`)}}>
                        <img src={special.image} alt="images"></img>
                        <p>{special.speciality}</p>
                    </div>)
            })
        }
        </div>
        <div className="doctors">
        {
            doctorsList.map((doctor)=>{
                return (
                    <div className="doctor" key={doctor._id}>
                        <img src={doctor.image} alt="images" onClick={()=>{navigate(`/doctor/${doctor._id}`)}}></img>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <p style={{width:"10px",height:"10px",backgroundColor:"orange",borderRadius:"5px"}}></p>
                            <p style={{color:"orange"}}>Available</p>
                        </div>
                        <h1>{doctor.name}</h1>
                        <p>{doctor.speciality}</p>
                        <button style={{display:"grid",justifySelf:"center",marginBottom:"5px"}} onClick={()=>{navigate(`/${doctor._id}/appointment`)}}>Book</button>
                    </div>)
            })
        }
        </div>
    </div>);
}
export default Doctors;