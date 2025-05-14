import { motion } from 'framer-motion'

export const WalletMultiButton = ({ children, className, ...props }) => (
  <button 
    className={`flex items-center space-x-2 px-4 py-2  bg-blue-600 hover:bg-blue-800 rounded-lg transition-colors duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
)