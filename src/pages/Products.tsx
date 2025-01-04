import React, { useState, Suspense, lazy, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product, ProductFilters as ProductFiltersType } from '../types';
import { products } from '../constants/products';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import SlideControls from '../components/SlideControls';
import { default as ProductFilters } from '../components/ProductFilters';
import ProductBanner from '../components/ProductBanner';

// Lazy load the ProductModal component
const ProductModal = lazy(() => import('../components/ProductModal'));

const PRODUCTS_PER_SLIDE = 3;

const ProductCard: React.FC<{
  product: Product;
  onClick: (product: Product) => void;
  index: number;
}> = ({ product, onClick, index }) => (
  <motion.div
    key={product.id}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ 
      duration: 0.5,
      delay: index * 0.1,
      ease: "easeOut"
    }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="glass-effect rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl"
    onClick={() => onClick(product)}
    onKeyDown={(e) => e.key === 'Enter' && onClick(product)}
    role="button"
    tabIndex={0}
    aria-label={`View details for ${product.name}`}
  >
    <div className="h-48 sm:h-64 relative overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      {product.badge && (
        <span className="absolute top-4 right-4 bg-primary-green text-white px-3 py-1 rounded-full text-sm font-medium" role="status">
          {product.badge}
        </span>
      )}
    </div>
    <div className="p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{product.name}</h3>
      <p className="text-white/80 mb-4 text-sm sm:text-base">{product.description}</p>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <span className="text-xl sm:text-2xl font-bold text-white" aria-label={`Price: $${product.price}`}>
          ${product.price}
        </span>
        <button 
          className="bg-white text-primary-green px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          aria-label={`View details for ${product.name}`}
        >
          View Details
        </button>
      </div>
    </div>
  </motion.div>
);

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [filters, setFilters] = useState<ProductFiltersType>({
    category: 'All',
    search: '',
    sort: 'name-asc',
    priceRange: [0, 100]
  });
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = filters.category === 'All' || product.category === filters.category;
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const totalSlides = Math.ceil(filteredProducts.length / PRODUCTS_PER_SLIDE);
  const displayedProducts = showAll 
    ? filteredProducts 
    : filteredProducts.slice(
        currentSlide * PRODUCTS_PER_SLIDE,
        (currentSlide + 1) * PRODUCTS_PER_SLIDE
      );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showAll) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, showAll]);

  // Touch controls
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="container mx-auto px-4 sm:px-6 py-12" role="banner">
        <ProductBanner products={products} />
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-12 relative" role="main">
        {/* Filters */}
        <ProductFilters
          filters={filters}
          onFilterChange={(newFilters) => {
            setFilters(prev => ({ ...prev, ...newFilters }));
            setCurrentSlide(0);
          }}
        />

        {/* Products Grid */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative"
        >
          <AnimatePresence mode="wait" custom={currentSlide}>
            <motion.div 
              key={currentSlide}
              custom={currentSlide}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
              role="list"
              aria-label="Products grid"
            >
              {displayedProducts.map((product, index) => (
                <div key={product.id} role="listitem">
                  <ProductCard
                    product={product}
                    onClick={setSelectedProduct}
                    index={index}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {!showAll && filteredProducts.length > PRODUCTS_PER_SLIDE && (
          <>
            <div className="mt-12 flex justify-center items-center space-x-8">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 hover:scale-110 transform"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="w-6 h-6 text-white" />
              </button>
              <span className="text-white font-medium">
                Slide {currentSlide + 1} of {totalSlides}
              </span>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 hover:scale-110 transform"
                aria-label="Next slide"
              >
                <FaChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            <SlideControls
              totalSlides={totalSlides}
              currentSlide={currentSlide}
              onSlideChange={setCurrentSlide}
            />
          </>
        )}

        {/* View All Toggle */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setShowAll(!showAll);
              setCurrentSlide(0);
            }}
            className="bg-white text-primary-green px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 transform"
          >
            {showAll ? 'Show Slides' : 'View All Products'}
          </button>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products; 