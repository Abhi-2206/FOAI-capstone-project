import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);


  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative w-16 h-9 rounded-full bg-border-subtle p-1.5 transition-all duration-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 group"
      aria-label="Toggle Theme"
    >
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 dark:bg-brand-primary bg-amber-500 transition-opacity" />

      <motion.div
        initial={false}
        animate={{
          x: isDark ? 28 : 0,
          rotate: isDark ? 0 : 180
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
        className="relative z-10 w-6 h-6 rounded-full bg-bg-card shadow-xl flex items-center justify-center text-text-primary overflow-hidden border border-border-subtle"
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={14} className="text-indigo-400" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={14} className="text-amber-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
