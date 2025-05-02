import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
  fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  // Generate an ID based on the label if none is provided
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
  
  const baseStyles = 'block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors appearance-none bg-white';
  const errorStyles = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900'
    : 'border-gray-300 focus:border-burgundy-500 focus:ring-burgundy-500';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`mb-4 ${widthStyles}`}>
      <label htmlFor={selectId} className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          className={`${baseStyles} ${errorStyles} ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select;