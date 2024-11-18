import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCamera } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  updateAbout,
  updateName,
  updateProfilePicture,
} from "../../services/operations/UserAPI";

const Profile = ({ setOpenProfile }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loader);
  const [name, setName] = useState(user?.firstName + " " + user?.lastName);
  const [about, setAbout] = useState(user?.about);
  const [preview, setPreview] = useState(null);
  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const textarea = textareaRef.current;

  useEffect(() => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [textarea]);

  const changeHandler = (event) => {
    if (event.target.name == "name") {
      setName(event.target.value);
    } else {
      setAbout(event.target.value);
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const imageHandler = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };

      const formData = new FormData();
      formData.set("imageFile", file);
      dispatch(updateProfilePicture(formData, token));
    }
  };

  const nameHandler = () => {
    setEditAbout(false);
    setEditName(true);
  };

  const aboutHandler = () => {
    setEditName(false);
    setEditAbout(true);
  };

  const submitNameHandler = () => {
    dispatch(updateName(name, token));
    setEditName(false);
  };

  const submitAboutHandler = () => {
    dispatch(updateAbout(about, token));
    setEditAbout(false);
  };

  return (
    <div className="max-w-80 md:w-80 bg-white shadow-md p-5 rounded-md fixed bottom-2 left-2 z-10">
      <div className="flex flex-col gap-10 relative">
        <div
          className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-200"
          onClick={() => setOpenProfile(false)}
        >
          <RxCross1 />
        </div>
        <div className="flex items-center gap-x-4">
          <div className="relative">
            <img
              src={preview || user?.profilePic.image_url}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-24 rounded-full object-cover"
            />

            <input
              type="file"
              ref={fileInputRef}
              onChange={imageHandler}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />

            <button
              disabled={loading}
              onClick={() => fileInputRef.current.click()}
              className="h-6 w-6 grid place-items-center cursor-pointer rounded-full bg-gray-200 absolute bottom-0 right-1"
            >
              <IoIosCamera size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <div
              className={`w-full flex justify-between ${editName && "hidden"}`}
            >
              <p className="text-xl font-semibold">
                {user?.firstName + " " + user?.lastName}
              </p>
              <div className="p-1.5 hover:bg-gray-200 rounded-md">
                <MdOutlineModeEdit size={20} onClick={nameHandler} />
              </div>
            </div>

            <div
              className={`w-full flex flex-col gap-0.5 items-end ${
                !editName && "hidden"
              }`}
            >
              <input
                type="text"
                className="w-full text-xl px-1 py-0.5 rounded-md outline-none border border-b-2 border-b-orange-500"
                name="name"
                onChange={changeHandler}
                maxLength={25}
                value={name}
              />
              <button
                className="w-20 bg-orange-500 text-md text-white rounded"
                onClick={submitNameHandler}
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
              >
                {onHover ? "Done" : `${name?.length}/25`}
              </button>
            </div>
          </div>

          <label>
            <p className="text-gray-700">About</p>
            <div
              className={`w-full flex justify-between ${editAbout && "hidden"}`}
            >
              <p>{user?.about}</p>
              <div className="w-fit h-fit p-1.5 hover:bg-gray-200 rounded-md">
                <MdOutlineModeEdit size={20} onClick={aboutHandler} />
              </div>
            </div>

            <div
              className={`w-full flex flex-col gap-0.5 items-end ${
                !editAbout && "hidden"
              }`}
            >
              <textarea
                className="w-full px-1 py-0.5 rounded-md outline-none scrollbar-none resize-none overflow-hidden border border-b-2 border-b-orange-500"
                name="about"
                ref={textareaRef}
                onChange={changeHandler}
                maxLength={150}
                value={about}
              />
              <button
                className="w-20 bg-orange-500 text-md text-white rounded"
                onClick={submitAboutHandler}
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
              >
                {onHover ? "Done" : `${about?.length}/150`}
              </button>
            </div>
          </label>
          <div>
            <p className="text-gray-700">Email</p>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
