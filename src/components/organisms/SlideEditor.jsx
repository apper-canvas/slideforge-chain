import React, { useState, useRef, useEffect } from 'react';
      import PropTypes from 'prop-types';
      import { motion, AnimatePresence } from 'framer-motion';
      import { toast } from 'react-toastify';
      import slideService from '@/services/api/slideService';
      import Icon from '@/components/atoms/Icon';
      import Text from '@/components/atoms/Text';
      import Button from '@/components/atoms/Button';
      import Loader from '@/components/atoms/Loader';
      import ElementPreview from '@/components/molecules/ElementPreview';
      import Toolbar from '@/components/organisms/Toolbar';
      import SlideNavigator from '@/components/organisms/SlideNavigator';


      const SlideEditor = () => {
        const [slides, setSlides] = useState([]);
        const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
        const [isPresenting, setIsPresenting] = useState(false);
        const [editingElementId, setEditingElementId] = useState(null);
        const [selectedTool, setSelectedTool] = useState("text"); // default tool
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
              toast.error("Failed to load slides");
            } finally {
              setLoading(false);
            }
          };
          loadSlides();
        }, []);

        const currentSlideData = slides[currentSlideIndex] || { elements: [] };

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
            setCurrentSlideIndex(slides.length);
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

            if (currentSlideIndex >= updatedSlides.length) {
              setCurrentSlideIndex(Math.max(0, updatedSlides.length - 1));
            }

            toast.success("Slide deleted successfully!");
          } catch (err) {
            toast.error("Failed to delete slide");
          }
        };

        const addElement = async (type) => {
          if (!slides[currentSlideIndex]) return;

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
              ...slides[currentSlideIndex],
              elements: [...(slides[currentSlideIndex].elements || []), newElement]
            };

            await slideService.update(slides[currentSlideIndex].id, updatedSlide);

            setSlides(prev => prev.map((slide, index) =>
              index === currentSlideIndex ? updatedSlide : slide
            ));

            toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} element added!`);
          } catch (err) {
            toast.error("Failed to add element");
          }
        };

        const updateElement = async (elementId, updates) => {
          if (!slides[currentSlideIndex]) return;

          try {
            const updatedElements = slides[currentSlideIndex].elements.map(el =>
              el.id === elementId ? { ...el, ...updates } : el
            );

            const updatedSlide = {
              ...slides[currentSlideIndex],
              elements: updatedElements
            };

            await slideService.update(slides[currentSlideIndex].id, updatedSlide);

            setSlides(prev => prev.map((slide, index) =>
              index === currentSlideIndex ? updatedSlide : slide
            ));
          } catch (err) {
            toast.error("Failed to update element");
          }
        };

        const handleElementBlur = (elementId, e) => {
          updateElement(elementId, { content: e.target.textContent });
          setEditingElementId(null);
        };

        const handleNextSlide = () => {
          setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1));
        };

        const handlePrevSlide = () => {
          setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
        };

        if (loading) {
          return (
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-8">
              <Loader message="Loading slide editor..." />
            </div>
          );
        }

        if (isPresenting) {
          return (
            <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
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
                          <Image
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
                <Button
                  onClick={handlePrevSlide}
                  disabled={currentSlideIndex === 0}
                  className="p-3 bg-white/20 hover:bg-white/30 disabled:opacity-50 rounded-full glass transition-colors"
                >
                  <Icon name="ChevronLeft" size={20} className="text-white" />
                </Button>

                <Text type="span" className="text-white px-4 py-2 bg-white/20 rounded-lg glass">
                  {currentSlideIndex + 1} / {slides.length}
                </Text>

                <Button
                  onClick={handleNextSlide}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="p-3 bg-white/20 hover:bg-white/30 disabled:opacity-50 rounded-full glass transition-colors"
                >
                  <Icon name="ChevronRight" size={20} className="text-white" />
                </Button>

                <Button
                  onClick={() => setIsPresenting(false)}
                  className="p-3 bg-red-500/80 hover:bg-red-500 rounded-full glass transition-colors"
                >
                  <Icon name="X" size={20} className="text-white" />
                </Button>
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
                <Text type="h2" className="text-xl font-heading font-semibold text-surface-900 dark:text-white">
                  Presentation Editor
                </Text>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setIsPresenting(true)}
                    disabled={slides.length === 0}
                    className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Icon name="Play" size={16} />
                    <span>Present</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex h-[600px]">
              <SlideNavigator
                slides={slides}
                currentSlideIndex={currentSlideIndex}
                onSelectSlide={setCurrentSlideIndex}
                onAddSlide={addSlide}
                onDeleteSlide={deleteSlide}
              />

              {/* Main Editor */}
              <div className="flex-1 flex flex-col">
                <Toolbar onAddElement={addElement} onSelectTool={setSelectedTool} selectedTool={selectedTool} />

                {/* Canvas */}
                <div className="flex-1 p-8 bg-surface-50 dark:bg-surface-900">
                  <div
                    ref={canvasRef}
                    className="relative w-full aspect-video bg-white dark:bg-surface-800 rounded-lg shadow-lg mx-auto max-w-4xl overflow-hidden"
                    style={{ maxHeight: "calc(100% - 2rem)" }}
                  >
                    {currentSlideData.elements?.map((element) => (
                      <ElementPreview
                        key={element.id}
                        element={element}
                        isEditing={editingElementId === element.id}
                        onEdit={() => setEditingElementId(element.id)}
                        onBlur={(e) => handleElementBlur(element.id, e)}
                      />
                    ))}

                    {slides.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Icon name="FileText" size={48} className="text-surface-300 mx-auto mb-4" />
                          <p className="text-surface-500 mb-4">No slides yet</p>
                          <Button
                            onClick={addSlide}
                            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
                          >
                            Add First Slide
                          </Button>
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

      SlideEditor.propTypes = {
        // No props currently, but adding PropTypes for future expandability
      };

      export default SlideEditor;