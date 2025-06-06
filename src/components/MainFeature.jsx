import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "./ApperIcon";
import slideService from "../services/api/slideService";

const MainFeature = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);
  const [editingElement, setEditingElement] = useState(null);
  const [selectedTool, setSelectedTool] = useState("text");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadSlides = async () => {
      setLoading(true);
      try {
        const result = await slideService.getAll();
        setSlides(result || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadSlides();
  }, []);

  const addSlide = async () => {
    try {
      const newSlide = {
        order: slides.length + 1,
        layout: "blank",
        elements: [],
        transitions: { type: "fade", duration: 0.5 },
        notes: ""
      };

      const created = await slideService.create(newSlide);
      setSlides(prev => [...prev, created]);
      setCurrentSlide(slides.length);
      toast.success("Slide added successfully!");
    } catch (err) {
      toast.error("Failed to add slide");
    }
  };

  const deleteSlide = async (index) => {
    if (slides.length <= 1) {
      toast.error("Cannot delete the last slide");
      return;
    }

    try {
      const slideToDelete = slides[index];
      await slideService.delete(slideToDelete.id);
      
      const updatedSlides = slides.filter((_, i) => i !== index);
      setSlides(updatedSlides);
      
      if (currentSlide >= updatedSlides.length) {
        setCurrentSlide(Math.max(0, updatedSlides.length - 1));
      }
      
      toast.success("Slide deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete slide");
    }
  };

  const addElement = async (type) => {
    if (!slides[currentSlide]) return;

    const newElement = {
      id: Date.now().toString(),
      type,
      content: type === "text" ? "Click to edit text" : type === "chart" ? { type: "bar", data: [] } : "",
      position: { x: 50, y: 50 },
      style: {
        fontSize: type === "text" ? "16px" : undefined,
        fontWeight: type === "text" ? "normal" : undefined,
        color: type === "text" ? "#1e293b" : undefined,
        width: type === "shape" ? "100px" : undefined,
        height: type === "shape" ? "100px" : undefined,
        backgroundColor: type === "shape" ? "#3b82f6" : undefined
      }
    };

    try {
      const updatedSlide = {
        ...slides[currentSlide],
        elements: [...(slides[currentSlide].elements || []), newElement]
      };

      await slideService.update(slides[currentSlide].id, updatedSlide);
      
      setSlides(prev => prev.map((slide, index) => 
        index === currentSlide ? updatedSlide : slide
      ));
      
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} element added!`);
    } catch (err) {
      toast.error("Failed to add element");
    }
  };

  const updateElement = async (elementId, updates) => {
    if (!slides[currentSlide]) return;

    try {
      const updatedElements = slides[currentSlide].elements.map(el =>
        el.id === elementId ? { ...el, ...updates } : el
      );

      const updatedSlide = {
        ...slides[currentSlide],
        elements: updatedElements
      };

      await slideService.update(slides[currentSlide].id, updatedSlide);
      
      setSlides(prev => prev.map((slide, index) => 
        index === currentSlide ? updatedSlide : slide
      ));
    } catch (err) {
      toast.error("Failed to update element");
    }
  };

  const tools = [
    { id: "text", icon: "Type", label: "Text" },
    { id: "image", icon: "Image", label: "Image" },
    { id: "chart", icon: "BarChart3", label: "Chart" },
    { id: "shape", icon: "Square", label: "Shape" }
  ];

  const currentSlideData = slides[currentSlide] || { elements: [] };

  if (loading) {
    return (
      <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-surface-600 dark:text-surface-400">Loading slide editor...</p>
        </div>
      </div>
    );
  }

  if (isPresenting) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center p-8"
          >
            <div className="relative w-full max-w-6xl aspect-video bg-white rounded-lg overflow-hidden">
              {currentSlideData.elements?.map((element) => (
                <div
                  key={element.id}
                  className="absolute"
                  style={{
                    left: `${element.position.x}%`,
                    top: `${element.position.y}%`,
                    transform: "translate(-50%, -50%)",
                    ...element.style
                  }}
                >
                  {element.type === "text" && (
                    <div
                      className="presentation-text"
                      style={element.style}
                    >
                      {element.content}
                    </div>
                  )}
                  {element.type === "image" && (
                    <img
                      src={element.content || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"}
                      alt="Slide content"
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                  {element.type === "shape" && (
                    <div
                      style={{
                        width: element.style.width,
                        height: element.style.height,
                        backgroundColor: element.style.backgroundColor,
                        borderRadius: "8px"
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="p-3 bg-white/20 hover:bg-white/30 disabled:opacity-50 rounded-full glass transition-colors"
          >
            <ApperIcon name="ChevronLeft" size={20} className="text-white" />
          </button>
          
          <span className="text-white px-4 py-2 bg-white/20 rounded-lg glass">
            {currentSlide + 1} / {slides.length}
          </span>
          
          <button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-3 bg-white/20 hover:bg-white/30 disabled:opacity-50 rounded-full glass transition-colors"
          >
            <ApperIcon name="ChevronRight" size={20} className="text-white" />
          </button>
          
          <button
            onClick={() => setIsPresenting(false)}
            className="p-3 bg-red-500/80 hover:bg-red-500 rounded-full glass transition-colors"
          >
            <ApperIcon name="X" size={20} className="text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card overflow-hidden">
      {error && (
        <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          Error: {error}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-surface-200 dark:border-surface-700 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-semibold text-surface-900 dark:text-white">
            Presentation Editor
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPresenting(true)}
              disabled={slides.length === 0}
              className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <ApperIcon name="Play" size={16} />
              <span>Present</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Slide Navigator */}
        <div className="w-64 border-r border-surface-200 dark:border-surface-700 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-surface-900 dark:text-white">Slides</h3>
            <button
              onClick={addSlide}
              className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
            >
              <ApperIcon name="Plus" size={16} className="text-surface-600 dark:text-surface-400" />
            </button>
          </div>

          <div className="space-y-2">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`relative group cursor-pointer p-3 rounded-lg border-2 transition-all ${
                  currentSlide === index
                    ? "border-primary bg-primary/5"
                    : "border-surface-200 dark:border-surface-600 hover:border-surface-300 dark:hover:border-surface-500"
                }`}
                onClick={() => setCurrentSlide(index)}
              >
                <div className="aspect-video bg-surface-50 dark:bg-surface-700 rounded mb-2 flex items-center justify-center">
                  <span className="text-xs text-surface-500">Slide {index + 1}</span>
                </div>
                
                {slides.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSlide(index);
                    }}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1 bg-red-500 hover:bg-red-600 text-white rounded transition-all"
                  >
                    <ApperIcon name="Trash2" size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="border-b border-surface-200 dark:border-surface-700 p-4">
            <div className="flex items-center space-x-4">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    setSelectedTool(tool.id);
                    addElement(tool.id);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    selectedTool === tool.id
                      ? "bg-primary text-white"
                      : "bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300"
                  }`}
                >
                  <ApperIcon name={tool.icon} size={16} />
                  <span className="text-sm">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-8 bg-surface-50 dark:bg-surface-900">
            <div
              ref={canvasRef}
              className="relative w-full aspect-video bg-white dark:bg-surface-800 rounded-lg shadow-lg mx-auto max-w-4xl overflow-hidden"
              style={{ maxHeight: "calc(100% - 2rem)" }}
            >
              {currentSlideData.elements?.map((element) => (
                <div
                  key={element.id}
                  className="absolute cursor-pointer hover:ring-2 hover:ring-primary/50 rounded"
                  style={{
                    left: `${element.position.x}%`,
                    top: `${element.position.y}%`,
                    transform: "translate(-50%, -50%)",
                    ...element.style
                  }}
                  onClick={() => setEditingElement(element.id)}
                >
                  {element.type === "text" && (
                    <div
                      className="presentation-text min-w-[100px] min-h-[30px] p-2"
                      contentEditable={editingElement === element.id}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        updateElement(element.id, { content: e.target.textContent });
                        setEditingElement(null);
                      }}
                      style={element.style}
                    >
                      {element.content}
                    </div>
                  )}
                  {element.type === "image" && (
                    <img
                      src={element.content || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop"}
                      alt="Slide content"
                      className="max-w-[200px] max-h-[150px] object-cover rounded"
                    />
                  )}
                  {element.type === "shape" && (
                    <div
                      style={{
                        width: element.style.width || "100px",
                        height: element.style.height || "100px",
                        backgroundColor: element.style.backgroundColor || "#3b82f6",
                        borderRadius: "8px"
                      }}
                    />
                  )}
                  {element.type === "chart" && (
                    <div className="w-64 h-48 bg-surface-100 dark:bg-surface-700 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <ApperIcon name="BarChart3" size={32} className="text-surface-400 mx-auto mb-2" />
                        <span className="text-sm text-surface-500">Chart Placeholder</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {slides.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <ApperIcon name="FileText" size={48} className="text-surface-300 mx-auto mb-4" />
                    <p className="text-surface-500 mb-4">No slides yet</p>
                    <button
                      onClick={addSlide}
                      className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
                    >
                      Add First Slide
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;