import { IoIosArrowRoundBack } from "react-icons/io"
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedUser } from "../redux/userSlice";
import { RiEmojiStickerLine, RiSendPlane2Fill } from "react-icons/ri";
import { FaImage } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { serverUrl } from "../main";
import { setMessages } from "../redux/messageSlice.js";


function MessageArea() {

  let dispatch = useDispatch();
  let { selectedUser, userData, socket } = useSelector(state => state.user)
  let [showPicker, setshowPicker] = useState(false)
  let [input, setinput] = useState("")
  let [backendImage, setBackendImage] = useState(null)
  let [frontendImage, setfrontendImage] = useState(null)
  let [b, setb] = useState(false)
  let image = useRef()
  let { messages } = useSelector(state => state.message)
  const handleImage = (e) => {
    let file = e.target.files[0]
    setBackendImage(file)
    setfrontendImage(URL.createObjectURL(file))
  }
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (input.length == 0 && !backendImage) {
      return null
    }
    try {
      let formData = new FormData()
      formData.append("message", input)
      if (backendImage) {
        formData.append("image", backendImage)

      }
      let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData, { withCredentials: true })

      dispatch(setMessages([...messages, result.data]))
      setinput("")
      setb(false)
      setfrontendImage(null)
      setBackendImage(null)
    } catch (error) {
      console.log(error);
    }
  }
  const onEmojiClick = (emojiData) => {
    setinput(preIput => preIput + emojiData.emoji)
    setshowPicker(false)
  }

  return (
    <div className={`lg:w-[70%] ${selectedUser ? "block" : "hidden"}   lg:block w-full h-full bg-slate-200 border-l-2 border-gray-300`}>
      {selectedUser && (
        <div className="relative flex flex-col h-screen w-full  bg-slate-200 border-l-2 border-gray-300">

          {/* Header */}
          <div className="h-[100px] bg-[#127799] rounded-b-[30px] shadow-gray-400 shadow-lg flex gap-1 items-center px-5">
            <div className="cursor-pointer">
              <IoIosArrowRoundBack
                className="w-[40px] h-[40px] text-white"
                onClick={() => dispatch(setSelectedUser(null))}
              />
            </div>
            <div className="w-[40px] h-[40px] bg-white rounded-full border-4 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center">
              <img
                src={selectedUser?.image || dp}
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-white font-semibold text-[20px]">
              {selectedUser?.name ||selectedUser?.userName}
            </h1>
          </div>

          {/* Scrollable Messages */}
          <div className="flex-1 overflow-y-auto mt-2 px-4 py-2 space-y-3">
            {messages?.map((mess) => (
              mess.sender == userData._id ?
                <SenderMessage message={mess.message} image={mess.image} /> : <ReceiverMessage message={mess.message} image={mess.image} />
            ))}



          </div>

          {/* Emoji Picker */}
          {showPicker && (
            <div className="absolute bottom-[90px] left-4 z-10 scale-75 origin-bottom-left">
              <EmojiPicker
                width={300}
                height={350}
                className="shadow-lg"
                onEmojiClick={onEmojiClick}
              />
            </div>
          )}

          {/* Input Form */}
          <input type="file" hidden ref={image} onChange={handleImage} />
          <img src={frontendImage} alt="" className="w-[80px] rounded-lg shadow-gray-400 shadow-lg" />
          <div className="w-full px-4 py-3">

            <form className="w-full max-w-[700px] mx-auto bg-[#1797c2] shadow-lg rounded-full flex items-center px-2 py-2 gap-2" onSubmit={handleSendMessage}>
              <RiEmojiStickerLine
                className="text-[20px] text-white cursor-pointer"
                onClick={() => setshowPicker((prev) => !prev)}
              />
              <input
                type="text"
                placeholder="Message..."
                className="flex-1 bg-transparent text-white placeholder-white outline-none text-[16px]"
                onChange={(e) => setinput(e.target.value)}
                value={input}
              />
              <div className="cursor-pointer" onClick={() => image.current.click()}>
                <FaImage className="text-[20px] text-white" />
              </div>
              {(input.length > 0 || frontendImage !== null) && (
                <button type="submit" disabled={b} onClick={() => setb(false)}>
                  <RiSendPlane2Fill className="text-[20px] text-white cursor-pointer" />
                </button>
              )}




            </form>
          </div>

        </div>
      )}
      {!selectedUser &&
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-bold text-[50px]">Welcome to chatly </h1>
          <span className="text-gray-700 font-semibold text-[30px]">Chat Friendly !</span>
        </div>}


    </div>
  )
}

export default MessageArea
