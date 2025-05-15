import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/profile";
import Home from "./pages/Home";
import getCurrentUser from "./customHooks/getCurrentUser.js";
import { useDispatch, useSelector } from "react-redux";
import getOtherUser from "./customHooks/getOtherUser.js";
import { io } from "socket.io-client"
import { serverUrl } from "./main.jsx";
import { setOnlineUser, setSocket } from "./redux/userSlice.js";

function App() {
  getCurrentUser()
  getOtherUser()
  let { userData, socket, onlineUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
  if (userData) {
    const socketio = io(`${serverUrl}`, {
      query: { userId: userData._id },
    });

    
    socketio.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUser(users)); // <-- e
    });

    dispatch(setSocket(socketio)); // Save socket in Redux

    return () => {
      socketio.disconnect();  
      dispatch(setSocket(null));  
    };
  }
}, [userData]);

  return (
    <Routes>
      <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/profile" />} />
      <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/signup" />} />
    </Routes>
  )
}

export default App;