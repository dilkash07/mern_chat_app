import React from "react";
import { FaRegImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { MdAudioFile } from "react-icons/md";
import { BsFileEarmarkArrowUpFill } from "react-icons/bs";
import toast from "react-hot-toast";

const Attach = ({ setFile, setAttach }) => {
  const changeHandler = (event) => {
    const file = event.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB. Please upload a smaller file.");
      return;
    }
    setFile(file);
    setAttach(false);
  };

  return (
    <div className="bg-white border shadow-lg rounded absolute bottom-16 left-1 w-fit p-2">
      <label className="flex items-center px-2 py-1 gap-3 hover:bg-gray-100 cursor-pointer rounded-md">
        <FaRegImage size={16} />
        <p>Image</p>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          onChange={changeHandler}
          className="hidden"
        />
      </label>

      <label className="flex items-center px-2 py-1 gap-3 hover:bg-gray-100 cursor-pointer rounded-md">
        <FaVideo size={18} />
        <p>Video</p>
        <input
          type="file"
          accept="video/mp4, video/mkv"
          onChange={changeHandler}
          className="hidden"
        />
      </label>

      <label className="flex items-center px-2 py-1 gap-3 hover:bg-gray-100 cursor-pointer rounded-md">
        <MdAudioFile size={18} />
        <p>Audio</p>
        <input
          type="file"
          accept="audio/mp3, audio/wav"
          onChange={changeHandler}
          className="hidden"
        />
      </label>

      <label className="flex items-center px-2 py-1 gap-3 hover:bg-gray-100 cursor-pointer rounded-md">
        <BsFileEarmarkArrowUpFill size={18} />
        <p>File</p>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt,.xlsx"
          onChange={changeHandler}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default Attach;
