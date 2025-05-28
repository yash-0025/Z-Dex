import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

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
                rotate: [0, 360],
                transition: { 
                  duration: 20, 
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <svg 
                className="h-5 w-5 animate-pulse" 
                viewBox="0 0 40 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="zdex-gradient-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <linearGradient id="zdex-inner-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
                
                <path
                  d="M20 2 L32 10 L32 26 L20 34 L8 26 L8 10 Z"
                  fill="url(#zdex-gradient-footer)"
                  opacity="0.9"
                />
                
                <g fill="url(#zdex-inner-footer)">
                  <rect x="12" y="12" width="2" height="12" rx="1" />
                  <rect x="26" y="12" width="2" height="12" rx="1" />
                  <rect x="12" y="12" width="16" height="2" rx="1" />
                  <path d="M14 18 L26 18 L14 22 L26 22 Z" fill="white" opacity="0.9" />
                  <rect x="12" y="22" width="16" height="2" rx="1" />
                </g>
                
                <circle cx="12" cy="8" r="1.5" fill="#60A5FA" opacity="0.7" />
                <circle cx="28" cy="8" r="1.5" fill="#60A5FA" opacity="0.7" />
                <circle cx="34" cy="20" r="1.5" fill="#60A5FA" opacity="0.7" />
                <circle cx="28" cy="32" r="1.5" fill="#60A5FA" opacity="0.7" />
                <circle cx="12" cy="32" r="1.5" fill="#60A5FA" opacity="0.7" />
                <circle cx="6" cy="20" r="1.5" fill="#60A5FA" opacity="0.7" />
              </svg>
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