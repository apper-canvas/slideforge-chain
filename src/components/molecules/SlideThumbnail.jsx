import React from 'react';
      import PropTypes from 'prop-types';
      import Button from '@/components/atoms/Button';
      import Icon from '@/components/atoms/Icon';
      import Text from '@/components/atoms/Text';

      const SlideThumbnail = ({ slide, index, isSelected, onClick, onDelete, totalSlides }) => {
        return (
          <div
            className={`relative group cursor-pointer p-3 rounded-lg border-2 transition-all ${
              isSelected
                ? "border-primary bg-primary/5"
                : "border-surface-200 dark:border-surface-600 hover:border-surface-300 dark:hover:border-surface-500"
            }`}
            onClick={onClick}
          >
            <div className="aspect-video bg-surface-50 dark:bg-surface-700 rounded mb-2 flex items-center justify-center">
              <Text type="span" className="text-xs text-surface-500">Slide {index + 1}</Text>
            </div>

            {totalSlides > 1 && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(index);
                }}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1 bg-red-500 hover:bg-red-600 text-white rounded transition-all"
              >
                <Icon name="Trash2" size={12} />
              </Button>
            )}
          </div>
        );
      };

      SlideThumbnail.propTypes = {
        slide: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        isSelected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        totalSlides: PropTypes.number.isRequired,
      };

      export default SlideThumbnail;