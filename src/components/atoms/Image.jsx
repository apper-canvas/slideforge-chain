import React from 'react';
      import PropTypes from 'prop-types';

      const Image = ({ src, alt, className = "", ...props }) => {
        return (
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${className}`}
            {...props}
          />
        );
      };

      Image.propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        className: PropTypes.string,
      };

      export default Image;