import React, { useState } from "react";
import AddPost from "../components/AddPost";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowUp, FaArrowDownLong } from "react-icons/fa6";
import { Loading } from "../components/Loading";
import { motion } from "framer-motion";

function Reels() {
  const { reels, loading } = PostData();
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
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          className="min-h-screen bg-gradient-to-b from-blue-200 via-purple-300 to-blue-100 flex flex-col items-center py-6 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Add Reel Section */}
          <motion.div
            className="w-full max-w-sm md:max-w-md mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AddPost type="reel" />
          </motion.div>

          {/* Reel Display Section */}
          <div className="flex flex-col items-center gap-6 w-[90%] max-w-md">
            {reels && reels.length > 0 ? (
              <motion.div
                className="w-full"
                key={reels[index]._id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <PostCard value={reels[index]} type="reel" />
              </motion.div>
            ) : (
              <p className="text-gray-600 font-medium">No reels</p>
            )}

            {/* Navigation Buttons */}
            <motion.div
              className="button flex justify-center items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {index !== 0 && (
                <button
                  onClick={prevReel}
                  className="bg-gray-500 mb-9 text-white py-3 px-6 rounded-full flex items-center justify-center"
                >
                  <FaArrowUp />
                </button>
              )}
              {index !== reels.length - 1 && (
                <button
                  onClick={nextReel}
                  className="bg-gray-500 mb-9 text-white py-3 px-6 rounded-full flex items-center justify-center"
                >
                  <FaArrowDownLong />
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Reels;
