import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { TeaLeaves } from '../components/TeaLeaves';
import Model3D from '../components/Model3D';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../types';
import { features, Feature } from '../constants/features';
import throttle from 'lodash/throttle';

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modelError, setModelError] = useState<string | null>(null);

  const handleScroll = useCallback(throttle(() => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentProgress = window.scrollY / totalScroll;
    setScrollProgress(currentProgress);
  }, 100), []); // Throttle scroll events to improve performance

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      handleScroll.cancel(); // Cancel any pending throttled calls
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleCanvasError = (error: Error) => {
    console.error('3D Model Error:', error);
    setModelError('An error occurred while loading the 3D model');
  };

  return (
    <div className="min-h-screen">
      <section className="min-h-screen relative overflow-hidden pt-24 md:pt-32">
        <div className="floating-shape shape-1" aria-hidden="true" />
        <div className="floating-shape shape-2" aria-hidden="true" />
        <div className="floating-shape shape-3" aria-hidden="true" />
        
        <TeaLeaves />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-full flex items-center"
        >
          <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-white text-center md:text-left z-20">
              <motion.h1
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="responsive-heading font-bold mb-6"
              >
                Welcome to <br className="hidden sm:block" />
                Newland Products
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="responsive-text mb-8 max-w-lg mx-auto md:mx-0"
              >
                Discover our innovative range of eco-friendly products designed for a sustainable future.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-x-4"
              >
                <Link
                  to="/products"
                  className="bg-white text-primary-green px-6 sm:px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 inline-block mb-4 sm:mb-0"
                  aria-label="Browse our products"
                >
                  Explore Products
                </Link>
                <Link
                  to="/contact"
                  className="glass-effect text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300 inline-block"
                  aria-label="Contact our team"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative mt-8 md:mt-0 h-[600px] sm:h-[800px] w-screen flex items-center justify-end"
              style={{ 
                perspective: '1000px',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                left: '50%',
                right: '50%',
                position: 'relative'
              }}
            >
              <div className="absolute inset-0 w-full">
                <ErrorBoundary onError={handleCanvasError}>
                  <Canvas
                    camera={{ position: [0, 0, 6], fov: 45 }}
                    className="w-full h-full"
                    style={{
                      background: 'transparent',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      pointerEvents: 'auto'
                    }}
                    dpr={[1, 2]}
                    gl={{ 
                      antialias: true,
                      alpha: true,
                      preserveDrawingBuffer: true
                    }}
                  >
                    <ambientLight intensity={0.8} />
                    <spotLight 
                      position={[10, 10, 10]} 
                      angle={0.15} 
                      penumbra={1} 
                      intensity={1.2}
                      castShadow
                    />
                    <Suspense fallback={
                      <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="#cccccc" />
                      </mesh>
                    }>
                      <Model3D scrollProgress={scrollProgress} />
                      <OrbitControls 
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2}
                        maxPolarAngle={Math.PI / 2}
                      />
                      <Environment preset="sunset" />
                    </Suspense>
                  </Canvas>
                </ErrorBoundary>
                {modelError && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm"
                    role="alert"
                    aria-live="polite"
                  >
                    <p className="text-white text-center p-4 bg-red-500/80 rounded-lg">
                      {modelError}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="wave-shape" aria-hidden="true">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="features-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="responsive-heading font-bold text-center mb-16 text-primary-green"
          >
            Why Choose Newland?
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature: Feature, index: number) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="feature-card"
              >
                <div className="feature-icon" aria-hidden="true">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 