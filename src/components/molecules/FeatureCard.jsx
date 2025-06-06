import React from 'react';
      import PropTypes from 'prop-types';
      import { motion } from 'framer-motion';
      import Icon from '@/components/atoms/Icon';
      import Text from '@/components/atoms/Text';
      import Card from '@/components/atoms/Card';

      const FeatureCard = ({ iconName, title, description, linkText, linkHref, isComingSoon }) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 flex flex-col items-start h-full">
              <div className="mb-4 bg-primary/10 text-primary p-3 rounded-xl">
                <Icon name={iconName} size={24} />
              </div>
              <Text type="h3" className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                {title}
              </Text>
              <Text type="p" className="text-surface-600 dark:text-surface-400 mb-4 flex-1">
                {description}
              </Text>
              {isComingSoon ? (
                <Text type="span" className="text-xs text-primary-dark font-medium px-2 py-1 rounded-full bg-primary/10">
                  Coming Soon
                </Text>
              ) : (
                <a
                  href={linkHref}
                  className="text-primary hover:text-primary-dark flex items-center space-x-1 text-sm font-medium"
                >
                  <span>{linkText}</span>
                  <Icon name="ArrowRight" size={16} />
                </a>
              )}
            </Card>
          </motion.div>
        );
      };

      FeatureCard.propTypes = {
        iconName: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        linkText: PropTypes.string,
        linkHref: PropTypes.string,
        isComingSoon: PropTypes.bool,
      };

      export default FeatureCard;