import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Doctors from "./pages/Doctors";
import Doctor from "./pages/Doctor";
import Appointment from "./pages/Appointment";
import MyProfile from "./pages/MyProfile";
import DoctorsDashboard from "./pages/DoctorsDashboard";
import MyAppointments from "./pages/MyAppointments";
import DoctorsAppointments from "./pages/DoctorsAppointments.js";
import {Routes,Route} from "react-router-dom";
function App()
{
  return (<>
  <Navbar></Navbar>
  <Routes>
    <Route path="/" element={<Home></Home>}></Route>
    <Route path="/register" element={<Register></Register>}></Route>
    <Route path="/login" element={<Login></Login>}></Route>
    <Route path="/doctors" element={<Doctors></Doctors>}></Route>
    <Route path="/doctors/:speciality" element={<Doctors></Doctors>}></Route>
    <Route path="/doctor/:_id" element={<Doctor></Doctor>}></Route>
    <Route path="/:_id/appointment" element={<Appointment></Appointment>}></Route>
    <Route path="/myprofile" element={<MyProfile></MyProfile>}></Route>
    <Route path="/myappointments" element={<MyAppointments></MyAppointments>}></Route>
    <Route path="/doctorsDashboard" element={<DoctorsDashboard></DoctorsDashboard>}></Route>
    <Route path="/doctorsDashboard/:id" element={<DoctorsAppointments></DoctorsAppointments>}></Route>
  </Routes>
  </>);
}
export default App;