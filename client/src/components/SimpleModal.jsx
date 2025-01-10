import React from "react";
import { motion } from "framer-motion";

function SimpleModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
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
        className="bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-xl w-full max-w-md mx-4"
      >
        {/* Header with gradient border */}
        <div className="p-4 border-b border-gradient-to-r from-blue-200 to-purple-200">
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600"
            >
              &times;
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col space-y-3">{children}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SimpleModal;
