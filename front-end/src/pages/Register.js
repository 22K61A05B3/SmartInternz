import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
function Register()
{
    let navigate=useNavigate();
    async function handleSubmit(event)
    {
        event.preventDefault();
        try{
            const response=await fetch("http://localhost:5000/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    fullName:fullname,
                    email:email,
                    password:password
                })
            });
            const data=await response.json();
            if (response.ok) {
                alert("Registration successful!");
                navigate("/login");
              } else {
                alert("Error: " + (data.message || data.error));
              }
        }
        catch(error)
        {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    }
    let [fullname,updateFullname]=useState("");
    let [email,updateEmail]=useState("name.@gmail.com");
    let [password,updatePassword]=useState("");
    return (<div className="register">
        <h1>Create Account</h1>
        <p id="heading">Please sign up to book appointment</p>
        <form autoComplete="off" name="registrationForm" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" required autoComplete="off" name="Full Name" value={fullname} onChange={(event)=>{updateFullname(event.target.value)}}></input>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required autoComplete="off" name="Email" value={email} onChange={(event)=>{updateEmail(event.target.value)}}></input>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required autoComplete="off" name="Password" value={password} onChange={(event)=>{updatePassword(event.target.value)}}></input>
            <label></label>
            <input type="submit" value="Create account"></input>
        </form>
        <p>Already have an account?<Link to="/login">Login here</Link></p>
    </div>);
}
export default Register;