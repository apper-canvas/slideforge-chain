import React from 'react';
      import PropTypes from 'prop-types';

      const Text = ({ children, type = "p", className = "", ...props }) => {
        const Tag = type;
        return (
          <Tag className={className} {...props}>
            {children}
          </Tag>
        );
      };

      Text.propTypes = {
        children: PropTypes.node.isRequired,
        type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div']),
        className: PropTypes.string,
      };

      export default Text;