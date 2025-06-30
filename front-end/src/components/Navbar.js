import React,{useState,useEffect} from "react";
import dropDown from "../images/dropDown.jpg";
import profile from "../images/profile.jpg";
import logo from "../images/docspot.jpg";
import {Link, useNavigate} from "react-router-dom";
import "./Navbar.css";
function DropDown()
{
    let navigate=useNavigate();
    function handleLogout()
    {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }
    return (<>
        <p>My Profile</p>
        <p onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>Logout</p>
    </>)
}
function Logged(props)
{
    let [dropDownClick,updateClick]=useState(false);
    return (<div className="nvChild2t">
        <div className="profile">
            <img src={profile} width="50px" alt="profile"></img>
            <img src={dropDown} width="50x" height="30px" alt="dropDown" onClick={()=>{updateClick((prev)=>{return !prev})}}></img>
        </div>
        <div className="dropDown">
            {
                dropDownClick&&<DropDown></DropDown>
            }
        </div>
    </div>);
}
function Register()
{
    return (<div className="nvChild2f">
        <Link to="/login">Login</Link>
        <Link to="/register">Create Account</Link>
    </div>);
}
function Navbar()
{
    let navigate=useNavigate();
    let [logged,setLogin]=useState(false)
    const token=localStorage.getItem("token");
    useEffect(()=>{
        if(token){
            setLogin(true);
        }
        else
        {
            setLogin(false);          
        }
    },[token]);
    return (<div className="navbar">
        <div className="nvChild1">
            <img src={logo} width="50px" alt="logo" onClick={()=>{navigate("/")}}></img>
            <p onClick={()=>{navigate("/")}}>DOCSPOT</p>
        </div>
        {
            logged?<Logged state={logged}></Logged>:<Register></Register>
        }
    </div>);
}
export default Navbar