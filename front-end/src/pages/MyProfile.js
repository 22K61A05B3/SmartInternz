import React, { useState } from "react";
import "./MyProfile.css";
import profile from "../images/profile.jpg";
import { useNavigate } from "react-router-dom";
function MyProfile()
{
    let user=localStorage.getItem("user");
    let navigate=useNavigate();
    user=JSON.parse(user);
    function uploadImage(event){
        const file=event.target.files[0];
        const element=document.getElementById("defaultImage");
        element.src=URL.createObjectURL(file);
    }
    let [phone,updatePhone]=useState("+00 000 000 0000");
    let [address,updateAddress]=useState(" ");
    let [birthday,updateBirthday]=useState("2004-12-16");
    let [gender,updateGender]=useState("Female");
    async function handleSave(e)
    {
        e.preventDefault();
        const token = localStorage.getItem("token");
        console.log("Token retrieved from localStorage:", token);
        if (!token) {
            console.log("Token is null or undefined. Showing alert and returning.");
            alert("You must be logged in to book an appointment.");
            return;
        }
        try{
            let response=await fetch("http://localhost:5000/api/auth/profile",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                phone:phone,
                address:address,
                gender:gender,
                birthday:birthday
            })
            });
            const data = await response.json();
            console.log("API Response Status:", response.status);
            console.log("API Response Data:", data);

            if (response.ok) {
                alert("Profile updated successfully.");
                navigate("/");
            } else {
                alert("Error: " + data.message);
            }
        }
        catch(error)
        {
            alert("Something went wrong.");
            console.error("Network error:", error);
        }
    }
    return (<div className="myprofile">
        <form>
            <img id="defaultImage" src={profile} width="150px" alt="ProfilePicture"></img>
            <input type="file" onChange={uploadImage}></input>
        </form>
        <h1>{user.fullName}</h1>
        <hr></hr>
        <h3>CONTACT INFORMATION</h3>
        <label htmlFor="email">Email id:</label>&nbsp;<input type="email" id="email" className="specialInput" value={user.email} readOnly></input><br></br><br></br>
        <label htmlFor="phone">Phone:</label>&nbsp;<input type="tel" id="phone" className="specialInput" value={phone} onChange={(event)=>{updatePhone(event.target.value)}}></input><br></br><br></br>
        <label>Address</label>&nbsp;<input type="text" className="specialInput" value={address} onChange={(event)=>{updateAddress(event.target.value)}}></input>
        <hr></hr>
        <h3>BASIC INFORMATION</h3>
        <label>Gender:</label>&nbsp;<input type="radio" value="Male" name="gender" id="gender1" checked={gender==="Male"} onChange={(event)=>{updateGender(event.target.value)}}></input><label htmlFor="gender1">Male</label>
        <input type="radio" value="Female" name="gender" id="gender2" checked={gender==="Female"} onChange={(event)=>{updateGender(event.target.value)}}></input><label htmlFor="gender2">Female</label>
        <input type="radio" value="Others" name="gender" id="gender3" checked={gender==="Others"} onChange={(event)=>{updateGender(event.target.value)}}></input><label htmlFor="gender3">Others</label><br></br><br></br>
        <label>Birthday:</label>&nbsp;<input type="date" className="specialInput" value={birthday} onChange={(event)=>{updateBirthday(event.target.value)}}></input><br></br><br></br>
        <button onClick={handleSave}>Save</button>
    </div>);
}
export default MyProfile;