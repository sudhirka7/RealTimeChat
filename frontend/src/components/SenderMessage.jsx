import { useEffect, useRef } from "react";
import dp from "../assets/dp.webp";
import { useSelector } from "react-redux";

function ReceiverMessage({ image, message }) {
  const scroll = useRef();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!image) {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [image, message]);

  const handleImageLoad = () => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={scroll}
      className="flex items-end justify-end gap-2 mx-[10px] mt-[10px]"
    >
      <div className="w-[40px] h-[40px] bg-[rgb(23,151,194)] rounded-full border-4 border-[rgb(23,151,194)] shadow-lg overflow-hidden flex justify-center items-center">
        <img
          src={userData.image || dp}
          alt="receiver-dp"
          className="w-full h-full object-cover"
        />
      </div>

      
      <div className="w-fit max-w-[500px] px-[10px] py-[10px] bg-[rgb(23,151,194)] text-white text-[18px] rounded-tl-2xl rounded-br-2xl rounded-bl-2xl shadow-gray-400 shadow-lg flex flex-col gap-2">
        {image && (
          <img
            src={image}
            alt="message"
            onLoad={handleImageLoad}
            className="w-[150px] rounded-lg"
          />
        )}
        {message && <span>{message}</span>}
      </div>
    </div>
  );
}

export default ReceiverMessage;
