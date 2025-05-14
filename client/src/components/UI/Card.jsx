import React, { Children } from 'react'
import { motion } from "framer-motion"



const Card = ({ children, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.25, 1] }}
            whileHover={{
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
                borderColor: ' rgba(96, 165, 250, 0.3)'
            }}
            className={`relative bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm overflow-hidden ${className}`}
        >
            <div className='absolute inset-0 rounded-2xl pointer-events-none p-px'>
                <div className='absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/20 to-transparent opacity-30 rounded-2xl' />
            </div>
            {children}
        </motion.div>
    )
}

export default Card
