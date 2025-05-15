import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  email:{
    type:String,
    required:true,
  },
  userName:{
    type:String,
    required: true,
    unique:true
  },
  password: {
    type:String,
    required:true,
  },
  image:{
    type:String,
    default:""
  }

},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User;