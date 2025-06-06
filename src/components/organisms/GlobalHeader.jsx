import React from 'react';
      import PropTypes from 'prop-types';
      import Icon from '@/components/atoms/Icon';
      import Text from '@/components/atoms/Text';
      import Toggle from '@/components/atoms/Toggle';
      import HeaderActionButton from '@/components/molecules/HeaderActionButton';

      const GlobalHeader = ({ onCreatePresentation, darkMode, onToggleDarkMode }) => {
        return (
          <header className="glass bg-white/80 dark:bg-surface-900/80 border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                    <Icon name="Presentation" size={24} className="text-white" />
                  </div>
                  <Text type="h1" className="text-2xl font-heading font-bold text-surface-900 dark:text-white">
                    SlideForge
                  </Text>
                </div>

                <div className="flex items-center space-x-4">
                  <HeaderActionButton
                    onClick={onCreatePresentation}
                    iconName="Plus"
                    label="New Presentation"
                  />

                  <Toggle
                    isOn={darkMode}
                    onToggle={onToggleDarkMode}
                    onIcon="Sun"
                    offIcon="Moon"
                  />
                </div>
              </div>
            </div>
          </header>
        );
      };

      GlobalHeader.propTypes = {
        onCreatePresentation: PropTypes.func.isRequired,
        darkMode: PropTypes.bool.isRequired,
        onToggleDarkMode: PropTypes.func.isRequired,
      };

      export default GlobalHeader;