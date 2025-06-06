import React from 'react';
      import PropTypes from 'prop-types';
      import Button from '@/components/atoms/Button';
      import Icon from '@/components/atoms/Icon';

      const HeaderActionButton = ({ onClick, iconName, label, className = "" }) => {
        return (
          <Button
            onClick={onClick}
            className={`bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${className}`}
          >
            <Icon name={iconName} size={16} />
            <span>{label}</span>
          </Button>
        );
      };

      HeaderActionButton.propTypes = {
        onClick: PropTypes.func.isRequired,
        iconName: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
      };

      export default HeaderActionButton;