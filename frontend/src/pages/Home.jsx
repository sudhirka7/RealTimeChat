import { useNavigate } from "react-router-dom"
import SideBar from "../components/SideBar"
import MessageArea from "../components/MessageArea"
import getMessage from "../customHooks/getMessages"

function Home() {
  let navigate = useNavigate()
  getMessage()
  return (
    <div className="w-full h-[100vh] flex">
      <SideBar />
      <MessageArea />
    </div>
  )
}

export default Home