import React from 'react'
import { motion } from 'framer-motion'

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    ...props
}) => {

    const baseClasses = 'font-medium transition-all items-center justify-center gap-2 rounded-xl'

    // Size variants
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-6 py-3 text-lg'
    }

    // Color variants
    const variants = {
        primary: `
      bg-gradient-to-r from-blue-600 to-cyan-600 
      hover:from-blue-500 hover:to-cyan-500 
      text-white shadow-lg shadow-blue-500/20
    `,
        secondary: `
      bg-gray-800/60 hover:bg-gray-700/80 
      text-gray-200 border border-gray-700/50 
      hover:border-gray-600/50
    `,
        ghost: `
      hover:bg-gray-800/30 text-gray-300
    `,
        danger: `
      bg-gradient-to-r from-rose-600 to-pink-600 
      hover:from-rose-500 hover:to-pink-500 
      text-white shadow-lg shadow-rose-500/20
    `,
        premium: `
      bg-gradient-to-r from-purple-600 to-indigo-600 
      hover:from-purple-500 hover:to-indigo-500 
      text-white shadow-lg shadow-purple-500/20
    `
    }

const animateVariants = {
    hover: {
        scale: 1.03,
        transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
    tap: {
        scale: 0.97,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10
        }
    },
    loading: {
        rotate: 360,
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
        }
    },
}
  
  return(
    <motion.button 
    whileHover="hover"
    whiteTap="tap"
    variants={animateVariants}
    className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`}
    disabled={isLoading}
    {...props}
    >
    {
        isLoading
            ?
            (
            <motion.span
            variants={animateVariants}
            animate="loading"
            className='inline-block h-5 w-5'
            >
            <svg className="h-full w-full" viewBox='0 0 24 24' fill='none'>
                <circle className='opacity-25' cx="12" cy="12" r="10" stroke='currentColor' strokeWidth="4"></circle>
                <path className='opacity-75' fill='currentColor' d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
            </motion.span>
        ) : (
            children
        )
      }
    </motion.button>
  )
}

export default Button
