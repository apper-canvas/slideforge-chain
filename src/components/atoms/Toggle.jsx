import React from 'react';
      import PropTypes from 'prop-types';
      import Button from './Button';
      import Icon from './Icon';

      const Toggle = ({ isOn, onToggle, onIcon, offIcon, iconSize = 20, className = "" }) => {
        return (
          <Button
            onClick={onToggle}
            className={`p-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors ${className}`}
          >
            <Icon name={isOn ? onIcon : offIcon} size={iconSize} className="text-surface-600 dark:text-surface-400" />
          </Button>
        );
      };

      Toggle.propTypes = {
        isOn: PropTypes.bool.isRequired,
        onToggle: PropTypes.func.isRequired,
        onIcon: PropTypes.string.isRequired,
        offIcon: PropTypes.string.isRequired,
        iconSize: PropTypes.number,
        className: PropTypes.string,
      };

      export default Toggle;