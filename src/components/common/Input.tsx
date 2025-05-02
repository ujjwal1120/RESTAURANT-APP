import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  fullWidth = false, 
  className = '', 
  id,
  ...props 
}) => {
  // Generate an ID based on the label if none is provided
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  
  const baseStyles = 'block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors';
  const errorStyles = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900 placeholder-red-300'
    : 'border-gray-300 focus:border-burgundy-500 focus:ring-burgundy-500';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`mb-4 ${widthStyles}`}>
      <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={inputId}
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;