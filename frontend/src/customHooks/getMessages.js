// useGetMessages.js
import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice.js"
import { serverUrl } from "../main.jsx"

const getMessage = () => {
  const dispatch = useDispatch()
  const { selectedUser,userData } = useSelector(state => state.user)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/message/get/${selectedUser._id}`, 
          { withCredentials: true }
        )
        dispatch(setMessages(result.data))
      } catch (error) {
        console.error("Error fetching messages:", error)
      }
    }

    fetchMessages()
  }, [selectedUser, userData]) // refetch whenever selectedUser changes
}

export default getMessage
