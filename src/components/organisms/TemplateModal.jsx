import React from 'react';
      import PropTypes from 'prop-types';
      import { motion, AnimatePresence } from 'framer-motion';
      import Icon from '@/components/atoms/Icon';
      import Text from '@/components/atoms/Text';
      import Button from '@/components/atoms/Button';
      import { TemplateCard, BlankTemplateCard } from '@/components/molecules/TemplateCard';

      const templates = [
        {
          id: "corporate",
          name: "Corporate Professional",
          preview: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop",
          description: "Clean corporate design for business presentations"
        },
        {
          id: "ai-tech",
          name: "AI & Technology",
          preview: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop",
          description: "Modern design perfect for AI and tech presentations"
        },
        {
          id: "data-analytics",
          name: "Data Analytics",
          preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
          description: "Professional template for data-driven presentations"
        }
      ];

      const TemplateModal = ({ show, onClose, onSelectTemplate }) => {
        return (
          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={onClose}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <Text type="h3" className="text-2xl font-heading font-bold text-surface-900 dark:text-white">
                      Choose a Template
                    </Text>
                    <Button
                      onClick={onClose}
                      className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                    >
                      <Icon name="X" size={20} className="text-surface-500" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <BlankTemplateCard onClick={onSelectTemplate} />
                    {templates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        onClick={onSelectTemplate}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      };

      TemplateModal.propTypes = {
        show: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        onSelectTemplate: PropTypes.func.isRequired,
      };

      export default TemplateModal;