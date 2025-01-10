import { motion } from "framer-motion";
import { UserData } from "../context/UserContext";

const TopNavbar = () => {
  const {logoutUser} = UserData()

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white md:bg-transparent sm:bg-white shadow-md md:shadow-none`}
    >
      <div className="mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 md:h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-800 bg-clip-text text-transparent">
              VibeHive
            </span>
          </motion.div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logoutUser}
              className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-md bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopNavbar;
