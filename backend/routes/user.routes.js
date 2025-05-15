import express from "express"
import { editProfile, getcurrentUser, getOtherUser, search } from "../controllers/user.controller.js"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"

const userRouter = express.Router()

userRouter.get("/current", isAuth, getcurrentUser)
userRouter.get("/others",isAuth,getOtherUser)
userRouter.put("/profile", isAuth,upload.single("image"), editProfile)
userRouter.get("/search",isAuth,search)

export default userRouter