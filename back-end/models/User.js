const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone:{
    type:String,
    default:" ", 
  },
  address: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default: "Other",
  },
  birthday: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
