import React from 'react';
import { cn } from '../../utils/cn';

const Input = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-text-secondary ml-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2.5 bg-bg-elevated border border-border-subtle rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200',
          error && 'border-rose-500/50 focus:ring-rose-500/20 focus:border-rose-500',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-rose-500 ml-1">{error}</span>}
    </div>
  );
};

export default Input;
