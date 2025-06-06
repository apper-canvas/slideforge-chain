import React from 'react';
      import FeatureCard from '@/components/molecules/FeatureCard';
      import Text from '@/components/atoms/Text';

      const features = [
        {
          iconName: "Palette",
          title: "Customizable Themes",
          description: "Choose from a variety of professional themes and customize them to fit your brand.",
          linkText: "Explore Themes",
          linkHref: "#",
        },
        {
          iconName: "Sparkles",
          title: "AI-Powered Suggestions",
          description: "Leverage AI to get intelligent content and design suggestions for your slides. ",
          isComingSoon: true
        },
        {
          iconName: "Users",
          title: "Real-time Collaboration",
          description: "Work with your team members in real-time, no matter where they are.",
          isComingSoon: true
        },
        {
          iconName: "BarChart3",
          title: "Interactive Charts & Graphs",
          description: "Easily add dynamic and engaging charts to visualize your data.",
          isComingSoon: true
        },
      ];

      const FeatureSection = () => {
        return (
          <section className="py-12">
            <div className="text-center mb-12">
              <Text type="h2" className="text-4xl font-heading font-bold text-surface-900 dark:text-white mb-4">
                Unlock Your Presentation Potential
              </Text>
              <Text type="p" className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                Discover powerful features designed to make your presentations stand out and deliver impact.
              </Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </section>
        );
      };

      export default FeatureSection;