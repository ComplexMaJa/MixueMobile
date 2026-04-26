import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, onRightIconClick, type = 'text', className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-mixue-dark mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-mixue-gray">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`w-full bg-white border ${
              error ? 'border-mixue-red focus:ring-mixue-red' : 'border-gray-200 focus:ring-mixue-dark'
            } rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors ${
              leftIcon ? 'pl-10' : ''
            } ${(isPassword || rightIcon) ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {isPassword ? (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-mixue-gray hover:text-mixue-dark"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          ) : rightIcon ? (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-mixue-gray hover:text-mixue-dark"
              onClick={onRightIconClick}
            >
              {rightIcon}
            </button>
          ) : null}
        </div>
        {error && <p className="mt-1 text-xs text-mixue-red">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
