import React, { useContext, useEffect, useState } from "react";
import { BsChatFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import { format, set } from "date-fns";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import SimpleModal from "./SimpleModal";
import { LoadingAnimation } from "./Loading";
import toast from "react-hot-toast";
import axios from "axios";
import { SocketData } from "../context/SocketContext";

function PostCard({ type, value }) {
  const [isLike, setIsLike] = useState(false);
  const [show, setShow] = useState(false);
  const [caption, setCaption] = useState(value.caption ? value.caption : "");
  const { user } = UserData();
  const { likePost, addComment, deletePost, loading, fetchPosts } = PostData();
  const [comment, setComment] = useState("");
  const formatDate = format(new Date(value.createdAt), "MMMM do");
  const [captionLoading, setCaptionLoading] = useState(false);
  const { onlineUsers } = SocketData();

  const likeHandler = () => {
    setIsLike(!isLike);
    likePost(value._id);
  };

  const addCommentHandler = (e) => {
    e.preventDefault();
    addComment(value._id, comment, setComment, setShow);
  };

  useEffect(() => {
    for (let i = 0; i < value.likes.length; i++) {
      if (value.likes[i] === user._id) setIsLike(true);
    }
  }, [value, user._id]);

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteHandler = () => {
    deletePost(value._id);
  };

  const [showInput, setShowInput] = useState(false);
  const editHandler = () => {
    setShowModal(false);
    setShowInput(true);
  };

  async function updateCaption() {
    setCaptionLoading(true);
    try {
      const res = await axios.put("/api/post/" + value._id, { caption });
      console.log(res);
      toast.success(res.data.message);
      fetchPosts();
      setShowInput(false);
      setCaptionLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setCaptionLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center pt-3 pb-14">
      {/* Modal for Edit/Delete */}
      <SimpleModal isOpen={showModal} onClose={closeModal}>
        <div className="flex flex-col items-center justify-center gap-3">
          <button
            onClick={editHandler}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md transition-all duration-200"
          >
            Edit
          </button>
          <button
            onClick={deleteHandler}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <LoadingAnimation /> : "Delete"}
          </button>
        </div>
      </SimpleModal>

      {/* Post Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-auto">
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-4">
          <Link className="flex items-center" to={`/user/${value.owner._id}`}>
            <div className="relative">
              <img
                src={value.owner.profilePic.url}
                className="w-10 h-10 rounded-full"
                alt="Profile"
              />
              {onlineUsers.includes(value.owner._id) && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-2">
              <p className="text-gray-800 font-medium">{value.owner.name}</p>
              <p className="text-gray-500 text-sm">{formatDate}</p>
            </div>
          </Link>
          {value.owner._id === user._id && (
            <button
              onClick={() => setShowModal(true)}
              className="text-gray-500 hover:bg-gray-100 p-1 rounded-full transition-all duration-200"
            >
              <BsThreeDotsVertical />
            </button>
          )}
        </div>

        {/* Post Caption */}
        <div className="mb-4">
          {showInput ? (
            <div className="flex items-center gap-2">
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                type="text"
                required
                className="w-2/3 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Caption"
              />
              <button
                onClick={updateCaption}
                disabled={captionLoading}
                className="text-sm bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-all duration-200 disabled:opacity-50"
              >
                {captionLoading ? <LoadingAnimation /> : "Update"}
              </button>
              <button
                onClick={() => setShowInput(false)}
                className="text-sm bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-all duration-200"
              >
                X
              </button>
            </div>
          ) : (
            <p className="text-gray-800">{value.caption}</p>
          )}
        </div>

        {/* Post Media */}
        <div className="mb-4">
          {type === "post" ? (
            <img
              src={value.post.url}
              className="object-cover rounded-md max-h-[300px] sm:max-h-[450px] w-full"
              alt="Post"
            />
          ) : (
            <video
              src={value.post.url}
              className="rounded-md max-h-[300px] sm:max-h-[450px] w-full"
              controls
            />
          )}
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            <span
              onClick={likeHandler}
              className="text-red-500 text-2xl cursor-pointer transition-all duration-200"
            >
              {isLike ? <IoHeartSharp /> : <IoHeartOutline />}
            </span>
            <span className="text-sm">{value.likes.length}</span>
          </div>
          <button
            onClick={() => setShow(!show)}
            className="flex items-center gap-2 text-sm hover:bg-gray-100 rounded-full px-2 py-1 transition-all duration-200"
          >
            <BsChatFill />
            <span>{value.comments.length} Comments</span>
          </button>
        </div>

        {/* Comments Section */}
        {show && (
          <form
            onSubmit={addCommentHandler}
            className="flex gap-3 items-center mb-4"
          >
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Comment"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600 transition-all duration-200"
            >
              Add
            </button>
          </form>
        )}

        {/* Comments List */}
        <hr className="my-2" />
        <p className="text-gray-800 font-medium mb-2">Comments</p>
        <div className="comments max-h-[200px] overflow-y-auto">
          {value.comments && value.comments.length > 0 ? (
            value.comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                user={user}
                owner={value.owner._id}
                id={value._id}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No Comments</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;

export const Comment = ({ comment, user, owner, id }) => {
  const { deleteComment } = PostData();

  const deleteCommentHandler = () => {
    deleteComment(id, comment._id);
  };
  return (
    <div className="flex items-center space-x-2 mt-2">
      <Link to={`/user/${comment.user._id}`}>
        <img
          src={comment.user.profilePic.url}
          className="w-8 h-8 rounded-full"
        />
      </Link>
      <div>
        <p className="text-gray-800 font-semibold">{comment.user.name}</p>
        <p className="text-gray-500 text-sm">{comment.comment}</p>
      </div>
      {owner === user._id ? (
        ""
      ) : (
        <>
          {comment.user._id === user._id && (
            <button className="text-red-500" onClick={deleteCommentHandler}>
              <MdDelete />
            </button>
          )}
        </>
      )}
      {owner === user._id && (
        <button className="text-red-500" onClick={deleteCommentHandler}>
          <MdDelete />
        </button>
      )}
    </div>
  );
};
