import React,{useState} from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
function Login()
{
    let navigate=useNavigate();
    async function handleLogin(e)
    {
        e.preventDefault();
        try{
            const response=await fetch("http://localhost:5000/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:lnemail,
                    password:lnpassword
                })
            });
            const data=await response.json();
            if(response.ok)
            {
                alert("Login successful!");
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
            }
            else {
                alert("Error: " + (data.message || data.error));
              }
        }
        catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong.");
        }
    }
    let [lnemail,updatelnEmail]=useState("name.@gmail.com");
    let [lnpassword,updatelnPassword]=useState("");
    return (<div className="login">
        <h1>Login</h1>
        <p id="heading">Please log in to book appointment</p>
        <form autoComplete="off" name="loginForm" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required autoComplete="off" name="Email" value={lnemail} onChange={(event)=>{updatelnEmail(event.target.value)}}></input>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required autoComplete="off" name="Password" value={lnpassword} onChange={(event)=>{updatelnPassword(event.target.value)}}></input>
            <label></label>
            <input type="submit" value="Login"></input>
        </form>
        <p>Create an new account?<Link to="/register">Click here</Link></p>
    </div>);
}
export default Login;