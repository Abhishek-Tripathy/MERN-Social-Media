import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
import axios from "axios";
import { Loading } from "../components/Loading";
import Modal from "../components/Modal";
import { UserData } from "../context/UserContext";
import { SocketData } from "../context/SocketContext";
import { motion } from "framer-motion";


function UserAccount({ user: loggedInUser }) {
  const { posts, reels } = PostData();
  const [type, setType] = useState("post");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const params = useParams();
  const { onlineUsers } = SocketData();

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/" + params.id);

      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  let myPosts;

  if (posts) {
    myPosts = posts.filter((post) => post.owner._id === user._id);
  }

  let myReels;

  if (reels) {
    myReels = reels.filter((reel) => reel.owner._id === user._id);
  }

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

  const { followUser } = UserData();

  const followHandler = () => {
    setFollowed(!followed);
    followUser(user._id, fetchUser);
  };

  const followers = user.followers;

  useEffect(() => {
    if (followers && followers.includes(loggedInUser._id)) setFollowed(true);
  }, [user]);

  async function followData() {
    try {
      const { data } = await axios.get("/api/user/followdata/" + params.id);

      setFollowersData(data.followers);
      setFollowingsData(data.following);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [params.id]);

  useEffect(() => {
    followData();
  }, [user]);

  return (
    <>
      {loading ? (
  <Loading />
) : (
  <>
    {user && (
      <>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="bg-gradient-to-b from-blue-200 via-purple-300 to-blue-100 min-h-screen flex flex-col gap-6 items-center justify-start p-6 sm:p-12"
        >
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
            {/* Profile Picture with Online Status */}
            <div className="flex flex-col items-center relative">
              <img
                src={user.profilePic.url}
                alt="Profile"
                className="w-36 h-36 rounded-full shadow-md"
              />
              {onlineUsers.includes(user._id) && (
                <div className="absolute bottom-2 right-2 flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  {/* <span className="ml-2 text-sm text-green-600">Online</span> */}
                </div>
              )}  
            </div>

            {/* Profile Details */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.gender}</p>

              <div className="mt-4 space-y-2">
                <p
                  onClick={() => setShow(true)}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Followers: {user.followers.length}
                </p>
                <p
                  onClick={() => setShow1(true)}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Followings: {user.following.length}
                </p>

                {user._id === loggedInUser._id ? null : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={followHandler}
                    className={`w-full mt-4 px-6 py-2 rounded-md text-white ${
                      followed
                        ? "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600"
                        : "bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600"
                    }`}
                  >
                    {followed ? "UnFollow" : "Follow"}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Post/Reel Toggle */}
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

          {/* Content Display */}
          {type === "post" && (
            <>
              {myPosts && myPosts.length > 0 ? (
                myPosts.map((curr) => (
                  <PostCard key={curr._id} type={"post"} value={curr} />
                ))
              ) : (
                <p className="text-gray-600">No Posts Yet</p>
              )}
            </>
          )}
          {type === "reel" && (
            <>
              {myReels && myReels.length > 0 ? (
                <div className="flex flex-col gap-3 items-center">
                  <PostCard
                    key={myReels[index]._id}
                    type={"reel"}
                    value={myReels[index]}
                  />
                  <div className="button flex flex-col justify-center items-center gap-6">
                    {index !== 0 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevReel}
                        className="bg-gradient-to-r from-gray-400 to-gray-500 mb-9 text-white p-4 rounded-full flex items-center justify-center"
                      >
                        <FaArrowUp />
                      </motion.button>
                    )}
                    {index !== myReels.length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextReel}
                        className="bg-gradient-to-r from-gray-400 to-gray-500 mb-9 text-white p-4 rounded-full flex items-center justify-center"
                      >
                        <FaArrowDownLong />
                      </motion.button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">No Reels Yet</p>
              )}
            </>
          )}
        </motion.div>
      </>
    )}
  </>
)}    </>
  );
}

export default UserAccount;
