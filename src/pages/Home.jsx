import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import MainFeature from "../components/MainFeature";
import ApperIcon from "../components/ApperIcon";
import presentationService from "../services/api/presentationService";

const Home = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-surface-600 dark:text-surface-400">Loading presentations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass bg-white/80 dark:bg-surface-900/80 border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                <ApperIcon name="Presentation" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-surface-900 dark:text-white">
                SlideForge
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowTemplates(true)}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <ApperIcon name="Plus" size={16} />
                <span>New Presentation</span>
              </button>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name={darkMode ? "Sun" : "Moon"} size={20} className="text-surface-600 dark:text-surface-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
            Error: {error}
          </div>
        )}

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-surface-900 dark:text-white mb-4">
            Create Stunning Presentations
          </h2>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Professional presentation builder with AI-themed templates and real-time collaboration features
          </p>
        </div>

        {/* Presentations Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-heading font-semibold text-surface-900 dark:text-white">
              Your Presentations
            </h3>
            <span className="text-sm text-surface-500 dark:text-surface-400">
              {presentations.length} presentation{presentations.length !== 1 ? "s" : ""}
            </span>
          </div>

          {presentations.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="FileText" size={32} className="text-surface-400" />
              </div>
              <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">
                No presentations yet
              </h3>
              <p className="text-surface-500 dark:text-surface-400 mb-6">
                Get started by creating your first presentation
              </p>
              <button
                onClick={() => setShowTemplates(true)}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
              >
                <ApperIcon name="Plus" size={16} />
                <span>Create First Presentation</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {presentations.map((presentation) => (
                <motion.div
                  key={presentation.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-surface-800 rounded-xl shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 p-6 flex items-center justify-center">
                    <div className="presentation-text text-center">
                      <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                        {presentation.title}
                      </h4>
                      <p className="text-sm text-surface-500 dark:text-surface-400">
                        {presentation.slides?.length || 0} slide{(presentation.slides?.length || 0) !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-surface-500 dark:text-surface-400 capitalize">
                        {presentation.theme} Theme
                      </span>
                      <button
                        onClick={() => handleDeletePresentation(presentation.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500 transition-all"
                      >
                        <ApperIcon name="Trash2" size={14} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-surface-400 dark:text-surface-500">
                        {new Date(presentation.updatedAt).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-1">
                        <button className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
                          <ApperIcon name="Edit" size={14} className="text-surface-600 dark:text-surface-400" />
                        </button>
                        <button className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
                          <ApperIcon name="Play" size={14} className="text-surface-600 dark:text-surface-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Main Feature */}
        <MainFeature />
      </main>

      {/* Template Modal */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-heading font-bold text-surface-900 dark:text-white">
                  Choose a Template
                </h3>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <ApperIcon name="X" size={20} className="text-surface-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleCreatePresentation()}
                >
                  <ApperIcon name="Plus" size={32} className="text-surface-400 mb-3" />
                  <h4 className="font-medium text-surface-900 dark:text-white mb-1">Blank Presentation</h4>
                  <p className="text-sm text-surface-500 text-center">Start from scratch</p>
                </motion.div>

                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-surface-50 dark:bg-surface-700 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => handleCreatePresentation(template)}
                  >
                    <div className="aspect-video">
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-surface-900 dark:text-white mb-1">
                        {template.name}
                      </h4>
                      <p className="text-sm text-surface-500 dark:text-surface-400">
                        {template.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;