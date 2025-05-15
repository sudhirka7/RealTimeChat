import { IoIosArrowRoundBack } from "react-icons/io"
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedUser } from "../redux/userSlice";
import { RiEmojiStickerLine, RiSendPlane2Fill } from "react-icons/ri";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";


function MessageArea() {
  let dispatch = useDispatch();
  let { selectedUser } = useSelector(state => state.user)
  let [showPicker, setshowPicker] = useState(false)
  let [input, setinput] = useState("")
  const onEmojiClick = (emojiData) => {
    setinput(preIput => preIput + emojiData.emoji)
    setshowPicker(false)
  }
  return (
    <div className={`lg:w-[70%] ${selectedUser ? "block" : "hidden"}   lg:block w-full h-full bg-slate-200 border-l-2 border-gray-300`}>
      {selectedUser &&
      <div className="">
        <div className="w-full h-[100px] bg-[#127799] rounded-b-[30px] shadow-gray-400 shadow-lg flex  gap-1 items-center px-5 overflow-hidden">
          <div className="cursor-pointer">
            <IoIosArrowRoundBack className="w-[40px] h-[40px] text-white" onClick={() => { dispatch(setSelectedUser(null)) }} />
          </div>
          
          <div className="w-[40px] h-[40px] bg-white rounded-full border-4 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center">

            <img
              src={selectedUser?.image || dp}
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-gray-800 font-semibold text-[20px]">{selectedUser?.name || "user"}</h1>
          
        </div>
        <div className="mt-4 mr-4 overflow-y-auto">
        <SenderMessage/>
        <ReceiverMessage/>
        <SenderMessage/>
        <ReceiverMessage/>
        </div>
      </div>}
      {!selectedUser &&
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-bold text-[50px]">Welcome to chatly </h1>
          <span className="text-gray-700 font-semibold text-[30px]">Chat Friendly !</span>
        </div>}
        
      {selectedUser &&
        
        <div className="lg:w-[70%] w-full fixed bottom-[20px] flex flex-col">
          
          <div className="lg:w-[70%] w-full fixed bottom-[70px] flex justify-center" style={{ transform: 'scale(0.6)', transformOrigin: 'bottom left' }}>
            {showPicker && <EmojiPicker width={300} height={350} className="shadow-lg" onEmojiClick={onEmojiClick} />}
          </div>
          <div className="lg:w-[70%] w-full fixed bottom-[20px] flex justify-center">
            
            <form className="w-[95%] lg:max-w-[60%] bg-[#1797c2] shadow-lg rounded-full flex items-center px-2 py-2 gap-2">

              <div>
                <RiEmojiStickerLine className="w-full h-full px-[10px] outline-none border-0 text-[19px] text-white cursor-pointer" onClick={() => { setshowPicker(prev => !prev) }} />
              </div>
              <input
                type="text"
                placeholder="Message..."
                className="w-full h-full flex-1 px-[10px] border-0 text-[19px]  bg-transparent text-white placeholder-white outline-none"
                onChange={(e) => setinput(e.target.value)} value={input} />
              <div>
                <FaImage className="w-full h-full px-[10px] outline-none border-0 text-[19px] text-white cursor-pointer" />
              </div>
              <div>
                <RiSendPlane2Fill className="w-full h-full px-[10px] outline-none border-0 text-[19px] text-white cursor-pointer" />
              </div>
            </form>
          </div>

        </div>
      }
    </div>
  )
}

export default MessageArea