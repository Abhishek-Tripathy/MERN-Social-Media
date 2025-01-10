import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { Loading } from "../components/Loading";
import Modal from "../components/Modal.jsx";
import axios from "axios";
import { motion } from "framer-motion";

function Account({ user }) {
  const navigate = useNavigate();
  const { logoutUser, updateProfilePic, updateProfileName, updatePassword } =
    UserData();
  const { posts, reels, loading } = PostData();
  const [type, setType] = useState("post");

  let myPosts;

  if (posts) {
    myPosts = posts.filter((post) => post.owner._id === user._id);
  }

  let myReels;

  if (reels) {
    myReels = reels.filter((reel) => reel.owner._id === user._id);
  }

  const logoutHandler = () => {
    logoutUser(navigate);
  };

  const [index, setIndex] = useState(0);

  const prevReel = () => {
    if (index === 0) {
      console.log("Null");
      return null;
    }
    setIndex(index - 1);
  };
  const nextReel = () => {
    if (index === reels.length - 1) {
      console.log("Null");
      return null;
    }
    setIndex(index + 1);
  };

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);

  async function followData() {
    try {
      const { data } = await axios.get("/api/user/followdata/" + user._id);

      setFollowersData(data.followers);
      setFollowingsData(data.following);
    } catch (error) {
      console.log(error);
    }
  }

  const [file, setFile] = useState("");
  const changeFileHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
  };

  const changeImageHandler = () => {
    const formData = new FormData();
    formData.append("file", file);
    updateProfilePic(user._id, formData, setFile);
  };

  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState(user.name ? user.name : "");

  const updateName = () => {
    updateProfileName(user._id, name, setName);
    setShowInput(false);
  };

  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updatePasswordHandler = (e) => {
    e.preventDefault();
    updatePassword(user._id, oldPassword, newPassword, setShowUpdatePass);
    setOldPassword("");
    setNewPassword("");
  };

  useEffect(() => {
    followData();
  }, [user]);

  return (
    <>
      {user && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-gradient-to-b from-blue-200 via-purple-300 to-blue-100 min-h-screen flex flex-col gap-6 items-center justify-start p-6 sm:p-12"
            >
              {/* Modal */}
              {show && (
                <Modal
                  value={followersData}
                  title={"Followers"}
                  setShow={setShow}
                />
              )}
              {show1 && (
                <Modal
                  value={followingsData}
                  title={"Followings"}
                  setShow={setShow1}
                />
              )}

              {/* Profile Section */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6"
              >
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                  <img
                    src={user.profilePic.url}
                    alt="Profile"
                    className="w-36 h-36 rounded-full shadow-md"
                  />
                  <div className="mt-4 flex flex-col items-center">
                    <input
                      type="file"
                      className="hidden"
                      id="fileUpload"
                      onChange={changeFileHandler}
                      required
                    />
                    <label
                      htmlFor="fileUpload"
                      className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-1  rounded-md cursor-pointer hover:from-blue-500 hover:to-purple-600"
                    >
                      Change Image
                    </label>
                    <button
                      onClick={changeImageHandler}
                      className="bg-gradient-to-r mt-2 from-blue-400 to-purple-500 text-white px-4 py-2 rounded-md cursor-pointer hover:from-blue-500 hover:to-purple-600"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex-1 text-center md:text-left">
                  {showInput ? (
                    <div className="flex gap-2 justify-center md:justify-start">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 w-32"
                        type="text"
                        placeholder="Enter Name"
                        required
                      />
                      <button
                        className="bg-gradient-to-r from-green-400 to-green-500 text-white p-2 rounded-md hover:from-green-500 hover:to-green-600"
                        onClick={updateName}
                      >
                        <IoCheckmarkDoneCircle />
                      </button>
                      <button
                        onClick={() => setShowInput(false)}
                        className="bg-gradient-to-r from-red-400 to-red-500 p-2 rounded-md text-white hover:from-red-500 hover:to-red-600"
                      >
                        <MdCancel />
                      </button>
                    </div>
                  ) : (
                    <p className="text-xl font-semibold text-gray-800">
                      {user.name}
                      <button
                        onClick={() => setShowInput(true)}
                        className="ml-3 text-blue-500 hover:text-blue-600"
                      >
                        <FaEdit />
                      </button>
                    </p>
                  )}
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-600">{user.gender}</p>

                  <p
                    onClick={() => setShow(true)}
                    className="text-blue-500 underline cursor-pointer mt-2"
                  >
                    Followers: {followersData.length}
                  </p>
                  <p
                    onClick={() => setShow1(true)}
                    className="text-blue-500 underline cursor-pointer"
                  >
                    Following: {followingsData.length}
                  </p>

                  <button
                    onClick={logoutHandler}
                    className="bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 mt-4 rounded-md hover:from-red-500 hover:to-red-600"
                  >
                    Log Out
                  </button>
                </div>
              </motion.div>

              {/* Update Password */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`${
                  showUpdatePass
                    ? "bg-gradient-to-r from-red-400 to-red-500"
                    : "bg-gradient-to-r from-pink-400 via-purple-500 to-purple-600 hover:from-pink-500 hover:via-purple-600 hover:to-purple-700 text-white "
                } text-white px-4 py-2 rounded-md hover:from-blue-500 hover:to-purple-600`}
                onClick={() => setShowUpdatePass(!showUpdatePass)}
              >
                {showUpdatePass ? "X" : "Update Password"}
              </motion.button>

              {showUpdatePass && (
                <form
                  onSubmit={updatePasswordHandler}
                  className="bg-white p-4 rounded-md shadow-md flex flex-col gap-4 w-full max-w-md"
                >
                  <input
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    type="password"
                    className="border border-gray-300 rounded-md px-4 py-2"
                    placeholder="Old Password"
                    required
                  />
                  <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    className="border border-gray-300 rounded-md px-4 py-2"
                    placeholder="New Password"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded-md hover:from-blue-500 hover:to-purple-600"
                  >
                    Update Password
                  </button>
                </form>
              )}

              {/* Controls */}
              <div className="bg-white p-4 rounded-md shadow-md flex justify-center gap-6">
                {["post", "reel"].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => setType(item)}
                    className={`${
                      type === item
                        ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                        : "bg-gray-200"
                    } px-4 py-2 rounded-md relative`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}

                    {/* Animated Underline */}
                    {type === item && (
                      <motion.div
                        layoutId="underline"
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-600 to-purple-800 w-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {type === "post" && (
                <>
                  {myPosts && myPosts.length > 0 ? (
                    myPosts.map((e) => (
                      <PostCard type={"post"} value={e} key={e._id} />
                    ))
                  ) : (
                    <p>No Post Yet</p>
                  )}
                </>
              )}
              {type === "reel" && (
                <>
                  {myReels && myReels.length > 0 ? (
                    <div className="flex flex-col gap-3  items-center">
                      <PostCard
                        type={"reel"}
                        value={myReels[index]}
                        key={myReels[index]._id}
                      />
                      <div className="button flex flex-col justify-center items-center gap-6">
                        {index === 0 ? (
                          ""
                        ) : (
                          <button
                            className="bg-gray-500 mb-9 text-white py-3 px-6 rounded-full flex items-center justify-center"
                            onClick={prevReel}
                          >
                            <FaArrowUp />
                          </button>
                        )}
                        {index === myReels.length - 1 ? (
                          ""
                        ) : (
                          <button
                            className="bg-gray-500 mb-9 text-white py-3 px-6 rounded-full flex items-center justify-center"
                            onClick={nextReel}
                          >
                            <FaArrowDownLong />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p>No Reels Yet</p>
                  )}
                </>
              )}
            </motion.div>
          )}
        </>
      )}
    </>
  );
}

export default Account;
