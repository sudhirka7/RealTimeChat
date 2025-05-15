import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import { serverUrl } from "../main";
import {
  setOtherUsers,
  setUserData,
  setSelectedUser,
  setSearchData,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");
  const { userData, otherUsers, selectedUser, onlineUser, searchData } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/search?query=${input}`,
        { withCredentials: true }
      );
      dispatch(setSearchData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (input.trim() !== "") {
        handleSearch();
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <div
      className={`lg:w-[30%] lg:block ${
        !selectedUser ? "block" : "hidden"
      } w-full h-full bg-slate-200`}
    >
      {/* Logout Button */}
      <div className="w-[40px] h-[40px] rounded-full bg-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center text-white fixed bottom-[15px] left-[20px]">
        <RiLogoutCircleLine
          className="w-full h-full object-cover cursor-pointer"
          onClick={handleLogout}
        />
      </div>

      {/* Header */}
      <div className="w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col gap-5 justify-center px-5">
        <h1 className="text-white font-bold text-2xl">chatly</h1>

        {/* Welcome User */}
        {userData && (
          <div className="flex items-center justify-between w-[80%]">
            <h1 className="text-gray-600 font-bold text-xl">Hii, {userData.name}</h1>
            <div className="relative w-[50px] h-[50px] bg-white rounded-full border-4 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center">
              <img
                src={userData.image || dp}
                alt={`${userData.name}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Search Box */}
        <div className="w-full flex items-center gap-4 flex-wrap">
          <div className="w-[90%] h-[70px]">
            {!search ? (
              <div
                className="h-[50px] rounded-full border-4 border-[#20c7ff] flex gap-[10px] items-center cursor-pointer"
                onClick={() => setSearch(true)}
              >
                <IoMdSearch className="w-[40px] h-[40px] bg-white rounded-full border-2 border-white shadow-lg" />

                {otherUsers?.map(
                  (user) =>
                    onlineUser?.includes(user._id) && (
                      <div
                        key={user._id}
                        className="relative w-[40px] h-[40px] bg-white rounded-full border-2 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center z-10"
                        onClick={() => {
                          dispatch(setMessages(null));
                          dispatch(setSelectedUser(user));
                        }}
                      >
                        <img
                          src={user.image || dp}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="w-[10px] h-[10px] rounded-full absolute bottom-1 right-1 bg-[#3aff20] shadow-lg"></span>
                      </div>
                    )
                )}
              </div>
            ) : (
              <form className="w-full h-[60%] bg-white shadow-lg flex items-center gap-3 rounded-full px-5">
                <IoMdSearch className="w-6 h-6" />
                <input
                  type="text"
                  placeholder="search users..."
                  className="w-full h-full p-2 text-lg outline-none border-none"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                />
                <RxCross2
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => {
                    setSearch(false);
                    setInput("");
                    dispatch(setSearchData(null));
                  }}
                />
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="w-full h-[46%] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]">
        {search && input.trim() !== "" ? (
          searchData?.length > 0 ? (
            searchData.map((user) => (
              <div
                key={user._id}
                className="w-[90%] h-[50px] bg-white shadow-lg flex mx-[10px] gap-[1px] items-center rounded-full hover:bg-[#b2ccdf] cursor-pointer mt-2"
                onClick={() => {
                  dispatch(setSelectedUser(user));
                  dispatch(setSearchData(null));
                  setSearch(false);
                  setInput("");
                }}
              >
                <div className="relative w-[40px] h-[40px] rounded-full border-2 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center mx-[10px]">
                  <img
                    src={user.image || dp}
                    alt={user.name || "user"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-[17px] text-gray-800 font-semibold">
                  {user.name}
                </h1>
              </div>
            ))
          ) : (
            <div className="text-gray-600 text-sm mt-2 ml-4">
              No users found.
            </div>
          )
        ) : (
          otherUsers?.map((user) => (
            <div
              key={user._id}
              className="w-[90%] h-[50px] bg-white shadow-lg flex mx-[10px] gap-[1px] items-center rounded-full hover:bg-[#b2ccdf] cursor-pointer"
              onClick={() => {
                dispatch(setMessages(null));
                dispatch(setSelectedUser(user));
              }}
            >
              <div className="relative w-[40px] h-[40px] rounded-full border-2 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center mx-[10px]">
                <img
                  src={user.image || dp}
                  alt={user.name || "user"}
                  className="w-full h-full object-cover"
                />
                {onlineUser?.includes(user._id) && (
                  <span className="w-[10px] h-[10px] rounded-full absolute bottom-1 right-1 bg-[#3aff20] shadow-lg"></span>
                )}
              </div>
              <h1 className="text-[17px] text-gray-800 font-semibold">
                {user.name || user.userName}
              </h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SideBar;
