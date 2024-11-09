import React from "react";
import { FaRegImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { MdAudioFile } from "react-icons/md";
import { BsFileEarmarkArrowUpFill } from "react-icons/bs";

const Attach = () => {
  return (
    <div className="bg-white shadow rounded absolute bottom-16 left-1 w-fit p-2">
      <form>
        <label className="flex items-center px-2 py-1 gap-3 hover:bg-gray-100 cursor-pointer rounded-md">
          <FaRegImage size={16} />
          <p>Image</p>
          <input
            type="file"
            // onChange={handleUploadImage}
            className="hidden"
          />
        </label>

        <label className="flex items-center px-2 py-1 gap-3 hover:bg-gray-100 cursor-pointer rounded-md">
          <FaVideo size={18} />
          <p>Video</p>
          <input
            type="file"
            // onChange={handleUploadVideo}
            className="hidden"
          />
        </label>

        <label className="flex items-center px-2 py-1 gap-3 hover:bg-gray-100 cursor-pointer rounded-md">
          <MdAudioFile size={18} />
          <p>Audio</p>
          <input
            type="file"
            // onChange={handleUploadVideo}
            className="hidden"
          />
        </label>

        <label className="flex items-center px-2 py-1 gap-3 hover:bg-gray-100 cursor-pointer rounded-md">
          <BsFileEarmarkArrowUpFill size={18} />
          <p>File</p>
          <input
            type="file"
            // onChange={handleUploadVideo}
            className="hidden"
          />
        </label>
      </form>
    </div>
  );
};

export default Attach;
