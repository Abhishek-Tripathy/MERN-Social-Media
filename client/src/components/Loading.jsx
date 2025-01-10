import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 relative">
      {/* Pulsing Effect on Icon */}
      <motion.img
        src="/path-to-your-icon.png" // Replace with your actual icon path
        alt="VibeHive Logo"
        className="absolute top-1/2 transform -translate-y-1/2 w-24 h-24"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          repeatDelay: 1,
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
      {/* Spinner Animation */}
      <motion.div
        className="animate-spin rounded-full h-32 w-32 border-t-4 border-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />
    </div>
  );
};
 
 export const LoadingAnimation = () => {
   return (
     <div className="inline-block w-5 h-5 border-2 border-t-2 border-r-transparent border-red-500 rounded-full animate-spin"></div>
   );
 };