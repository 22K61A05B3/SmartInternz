import React,{useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {doctors,assets} from "../assets/assets_frontend/assets";
import "./Doctor.css";
function Doctor()
{
    let navigate=useNavigate();
    const {_id}=useParams();
    console.log(_id);
    const [searchedDoctor,updateSearch]=useState();
    const [docSlots,setDocSlots]=useState([]);
    const [slotIndex,setSlotIndex]=useState(0);
    const [slotTime,setSlotTime]=useState('')
    useEffect(()=>{
        updateSearch(doctors.filter((doc)=>{
            return doc._id===_id;
        }));
    },[_id]);
    return searchedDoctor&&(<div className="singleDoctor">
        <div className="doctorImage">
            <img src={searchedDoctor[0].image} alt="doctor"></img>
        </div>
        <div className="doctorDetails">
            <div className="doctorDetails1">
                <h1>{searchedDoctor[0].name}&nbsp;<img src={assets.verified_icon} alt="icon" width="23px"></img></h1>
                <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
                    <p>{searchedDoctor[0].degree}</p>
                    <button style={{padding:"5px",borderRadius:"50px",backgroundColor:"white"}}>{searchedDoctor[0].experience}</button>
                </div>
                <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
                    <p>About</p>
                    <img src={assets.info_icon} alt="info_icon"></img>
                </div>
                <p>{searchedDoctor[0].about}</p>
                <p>Appointment fee:${searchedDoctor[0].fees}</p>
            </div>
            <div className="doctorDetails2">
                <button onClick={()=>{navigate(`/${searchedDoctor[0]._id}/appointment`)}}>Book an Appointment</button>
            </div>
        </div>
    </div>)
}
export default Doctor;