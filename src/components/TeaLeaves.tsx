import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const TeaLeaves = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const heroHeight = window.innerHeight;
        setIsVisible(rect.top > -heroHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Tea Leaves */}
      <motion.div
        className="absolute w-32 h-32 opacity-20"
        style={{
          top: '20%',
          left: '10%',
          backgroundImage: 'url(/tea-leaf.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
        animate={{
          y: [0, 20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Add more tea leaves with different positions and animations */}
      <motion.div
        className="absolute w-24 h-24 opacity-15"
        style={{
          top: '40%',
          right: '15%',
          backgroundImage: 'url(/tea-leaf.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, -15, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="absolute w-20 h-20 opacity-10"
        style={{
          top: '60%',
          left: '20%',
          backgroundImage: 'url(/tea-leaf.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
        animate={{
          y: [0, 25, 0],
          rotate: [0, 20, -20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  );
}; 