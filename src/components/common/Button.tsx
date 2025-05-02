import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'py-2 px-4 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200';
  const variantStyles = {
    primary: 'bg-burgundy-600 hover:bg-burgundy-700 text-white focus:ring-burgundy-500',
    secondary: 'bg-gold-400 hover:bg-gold-500 text-gray-900 focus:ring-gold-400',
    outline: 'border border-burgundy-600 text-burgundy-600 hover:bg-burgundy-50 focus:ring-burgundy-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;