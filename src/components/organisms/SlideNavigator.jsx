import React from 'react';
      import PropTypes from 'prop-types';
      import Icon from '@/components/atoms/Icon';
      import Text from '@/components/atoms/Text';
      import Button from '@/components/atoms/Button';
      import SlideThumbnail from '@/components/molecules/SlideThumbnail';

      const SlideNavigator = ({ slides, currentSlideIndex, onSelectSlide, onAddSlide, onDeleteSlide }) => {
        return (
          <div className="w-64 border-r border-surface-200 dark:border-surface-700 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Text type="h3" className="font-medium text-surface-900 dark:text-white">Slides</Text>
              <Button
                onClick={onAddSlide}
                className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
              >
                <Icon name="Plus" size={16} className="text-surface-600 dark:text-surface-400" />
              </Button>
            </div>

            <div className="space-y-2">
              {slides.map((slide, index) => (
                <SlideThumbnail
                  key={slide.id}
                  slide={slide}
                  index={index}
                  isSelected={currentSlideIndex === index}
                  onClick={() => onSelectSlide(index)}
                  onDelete={onDeleteSlide}
                  totalSlides={slides.length}
                />
              ))}
            </div>
          </div>
        );
      };

      SlideNavigator.propTypes = {
        slides: PropTypes.array.isRequired,
        currentSlideIndex: PropTypes.number.isRequired,
        onSelectSlide: PropTypes.func.isRequired,
        onAddSlide: PropTypes.func.isRequired,
        onDeleteSlide: PropTypes.func.isRequired,
      };

      export default SlideNavigator;