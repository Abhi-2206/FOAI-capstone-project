import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Button = ({ children, className, variant = 'primary', isLoading, ...props }) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'bg-transparent hover:bg-white/5 text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-lg transition-colors',
    danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg border border-red-500/20 transition-all',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative overflow-hidden font-medium disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      <span className={cn(isLoading && 'invisible')}>{children}</span>
    </motion.button>
  );
};

export default Button;
