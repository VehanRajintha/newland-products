import React, { Suspense, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls } from '@react-three/drei';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Focus the modal when it opens
    modalRef.current?.focus();
    document.addEventListener('keydown', handleKeyDown);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-4xl m-4 relative focus:outline-none"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-green rounded-full p-1"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="h-64 sm:h-96 mb-6" aria-hidden="true">
          <Canvas>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <PresentationControls
                global
                config={{ mass: 2, tension: 500 }}
                snap={{ mass: 4, tension: 1500 }}
                rotation={[0, 0.3, 0]}
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
              >
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color={product.color} />
                </mesh>
              </PresentationControls>
              <OrbitControls enableZoom={false} />
            </Suspense>
          </Canvas>
        </div>
        <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-primary-green mb-4">{product.name}</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">{product.description}</p>
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <span className="text-2xl sm:text-3xl font-bold text-primary-green" aria-label={`Price: $${product.price}`}>
            ${product.price}
          </span>
          <button 
            className="bg-primary-green text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2"
            onClick={() => {/* Implement add to cart functionality */}}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal; 