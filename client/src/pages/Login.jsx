import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext.jsx";
import { PostData } from "../context/PostContext.jsx";
import { motion } from "framer-motion";
import logo from "../assets/sample3.jpg"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginUser, loading } = UserData();
  const { fetchPosts } = PostData();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate, fetchPosts);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, type: "spring", stiffness: 100 },
    },
  };

  return (
    <>
      {loading ? (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center text-2xl font-semibold text-gray-600"
        >
          Loading...
        </motion.h1>
      ) : (
        <motion.div
          className="flex justify-center items-center min-h-screen bg-gray-50 px-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="flex flex-col-reverse md:flex-row shadow-lg rounded-lg overflow-hidden max-w-4xl w-full"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Left Section */}
            <motion.div
              className="flex-1 bg-white p-8 md:p-12"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                Welcome Back to VibeHive!
              </h1>
              <p className="text-center text-gray-600 mb-8">
                Login to your account and join the hive of amazing vibes.
              </p>

              <form onSubmit={onSubmitHandler} className="space-y-6">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                >
                  Login
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-indigo-500 font-semibold hover:underline"
                  >
                    Register Now
                  </Link>
                </p>
              </div>
            </motion.div>

            {/* Right Section */}
            <motion.div
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex flex-col justify-center items-center p-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Animated Icon */}
              <motion.img
                src={logo} // Replace with your actual icon path
                alt="VibeHive Icon"
                className="w-16 h-16 mb-4"
                variants={logoVariants}
                initial="hidden"
                animate="visible"
              />
              <h1 className="text-4xl font-bold mb-4">Join VibeHive!</h1>
              <p className="text-lg mb-8 text-center">
                Discover a community buzzing with energy and creativity. Stay
                connected, stay vibrant!
              </p>
              <Link
                to="/register"
                className="bg-white text-indigo-500 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300"
              >
                Register Now
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default Login;
