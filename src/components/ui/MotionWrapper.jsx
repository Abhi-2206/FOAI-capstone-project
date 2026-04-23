import React from 'react';
import { motion } from 'framer-motion';

export const MotionContainer = ({ children, delay = 0, className }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const MotionItem = ({ children, className }) => {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 10
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
