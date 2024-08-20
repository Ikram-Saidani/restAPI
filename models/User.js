//8.define a mongoose Schema and export the model
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

const userModel=mongoose.model("user",userSchema)

module.exports=userModel