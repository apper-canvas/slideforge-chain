import { useState, useEffect } from "react";
      import { toast } from "react-toastify";
      import presentationService from "@/services/api/presentationService";
      import GlobalHeader from "@/components/organisms/GlobalHeader";
      import PresentationGrid from "@/components/organisms/PresentationGrid";
      import FeatureSection from "@/components/organisms/FeatureSection";
      import TemplateModal from "@/components/organisms/TemplateModal";
      import Loader from "@/components/atoms/Loader";
      import Text from "@/components/atoms/Text";

      const HomePage = () => {
        const [presentations, setPresentations] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [darkMode, setDarkMode] = useState(false);
        const [showTemplates, setShowTemplates] = useState(false);

        useEffect(() => {
          const loadPresentations = async () => {
            setLoading(true);
            try {
              const result = await presentationService.getAll();
              setPresentations(result || []);
            } catch (err) {
              setError(err.message);
              toast.error("Failed to load presentations");
            } finally {
              setLoading(false);
            }
          };
          loadPresentations();
        }, []);

        useEffect(() => {
          if (darkMode) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }, [darkMode]);

        const handleCreatePresentation = async (template) => {
          try {
            const newPresentation = {
              title: `New Presentation ${presentations.length + 1}`,
              theme: template?.id || "default",
              slides: template?.slides || [
                {
                  id: Date.now().toString(),
                  order: 1,
                  layout: "title",
                  elements: [
                    {
                      id: "title",
                      type: "text",
                      content: "New Presentation",
                      position: { x: 50, y: 40 },
                      style: { fontSize: "32px", fontWeight: "bold" }
                    }
                  ],
                  transitions: {},
                  notes: ""
                }
              ],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };

            const created = await presentationService.create(newPresentation);
            setPresentations(prev => [...prev, created]);
            setShowTemplates(false);
            toast.success("Presentation created successfully!");
          } catch (err) {
            toast.error("Failed to create presentation");
          }
        };

        const handleDeletePresentation = async (id) => {
          try {
            await presentationService.delete(id);
            setPresentations(prev => prev.filter(p => p.id !== id));
            toast.success("Presentation deleted successfully!");
          } catch (err) {
            toast.error("Failed to delete presentation");
          }
        };

        if (loading) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <Loader message="Loading presentations..." />
            </div>
          );
        }

        return (
          <div className="min-h-screen">
            <GlobalHeader
              onCreatePresentation={() => setShowTemplates(true)}
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode(!darkMode)}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                  Error: {error}
                </div>
              )}

              {/* Welcome Section */}
              <div className="text-center mb-12">
                <Text type="h2" className="text-4xl font-heading font-bold text-surface-900 dark:text-white mb-4">
                  Create Stunning Presentations
                </Text>
                <Text type="p" className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
                  Professional presentation builder with AI-themed templates and real-time collaboration features
                </Text>
              </div>

              <PresentationGrid
                presentations={presentations}
                onDeletePresentation={handleDeletePresentation}
                onCreateFirstPresentation={() => setShowTemplates(true)}
              />

              <FeatureSection />
            </main>

            <TemplateModal
              show={showTemplates}
              onClose={() => setShowTemplates(false)}
              onSelectTemplate={handleCreatePresentation}
            />
          </div>
        );
      };

      export default HomePage;