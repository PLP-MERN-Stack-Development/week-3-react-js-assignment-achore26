import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button component with different variants
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, danger)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Button content
 * @returns {JSX.Element} - Button component
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  children,
  className = '',
  ...rest 
}) => {
  // Base classes with better focus handling and animations
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105 active:scale-95';
  
  // Variant classes with dark mode support and better hover effects
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:hover:shadow-blue-500/25',
    secondary: 'bg-gray-200 hover:bg-gray-300 hover:shadow-md text-gray-800 focus:ring-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white dark:hover:shadow-gray-500/25',
    danger: 'bg-red-600 hover:bg-red-700 hover:shadow-lg text-white focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:hover:shadow-red-500/25',
    success: 'bg-green-600 hover:bg-green-700 hover:shadow-lg text-white focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 dark:hover:shadow-green-500/25',
    warning: 'bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg text-white focus:ring-yellow-500 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:hover:shadow-yellow-500/25',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none' : 'cursor-pointer';
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${disabledClasses} ${className}`;
  
  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button; 