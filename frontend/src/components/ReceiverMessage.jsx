import { useEffect, useRef } from "react";
import dp from "../assets/dp.webp";
import { useSelector } from "react-redux";

function ReceiverMessage({ image, message }) {
  const scroll = useRef();
  const { userData,selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!image) {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [image, message]);

  const handleImageLoad = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex items-end  gap-2 mx-[10px] mt-[10px]" ref={scroll}>
      {/* Message bubble */}
      <div className="w-fit max-w-[500px] px-[10px] py-[10px] bg-[#20c7ff] text-white text-[19px] rounded-tl-none rounded-2xl shadow-gray-400 shadow-lg flex flex-col gap-2">
        {image && (
          <img
            src={image}
            alt="attachment"
            onLoad={handleImageLoad}
            className="w-[150px] rounded-lg"
          />
        )}
        {message && <span>{message}</span>}
      </div>

      {/* User DP */}
      <div className="w-[40px] h-[40px] bg-white rounded-full border-4 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center">
        <img
          src={selectedUser.image || dp}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default ReceiverMessage;
