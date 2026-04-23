import React from 'react';
import { cn } from '../../utils/cn';

const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-white/5 text-text-secondary border-white/10',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
