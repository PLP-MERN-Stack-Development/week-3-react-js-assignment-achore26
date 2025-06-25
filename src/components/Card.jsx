import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component for displaying content in a boxed layout
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Card subtitle
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.shadow - Whether to show shadow
 * @param {boolean} props.hover - Whether to show hover effect
 * @param {function} props.onClick - Click handler function
 * @returns {JSX.Element} - Card component
 */
const Card = ({ 
  children, 
  title, 
  subtitle, 
  className = '', 
  shadow = true, 
  hover = false, 
  onClick,
  ...rest 
}) => {
  // Base classes with border
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700';
  
  // Shadow classes
  const shadowClasses = shadow ? 'shadow-md dark:shadow-gray-900/10' : '';
  
  // Hover classes with enhanced animations
  const hoverClasses = hover ? 'hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600' : 'transition-all duration-200';
  
  // Cursor classes
  const cursorClasses = onClick ? 'cursor-pointer' : '';
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${shadowClasses} ${hoverClasses} ${cursorClasses} ${className}`;
  
  return (
    <div
      className={cardClasses}
      onClick={onClick}
      {...rest}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  shadow: PropTypes.bool,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
