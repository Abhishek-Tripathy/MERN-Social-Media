import React, { useState } from "react";
import { PostData } from "../context/PostContext";
import { LoadingAnimation } from "./Loading";
import { motion } from "framer-motion";

function AddPost({ type }) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const { addPost, addLoading } = PostData();

  const changeFileHandler = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("file", file);
    addPost(formData, setFile, setCaption, setFilePrev, type);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg mx-auto">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 items-center mb-4"
      >
        {/* Caption Input */}
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          type="text"
          className="custom-input w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter caption"
          required
        />

        {/* File Input */}
        <input
          onChange={changeFileHandler}
          type="file"
          className="custom-input w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          accept={type === "post" ? "image/*" : "video/*"}
          required
        />

        {/* Preview */}
        {filePrev && (
          <>
            {type === "post" ? (
              <img
                src={filePrev}
                alt="file preview"
                className="w-full h-auto max-h-[300px] sm:max-h-[450px] rounded-lg mt-4"
              />
            ) : (
              <video
                controls
                controlsList="nodownload"
                src={filePrev}
                className="w-full sm:w-[300px] h-auto max-h-[300px] sm:max-h-[450px] mt-4 rounded-lg"
              />
            )}
          </>
        )}

        {/* Submit Button */}
        <button
          disabled={addLoading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold mt-4 text-sm sm:text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addLoading ? <LoadingAnimation /> : "+ Add Post"}
        </button>
      </form>
    </div>
  );
}

export default AddPost;
