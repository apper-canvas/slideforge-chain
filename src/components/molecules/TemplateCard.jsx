import React from 'react';
      import PropTypes from 'prop-types';
      import { motion } from 'framer-motion';
      import Icon from '@/components/atoms/Icon';
      import Text from '@/components/atoms/Text';
      import Image from '@/components/atoms/Image';

      const TemplateCard = ({ template, onClick }) => {
        return (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-surface-50 dark:bg-surface-700 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all"
            onClick={() => onClick(template)}
          >
            <div className="aspect-video">
              <Image
                src={template.preview}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <Text type="h4" className="font-medium text-surface-900 dark:text-white mb-1">
                {template.name}
              </Text>
              <Text type="p" className="text-sm text-surface-500 dark:text-surface-400">
                {template.description}
              </Text>
            </div>
          </motion.div>
        );
      };

      const BlankTemplateCard = ({ onClick }) => (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => onClick(null)}
        >
          <Icon name="Plus" size={32} className="text-surface-400 mb-3" />
          <Text type="h4" className="font-medium text-surface-900 dark:text-white mb-1">Blank Presentation</Text>
          <Text type="p" className="text-sm text-surface-500 text-center">Start from scratch</Text>
        </motion.div>
      );

      TemplateCard.propTypes = {
        template: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          preview: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        }).isRequired,
        onClick: PropTypes.func.isRequired,
      };

      BlankTemplateCard.propTypes = {
        onClick: PropTypes.func.isRequired,
      };

      export { TemplateCard, BlankTemplateCard };