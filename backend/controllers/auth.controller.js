
import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

 

export const signUp = async (req, res)=>{
  try{
    const {userName, email, password} = req.body
    const checkUserByUserName = await User.findOne({userName})
    if(checkUserByUserName){
      console.log("user exist")
      return res.status(400).json({
        message:"userName Already Exist"})
    }
    const checkUserByemail = await User.findOne({email})
    if(checkUserByemail){
      console.log("email exist")
      return res.status(400).json({
        message:"Email Already Exist"})
    }

    if(password.length<6){
      return res.status(400).json({message:"Password must be at least 6 characters"})
    }

    const hashespassword = await bcrypt.hash(password,10)

    const user = await User.create({userName,email, password:hashespassword})

    const token = await genToken(user._id);
    res.cookie("token",token,{
      httpOnly:true,
      maxAge:7*24*60*60*1000,
      sameSite:"Strict",
      secure:false
    })

    return res.status(201).json(user)

  } catch (e){
    return res.status(500).json({message:`signup error ${e}`})
  }
}

export const login = async (req, res)=>{
  try{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({
        message:"User does not exist"})
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.status(400).json({message:"Incorrect password"})
    }

    const token = await genToken(user._id);
    res.cookie("token",token,{
      httpOnly:true,
      maxAge:7*24*60*60*1000,
      sameSite:"Strict",
      secure:false
    })

    return res.status(200).json(user)

  } catch (e){
    return res.status(500).json({message:`login error ${e}`})
  }
}

export const logout = async (req,res)=>{
  try {
    res.clearCookie("token")
    return res.status(200).json({message:"Logout Successfully"})
  } catch (error) {
    return res.status(500).json({message:`Logout error ${e}`})
  }
}