import React from 'react';
import { motion } from 'framer-motion';

interface SlideControlsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const SlideControls: React.FC<SlideControlsProps> = ({
  totalSlides,
  currentSlide,
  onSlideChange,
}) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <motion.button
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentSlide === index ? 'bg-primary-green scale-125' : 'bg-white/30 hover:bg-white/50'
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSlideChange(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={currentSlide === index}
        />
      ))}
    </div>
  );
};

export default SlideControls; 