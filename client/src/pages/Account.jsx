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

function Account({ user }) {
  const navigate = useNavigate();
  const { logoutUser, updateProfilePic, updateProfileName, updatePassword } = UserData();
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
      setFollowingsData(data.followings);
    } catch (error) {
      console.log(error);
    }
  }

  const [file, setFile] = useState("")
  const changeFileHandler = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    setFile(file)
  }

  const changeImageHandler = () => {
    const formData = new FormData()
    formData.append("file", file)
    updateProfilePic(user._id, formData, setFile)
  }

  const [showInput, setShowInput] = useState(false)
  const [name, setName] = useState(user.name ? user.name : "")

  const updateName = () => {
    updateProfileName(user._id, name, setName)
    setShowInput(false)
  }

  const [showUpdatePass, setShowUpdatePass] = useState(false)
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updatePasswordHandler = (e) => {
    e.preventDefault();
    updatePassword(user._id, oldPassword, newPassword, setShowUpdatePass)
    setOldPassword("");
    setNewPassword("");
  }

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
            <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14">
              {show && <Modal value={followersData} title={"Followers"} setShow={setShow} />}
              {show1 && <Modal value={followingsData} title={"Followings"} setShow={setShow1} />}
              
              <div className="bg-white flex justify-between gap-4 p-8 rounded-lg shadow-md max-w-md">
                <div className="image flex flex-col justify-between mb-4 gap-4">
                  <img
                    src={user.profilePic.url}
                    className="w-[180px] h-[180px] rounded-full"
                  />
                  <div className="update w-[150px] mx-auto flex flex-col justify-center items-center">
                    <input className="m-auto" type="file" onChange={changeFileHandler} required />
                    <button className="bg-blue-500 rounded-lg text-white mt-2 px-3 py-2" onClick={changeImageHandler}>Update Profile</button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {showInput ? <div className="flex justify-center items-center gap-2">
                    <input value={name} onChange={e=>setName(e.target.value)} className="custom-input" style={{width: "80px"}} type="text" placeholder="Enter Name" required />
                    <button className="bg-blue-600 text-xl rounded-md p-1 text-white" onClick={updateName}><IoCheckmarkDoneCircle /></button>
                    <button onClick={()=>setShowInput(false)} className="bg-red-500 p-1 text-xl rounded-md text-white"><MdCancel /></button>
                  </div> 
                  : <p className="text-gray-800 font-semibold">{user.name}
                    <button className="ml-3" onClick={()=>setShowInput(true)}><FaEdit /></button>
                  </p>}
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <p className="text-gray-500 text-sm">{user.gender}</p>
                  <p className="text-gray-500 text-sm">
                    Followers: {user.followers.length}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Following: {user.following.length}
                  </p>
                  <button
                    onClick={logoutHandler}
                    className="bg-red-500 text-white rounded-lg py-1 "
                  >
                    LogOut
                  </button>
                </div>
              </div>

              <button className={`${showUpdatePass ? "bg-red-500" : "bg-blue-500"} px-2 py-1 rounded-md text-white`}
              onClick={() => setShowUpdatePass(!showUpdatePass)} >{showUpdatePass ? "X" : "Update Password"}</button>

              {showUpdatePass && <form onSubmit={updatePasswordHandler} className="flex justify-center items-center flex-col bg-white p-2 rounded-sm gap-4">
                <input value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} type="password" className="custom-input" placeholder="Old Password" required />
                <input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} type="password" className="custom-input" placeholder="New Password" required />
                <button type="submit" className="bg-blue-500 px-2 py-1 rounded-sm text-white">Update Password</button>
              </form>}
              
              <div className="controls flex justify-center items-center bg-white p-4 rounded-md gap-7">
                <button onClick={() => setType("post")}>Posts</button>
                <button onClick={() => setType("reel")}>Reels</button>
              </div>

              {type === "post" && (
                <>
                  {myPosts && myPosts.length > 0 ? (
                    myPosts.map((curr) => (
                      <PostCard key={curr._id} type={"post"} value={curr} />
                    ))
                  ) : (
                    <p>No Posts Yet</p>
                  )}
                </>
              )}
              {type === "reel" && (
                <>
                  {myReels && myReels.length > 0 ? (
                    <div className="flex gap-3 justify-center items-center">
                      <PostCard
                        key={myReels[index]._id}
                        type={"reel"}
                        value={myReels[index]}
                      />
                      <div className="button flex flex-col justify-center items-center gap-6">
                        {index === 0 ? (
                          ""
                        ) : (
                          <button
                            onClick={prevReel}
                            className="bg-gray-500 text-white py-5 px-5 rounded-full"
                          >
                            <FaArrowUp />
                          </button>
                        )}
                        {index === myReels.length - 1 ? (
                          ""
                        ) : (
                          <button
                            onClick={nextReel}
                            className="bg-gray-500 text-white py-5 px-5 rounded-full"
                          >
                            <FaArrowDownLong />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p>No Posts Yet</p>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Account;
