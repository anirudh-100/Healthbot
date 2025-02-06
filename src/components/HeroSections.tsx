"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-6">
      <motion.h1
        className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        AI-Powered Healthcare Bot
      </motion.h1>
      <motion.p
        className="text-lg text-gray-300 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Revolutionizing healthcare with AI-driven insights and real-time fraud detection.
      </motion.p>
    </div>
  );
}
