import React from "react";
import backgroundImage from "../../assets/wallpaper.png";

const EmptyMessages = () => {
  return (
    <div
      className="h-full text-gray-600 bg-no-repeat bg-cover grid place-items-center text-xl"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      Say! Hi to start the conversation
    </div>
  );
};

export default EmptyMessages;
