import React from 'react';
      import PropTypes from 'prop-types';
      import Button from '@/components/atoms/Button';
      import Icon from '@/components/atoms/Icon';
      import Text from '@/components/atoms/Text';

      const tools = [
        { id: "text", icon: "Type", label: "Text" },
        { id: "image", icon: "Image", label: "Image" },
        { id: "chart", icon: "BarChart3", label: "Chart" },
        { id: "shape", icon: "Square", label: "Shape" }
      ];

      const Toolbar = ({ onAddElement, onSelectTool, selectedTool }) => {
        return (
          <div className="border-b border-surface-200 dark:border-surface-700 p-4">
            <div className="flex items-center space-x-4">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.id);
                    onAddElement(tool.id);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    selectedTool === tool.id
                      ? "bg-primary text-white"
                      : "bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300"
                  }`}
                >
                  <Icon name={tool.icon} size={16} />
                  <Text type="span" className="text-sm">{tool.label}</Text>
                </Button>
              ))}
            </div>
          </div>
        );
      };

      Toolbar.propTypes = {
        onAddElement: PropTypes.func.isRequired,
        onSelectTool: PropTypes.func.isRequired,
        selectedTool: PropTypes.string.isRequired,
      };

      export default Toolbar;