import uploadOnCloudinary from "../config/cloudinary.js"
import { upload } from "../middlewares/multer.js"
import User from "../models/user.model.js"

export const getcurrentUser = async(req, res)=>{
  try {
    let userId = req.userId
    let user = await User.findById({_id:userId}).select("-password")
    if(!user){
      return res.status(400).json({message:"user not found"})
    }
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Current user error"})
  }
}

export const editProfile= async (req,res)=>{
  try {
    let {name} = req.body
    let image;
    if(req.file){
      image= await uploadOnCloudinary(req.file.path)
    }
    let user = await User.findByIdAndUpdate(req.userId,{
      name,
      image
    },{new:true}) 
    if(!user){
      return res.status(400).json({message:"user not found"})
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message:"Profile error"})
  }
}

export const getOtherUser= async (req,res)=>{
  try {
    let users= await User.find({
      _id:{$ne:req.userId}
    }).select("-password")
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({message:"get other users error ",error})
  }
}

export const search = async (req, res)=>{
  try {
    let {query} = req.query
    if(!query){
      return res.status(400).json({message:"query is required"})
    }
      let users = await User.find({
        $or:[
          {name:{$regex:query, $options:"i"}},
          {userName:{$regex:query, $options:"i"},}
        ]
      })
      return res.status(200).json(users)
  } catch (error) {
    
  }
}