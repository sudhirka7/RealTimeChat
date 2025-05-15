import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUserData,setSelectedUser } from "../redux/userSlice.js";


function Login(){
  let navigate=useNavigate()
  let [show, setshow] = useState(false)
  let [loading, setloading] = useState(false)
  let [err, seterr] = useState("")
  let [email, setemail] = useState("")
  let [password, setpassword] = useState("")
  let dispatch=useDispatch()
  const handleLogin =async (e)=>{
    setloading(true);
    e.preventDefault()
    try {
      let result = await axios.post(`${serverUrl}/api/auth/login`,{email, password},{withCredentials:true})
      dispatch(setUserData(result.data))
      dispatch(setSelectedUser(null))
      setemail("")
      setpassword("")
      seterr("")
    } catch (error) {
      console.log(" Error",error)
      setemail("")
      seterr(error.response.data.message)
      setpassword("")
      setloading(false)
    }
  }
  return(
    <div className="w-full h-[100vh] bg-salate-200 flex items-center justify-center">
      <div className="w-full max-w-[400px] h-[600px] bg-white rounded-lg shadow-gray-500 shadow-lg flex flex-col gap-[10px]">
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center ">
          <h1 className="text-gray-600 font-bold text-[30px]">Welcome to <span className="text-white">Chatly</span></h1>
        </div>
        <form className="w-full flex flex-col gap-[20px] items-center" onSubmit={handleLogin}>
          

          <input type="email" placeholder="email" onChange={e=>{setemail(e.target.value)}} value={email} className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg" />

          <div className="w-[90%] h-[50px]  outline-none border-2 border-[#20c7ff]   overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative">
            <input type={`${show?"text":"password"}`} onChange={e=>{setpassword(e.target.value)}} value={password} placeholder="password"  className="w-full h-full outline-none px-[20px] py-[10px] bg-[white] text-gray-700 text-[19px] rounded-lg "/>
            <span className="absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] font-semibold cursor-pointer" onClick={()=>setshow(prev=>!prev)}>{`${show?"Hide":"show"}`}</span>
          </div>
          {err && <p className="text-red-500">{err}</p>}
          <button className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-200 shadow-lg text-[20px] w-[200px] font-semibold hover:shadow-inner" disabled={loading}>{`${loading?"Loading....":"Login"}`}</button>
          <p>Don't Have An Account ? <span className="text-[blue] cursor-pointer" onClick={()=>navigate("/signup")}>SignUp</span></p>

        </form>

      </div>
     
    </div>
  )
}
export default Login;