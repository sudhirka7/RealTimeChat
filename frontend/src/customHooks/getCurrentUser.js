import axios from "axios"
import { useEffect } from "react"
import  {serverUrl}  from "../main.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice.js"

const getCurrentUser=()=>{
  let dispatch= useDispatch()
  let {userData} = useSelector(state=>state.user)
  useEffect(()=>{
    const fetchUser= async ()=>{
      try {
        let result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log("error fetch : -",error)
      }
    }
  
    fetchUser()
  },[])
}

export default getCurrentUser