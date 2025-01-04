import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Newland Products" className="h-10 w-10" />
            <span className="text-white text-xl font-bold">Newland Products</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
            <NavLink to="/products" active={location.pathname === "/products"}>Products</NavLink>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-green px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              Contact Us
            </motion.button>
          </div>

          <button className="md:hidden text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) => (
  <Link to={to}>
    <motion.span
      className={`relative text-white font-medium ${active ? 'font-bold' : ''}`}
      whileHover={{ scale: 1.05 }}
    >
      {children}
      {active && (
        <motion.div
          layoutId="underline"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
        />
      )}
    </motion.span>
  </Link>
);

export default Navbar; 