import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout component that includes Navbar and Footer
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.title - Page title for navbar
 * @param {Array} props.navLinks - Navigation links
 * @param {Array} props.footerLinks - Footer links
 * @param {Array} props.socialLinks - Social media links
 * @param {function} props.onToggleTheme - Theme toggle handler
 * @param {boolean} props.isDarkMode - Current theme state
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Layout component
 */
const Layout = ({ 
  children, 
  title,
  navLinks,
  footerLinks,
  socialLinks,
  className = '' 
}) => {
  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 ${className}`}>
      {/* Navbar */}
      <Navbar 
        title={title}
        links={navLinks}
      />
      
      {/* Main Content */}
      <main className="flex-grow relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/5 dark:via-purple-600/5 dark:to-pink-600/5"></div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <Footer 
        links={footerLinks}
        socialLinks={socialLinks}
      />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  footerLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
};

export default Layout;
