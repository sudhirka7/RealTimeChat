import { useRef, useState } from "react";
import dp from "../assets/dp.webp";
import { FaCamera } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";


function Profile() {
  let [saving, setsaving]= useState(false)
  let {userData} = useSelector(state=>state.user)
  let dispatch= useDispatch()
  let navigate = useNavigate()
  let [name, setname] = useState(userData.name|| "")
  let [frontendImage, setfrontendImage] = useState(userData.image||dp)
  let [bakendImage, setbackendImage] = useState(null)
  let image = useRef()
  const handleImage=(e)=>{
    let file = e.target.files[0]
    setbackendImage(file)
    setfrontendImage(URL.createObjectURL(file))
  }
  const handleProfile= async(e) =>{
    
    e.preventDefault()
    setsaving(true)
    try {
      let formData = new FormData()
      formData.append("name",name)
      if(bakendImage){
        formData.append("image", bakendImage)
      }
      let result = await axios.put(`${serverUrl}/api/user/profile`, formData,{withCredentials:true})
      setsaving(false)
      dispatch(setUserData(result.data))

    } catch (error) {
      console.log(error)
      setsaving(false)
      
    }
  }
  return (
    <div className="w-full h-screen bg-slate-200 flex flex-col justify-center items-center gap-6">
      <div className="fixed top-[20px] left-[20px]">
        <IoArrowBack className="text text-gray-600 w-[50px] h-[50px]"onClick={()=>navigate("/")} />
      </div>
      <div className="relative w-[200px] h-[200px] bg-white rounded-full border-4 border-[#20c7ff] shadow-gray-400 shadow-lg overflow-hidden flex justify-center items-center" onClick={()=>image.current.click()}>
        <img src={frontendImage} alt="profile-img" className="w-full h-full object-cover" />

        {/* Camera Icon Overlay */}
        <div className="absolute bottom-[20px] right-[20px] bg-white p-2 rounded-full shadow-md cursor-pointer">
          <FaCamera className="text-[#20c7ff]" />
        </div>
      </div>

       
      <form className="w-[95%] maxw-[500px] flex flex-col gap-[20px] items-center justify-center" onSubmit={handleProfile}>
        <input type="file" accept="image/*" ref={image} hidden  onChange={handleImage}/>
        <input type="text"  placeholder="Enter your name" className="w-[70%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg" onChange={e=>setname(e.target.value)} value={name}/>         
        <input type="text" className="w-[70%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text text-gray-400" value={userData?userData.userName:""} readOnly/>         
        <input type="text" className="w-[70%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text text-gray-400" value={userData?userData.email:""} readOnly/>         
        <button className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-200 shadow-lg text-[20px] w-[200px] font-semibold hover:shadow-inner" disabled={saving}>{`${saving?"Saving....":"Save Profile"}`}</button>
      </form>
    </div>
  );
}

export default Profile;
