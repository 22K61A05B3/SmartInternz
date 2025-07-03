const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser=async (req,res)=>{
    try{
        const {fullName,email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user=new User({fullName,email,password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
}
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Invalid email or password" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid email or password" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      res.json({
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const updateProfile = async (req, res) => {
    try {
      const userId = req.user._id;
      const updates = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updates,
        { new: false }
      ).select("-password");
  
      res.json({ message: "Profile updated", user: updatedUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const userObj = user.toObject();
        if (userObj.birthday) {
        userObj.birthday = userObj.birthday.toISOString().split("T")[0];
      }

    res.status(200).json(userObj);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error while fetching profile." });
    }
};
module.exports = { registerUser ,loginUser,updateProfile,getUserProfile};