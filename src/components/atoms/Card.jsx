import React from 'react';
      import PropTypes from 'prop-types';

      const Card = ({ children, className = "", onClick, ...props }) => {
        return (
          <div
            className={`bg-white dark:bg-surface-800 rounded-xl shadow-card transition-all duration-300 ${className}`}
            onClick={onClick}
            {...props}
          >
            {children}
          </div>
        );
      };

      Card.propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        onClick: PropTypes.func,
      };

      export default Card;