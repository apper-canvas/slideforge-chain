import React from 'react';
      import PropTypes from 'prop-types';

      const Loader = ({ message = "Loading...", className = "" }) => {
        return (
          <div className={`text-center ${className}`}>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-surface-600 dark:text-surface-400">{message}</p>
          </div>
        );
      };

      Loader.propTypes = {
        message: PropTypes.string,
        className: PropTypes.string,
      };

      export default Loader;