import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductBannerProps {
  products: Product[];
}

const bannerVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
};

const ProductBanner: React.FC<ProductBannerProps> = ({ products }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const featuredProducts = products.filter(product => product.badge);
  const bannerIndex = Math.abs(page % featuredProducts.length);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setPage(([prevPage]) => [prevPage + 1, 1]);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const paginate = (newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  return (
    <motion.div
      className="relative h-[500px] overflow-hidden bg-gradient-to-r from-primary-green/20 to-primary-green/10 rounded-3xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={bannerVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2 text-white space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {featuredProducts[bannerIndex].badge && (
                  <span className="inline-block bg-primary-green px-4 py-1 rounded-full text-sm font-medium mb-4">
                    {featuredProducts[bannerIndex].badge}
                  </span>
                )}
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                  {featuredProducts[bannerIndex].name}
                </h2>
                <p className="text-lg text-white/80 mb-6">
                  {featuredProducts[bannerIndex].description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">
                    ${featuredProducts[bannerIndex].price}
                  </span>
                  <Link
                    to={`/products/${featuredProducts[bannerIndex].id}`}
                    className="bg-white text-primary-green px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 transform"
                  >
                    Shop Now
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px]">
              <motion.img
                src={featuredProducts[bannerIndex].image}
                alt={featuredProducts[bannerIndex].name}
                className="absolute inset-0 w-full h-full object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
        {featuredProducts.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              bannerIndex === index ? 'bg-primary-green scale-125' : 'bg-white/30'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPage([index, index > bannerIndex ? 1 : -1])}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all duration-300"
        onClick={() => paginate(-1)}
        aria-label="Previous banner"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          whileHover={{ x: -2 }}
        >
          <path d="M15 18l-6-6 6-6" />
        </motion.svg>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all duration-300"
        onClick={() => paginate(1)}
        aria-label="Next banner"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          whileHover={{ x: 2 }}
        >
          <path d="M9 18l6-6-6-6" />
        </motion.svg>
      </button>
    </motion.div>
  );
};

export default ProductBanner; 