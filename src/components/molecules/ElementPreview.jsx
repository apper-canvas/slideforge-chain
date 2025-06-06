import React from 'react';
      import PropTypes from 'prop-types';
      import Icon from '@/components/atoms/Icon';
      import Image from '@/components/atoms/Image';

      const ElementPreview = ({ element, isEditing, onEdit, onBlur, className = "", ...props }) => {
        const { type, content, style } = element;

        const baseStyles = {
          left: `${element.position.x}%`,
          top: `${element.position.y}%`,
          transform: "translate(-50%, -50%)",
          ...style
        };

        const editStyles = isEditing ? "ring-2 ring-primary/50 rounded" : "hover:ring-2 hover:ring-primary/50 rounded";

        return (
          <div
            className={`absolute cursor-pointer ${editStyles} ${className}`}
            style={baseStyles}
            onClick={onEdit}
            {...props}
          >
            {type === "text" && (
              <div
                className="presentation-text min-w-[100px] min-h-[30px] p-2"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={onBlur}
                style={style}
              >
                {content}
              </div>
            )}
            {type === "image" && (
              <Image
                src={content || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop"}
                alt="Slide content"
                className="max-w-[200px] max-h-[150px] object-cover rounded"
              />
            )}
            {type === "shape" && (
              <div
                style={{
                  width: style.width || "100px",
                  height: style.height || "100px",
                  backgroundColor: style.backgroundColor || "#3b82f6",
                  borderRadius: "8px"
                }}
              />
            )}
            {type === "chart" && (
              <div className="w-64 h-48 bg-surface-100 dark:bg-surface-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Icon name="BarChart3" size={32} className="text-surface-400 mx-auto mb-2" />
                  <p className="text-sm text-surface-500">Chart Placeholder</p>
                </div>
              </div>
            )}
          </div>
        );
      };

      ElementPreview.propTypes = {
        element: PropTypes.shape({
          id: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
          position: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
          }).isRequired,
          style: PropTypes.object,
        }).isRequired,
        isEditing: PropTypes.bool,
        onEdit: PropTypes.func,
        onBlur: PropTypes.func,
        className: PropTypes.string,
      };

      export default ElementPreview;