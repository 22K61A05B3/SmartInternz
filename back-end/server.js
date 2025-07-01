const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const cors = require("cors");
dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected successfully.");
})
.catch(()=>{
    console.log("Error connecting to MongoDB.");
});
const userRoutes = require("./routes/userRoutes");
app.use("/api/auth", userRoutes);
const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

const port=process.env.PORT||5001;
app.listen(port,()=>{
    console.log("Server runnig on port http://localhost:"+port);
});