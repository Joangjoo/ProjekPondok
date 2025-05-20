import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  const id = props.id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`
            block w-full rounded-md shadow-sm
            ${icon ? 'pl-10' : 'pl-4'}
            py-2 pr-4
            border ${error ? 'border-red-500' : 'border-gray-300'}
            focus:ring-2 focus:ring-green-500 focus:border-green-500
            transition-colors duration-200
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;