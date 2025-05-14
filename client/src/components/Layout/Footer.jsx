import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, BoltIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] // Smooth spring-like easing
      }}
      className="relative border-t border-gray-800/60 py-5 bg-gradient-to-t from-gray-900/30 to-transparent"
    >
      {/* Animated tech-pulse effect */}
      <motion.div 
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
      />
      
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-1">
          {/* Logo with tech glow */}
          <motion.div
            whileHover={{ 
              scale: 1.05,
              transition: { type: 'spring', stiffness: 400 }
            }}
            className="flex items-center gap-1.5 group"
          >
            <motion.div
              animate={{
                opacity: [1, 0.7, 1],
                transition: { 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <BoltIcon className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </motion.div>
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ZDEX
            </span>
          </motion.div>
          
          <p className="text-xs text-gray-400/80">
            Decentralized Exchange © {currentYear}
          </p>
          
          {/* Back to top button with micro-interaction */}
          <motion.button
            whileHover={{ 
              y: -2,
              transition: { type: 'spring', stiffness: 500 }
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-1.5 rounded-full p-1.5 text-gray-500 hover:text-blue-400 transition-all"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <ArrowUpIcon className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;