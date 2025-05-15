import jwt from "jsonwebtoken"

const isAuth = async (req, res,next)=>{
  try {
    let token = req.cookies.token
    if(!token){
      return res.status(400).json({message:"token is found"})
    }
    let verifyToken = await jwt.verify(token,process.env.JWT_SECRET)
    req.userId = verifyToken.userid
    next()
  } catch (error) {
    return res.status(500).json({message:`isAuth Error`})
  }
}

export default isAuth