import React from 'react';
      import PropTypes from 'prop-types';
      import Icon from '@/components/atoms/Icon';
      import Text from '@/components/atoms/Text';
      import Button from '@/components/atoms/Button';
      import PresentationCard from '@/components/molecules/PresentationCard';

      const PresentationGrid = ({ presentations, onDeletePresentation, onCreateFirstPresentation }) => {
        return (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <Text type="h3" className="text-2xl font-heading font-semibold text-surface-900 dark:text-white">
                Your Presentations
              </Text>
              <Text type="span" className="text-sm text-surface-500 dark:text-surface-400">
                {presentations.length} presentation{presentations.length !== 1 ? "s" : ""}
              </Text>
            </div>

            {presentations.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="FileText" size={32} className="text-surface-400" />
                </div>
                <Text type="h3" className="text-lg font-medium text-surface-900 dark:text-white mb-2">
                  No presentations yet
                </Text>
                <Text type="p" className="text-surface-500 dark:text-surface-400 mb-6">
                  Get started by creating your first presentation
                </Text>
                <Button
                  onClick={onCreateFirstPresentation}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
                >
                  <Icon name="Plus" size={16} />
                  <span>Create First Presentation</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {presentations.map((presentation) => (
                  <PresentationCard
                    key={presentation.id}
                    presentation={presentation}
                    onDelete={onDeletePresentation}
                  />
                ))}
              </div>
            )}
          </div>
        );
      };

      PresentationGrid.propTypes = {
        presentations: PropTypes.array.isRequired,
        onDeletePresentation: PropTypes.func.isRequired,
        onCreateFirstPresentation: PropTypes.func.isRequired,
      };

      export default PresentationGrid;