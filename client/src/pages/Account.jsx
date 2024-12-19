import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
import { Loading } from "../components/Loading";

function Account({ user }) {
  const navigate = useNavigate();
  const { logoutUser } = UserData();
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

  return (
    <>
      {user && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14">
              <div className="bg-white flex justify-between gap-4 p-8 rounded-lg shadow-md max-w-md">
                <div className="image flex flex-col justify-between mb-4 gap-4">
                  <img
                    src={user.profilePic.url}
                    className="w-[180px] h-[180px] rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-800 font-semibold">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <p className="text-gray-500 text-sm">{user.gender}</p>
                  <p className="text-gray-500 text-sm">
                    {user.followers.length}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {user.following.length}
                  </p>
                  <button
                    onClick={logoutHandler}
                    className="bg-red-500 text-white rounded-md"
                  >
                    LogOut
                  </button>
                </div>
              </div>
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
