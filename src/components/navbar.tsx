'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiSettings, FiUser, FiBell, FiLogOut, FiLogIn, FiMessageSquare } from 'react-icons/fi';
import { useRouter } from 'next/navigation'; // For client-side navigation in Next.js
import { FC, MouseEventHandler } from 'react';
import Chat from '@/components/chat'; // Import Chatbot Component

// Define Navbar Icon Props<AiOutlineLogout />
interface NavbarIconProps {
  Icon: FC<any>;
  text: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

// NavbarIcon Component
const NavbarIcon: FC<NavbarIconProps> = ({ Icon, text, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="group flex items-center space-x-6 p-4 text-white text-lg cursor-pointer hover:bg-gray-700 rounded-xl transition-all relative w-52 shadow-md hover:shadow-2xl hover:scale-105"
      whileHover={{ scale: 1.1 }}
    >
      <Icon className="text-3xl transition-all group-hover:text-blue-400" />
      <span className="absolute left-16 bg-gray-800 text-white px-3 py-1 text-sm rounded-md opacity-0 transition-opacity group-hover:opacity-100">
        {text}
      </span>
    </motion.div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage auth state
  const router = useRouter();

  useEffect(() => {
    // Simulating user authentication check
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className="w-full py-4 px-8 flex justify-between items-center fixed top-0 left-0 z-50 bg-black/20 backdrop-blur-md shadow-xl border-b border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-3xl focus:outline-none hover:scale-125 transition-all"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navbar Title */}
        <motion.h1
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-lg animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          HealthBot
        </motion.h1>

        {/* Chatbot Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="text-white text-3xl focus:outline-none hover:scale-125 transition-all"
        >
          <FiMessageSquare />
        </button>
      </motion.nav>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed top-0 left-0 h-full w-72 bg-gray-900 bg-opacity-90 backdrop-blur-lg shadow-2xl flex flex-col items-center pt-24 space-y-10 border-r border-white/10"
          >
            <NavbarIcon Icon={FiHome} text="Dashboard" onClick={() => router.push('/dashboard')} />
            <NavbarIcon Icon={FiUser} text="Profile" onClick={() => router.push('/profile')} />
            <NavbarIcon Icon={FiSettings} text="Settings" onClick={() => router.push('/settings')} />
            <NavbarIcon Icon={FiBell} text="Notifications" onClick={() => router.push('/notifications')} />
            {isAuthenticated ? (
              <NavbarIcon Icon={FiLogOut} text="Logout" onClick={handleLogout} />
            ) : (
              <>
                <NavbarIcon Icon={FiLogIn} text="Login" onClick={() => router.push('/login')} />
                <NavbarIcon Icon={FiLogIn} text="Sign Up" onClick={() => router.push('/signup')} />
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Chatbot Popup */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-10 right-10 bg-white shadow-xl border border-gray-200 rounded-lg w-96"
          >
            <Chat />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
