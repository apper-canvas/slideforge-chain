import React from 'react';
      import PropTypes from 'prop-types';
      import { motion } from 'framer-motion';
      import Card from '@/components/atoms/Card';
      import Text from '@/components/atoms/Text';
      import Button from '@/components/atoms/Button';
      import Icon from '@/components/atoms/Icon';

      const PresentationCard = ({ presentation, onDelete }) => {
        return (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="group"
          >
            <Card className="hover:shadow-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 p-6 flex items-center justify-center">
                <div className="presentation-text text-center">
                  <Text type="h4" className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                    {presentation.title}
                  </Text>
                  <Text type="p" className="text-sm text-surface-500 dark:text-surface-400">
                    {presentation.slides?.length || 0} slide{(presentation.slides?.length || 0) !== 1 ? "s" : ""}
                  </Text>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Text type="span" className="text-xs text-surface-500 dark:text-surface-400 capitalize">
                    {presentation.theme} Theme
                  </Text>
                  <Button
                    onClick={() => onDelete(presentation.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500 transition-all"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Text type="span" className="text-xs text-surface-400 dark:text-surface-500">
                    {new Date(presentation.updatedAt).toLocaleDateString()}
                  </Text>
                  <div className="flex space-x-1">
                    <Button className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
                      <Icon name="Edit" size={14} className="text-surface-600 dark:text-surface-400" />
                    </Button>
                    <Button className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
                      <Icon name="Play" size={14} className="text-surface-600 dark:text-surface-400" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      };

      PresentationCard.propTypes = {
        presentation: PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          slides: PropTypes.array,
          theme: PropTypes.string,
          updatedAt: PropTypes.string.isRequired,
        }).isRequired,
        onDelete: PropTypes.func.isRequired,
      };

      export default PresentationCard;