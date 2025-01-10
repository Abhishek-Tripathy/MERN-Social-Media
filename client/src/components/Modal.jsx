import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Modal = ({ value, title, setShow }) => {
  
  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-30"
>
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    className="bg-white rounded-lg shadow-xl w-[300px] max-h-[300px] overflow-y-auto"
  >
    {/* Header Section */}
    <div className="sticky top-0 bg-white p-4 border-b border-gradient-to-r from-blue-200 to-purple-200">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
          {title}
        </h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShow(false)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600"
        >
          &times;
        </motion.button>
      </div>
    </div>

    {/* Content Section */}
    <div className="p-4">
      <div className="flex flex-col space-y-3">
        {value && value.length > 0 ? (
          value.map((e, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
            >
              <Link
                to={`/user/${e._id}`}
                onClick={() => setShow(false)}
                className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 p-3 rounded-lg text-white flex items-center gap-4 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <span className="w-6 h-6 flex items-center justify-center bg-white bg-opacity-20 rounded-full">
                  {i + 1}
                </span>
                <img
                  className="w-8 h-8 rounded-full border-2 border-white"
                  src={e.profilePic.url}
                  alt={e.name}
                />
                <span className="flex-1">{e.name}</span>
              </Link>
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500"
          >
            No {title} yet
          </motion.p>
        )}
      </div>
    </div>
  </motion.div>
</motion.div>
  );
};

export default Modal;