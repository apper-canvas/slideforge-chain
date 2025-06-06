import React from 'react';
      import PropTypes from 'prop-types';

      const Button = ({ children, onClick, className = "", disabled = false, type = "button", ...props }) => {
        return (
          <button
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center transition-colors duration-200 ${className}`}
            disabled={disabled}
            {...props}
          >
            {children}
          </button>
        );
      };

      Button.propTypes = {
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        type: PropTypes.oneOf(['button', 'submit', 'reset']),
      };

      export default Button;