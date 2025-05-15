import axios from "axios"
import { useEffect } from "react"
import  {serverUrl}  from "../main.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers } from "../redux/userSlice.js"

const getOtherUser=()=>{
  let dispatch= useDispatch()
  let {otherUsers} = useSelector(state=>state.user)
  useEffect(()=>{
    const fetchUser= async ()=>{
      try {
        let result = await axios.get(`${serverUrl}/api/user/others`,{withCredentials:true})
        dispatch(setOtherUsers(result.data))
      } catch (error) {
        console.log("error fetch : -",error)
      }
    }
  
    if(!otherUsers)fetchUser()
  },[])
}

export default getOtherUser