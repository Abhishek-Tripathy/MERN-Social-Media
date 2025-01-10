import React from "react";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import { PostData } from "../context/PostContext";
import { Loading } from "../components/Loading";
import { motion } from "framer-motion";

function Home() {
  const { posts, loading } = PostData();
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
          {/* Add Post Section */}
          <motion.div
            className="w-full max-w-sm md:max-w-md mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AddPost type="post" />
          </motion.div>

          {/* Posts Section */}
          {posts && posts.length > 0 ? (
            <motion.div
              className="flex flex-col gap-4 w-full max-w-sm md:max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <PostCard type="post" value={post} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-gray-600 font-medium mt-6">No Posts Yet</p>
          )}
        </motion.div>
      )}
    </>
  );
}

export default Home;
