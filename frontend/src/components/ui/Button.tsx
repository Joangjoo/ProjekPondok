import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  ...props
}) => {
  const baseStyle = 'rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-blue-800 text-white hover:bg-blue-900 focus:ring-blue-500',
    secondary: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-400',
    outline: 'border border-teal-800 text-teal-800 hover:bg-teal-50 focus:ring-teal-400',
    ghost: 'text-green-800 hover:bg-green-50 focus:ring-green-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  
  const sizeStyles = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5'
  };
  
  const loadingClass = isLoading ? 'relative !text-transparent' : '';
  
  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${loadingClass} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {icon && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
      {children}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
    </button>
  );
};

export default Button;