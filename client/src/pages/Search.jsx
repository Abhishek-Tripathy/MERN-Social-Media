import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  async function fetchUsers() {
    if (search.length > 0) {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/user/all?search=" + search);

        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }else{
      toast.error("Field is empty")
    }
  }
  return (
    <div className="bg-gradient-to-b from-blue-200 via-purple-300 to-blue-100 min-h-screen flex justify-center items-center p-4">
      <motion.div
        className="flex flex-col items-center gap-5 w-full max-w-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Search Input and Button */}
        <motion.div
          className="search flex flex-col md:flex-row justify-between items-center gap-3 w-full"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            className="custom-input w-full px-4 py-2 m-auto rounded-md border border-gray-400 focus:border-blue-500"
            placeholder="Enter Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <motion.button
            onClick={fetchUsers}
            className="bg-blue-500 m-auto text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Search
          </motion.button>
        </motion.div>

        {/* User List */}
        {loading ? (
          <LoadingAnimation />
        ) : (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {users && users.length > 0 ? (
              users.map((user) => (
                <Link
                  key={user._id}
                  to={`/user/${user._id}`}
                  className="flex items-center  gap-3 bg-white p-3 rounded-md shadow-sm mt-3 hover:bg-blue-100 transition-all"
                >
                  <img
                    src={user.profilePic.url}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-gray-800 font-semibold">{user.name}</p>
                </Link>
              ))
            ) : (
              <p className="text-gray-700 text-center mt-5">
                No User, please Search
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Search;
