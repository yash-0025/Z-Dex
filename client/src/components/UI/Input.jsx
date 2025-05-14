import React from 'react'
import {motion} from "framer-motion"
const Input = ({
    label,
    balance,
    placeholder,
    token,
    className = ''
}) => {
    return (
        <motion.div
            whileHover={{ borderColor: 'rgba(96, 165, 250, 0.3)' }}
            className={`relative bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 transition-all ${className}`}
        >
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {label}
                </span>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="text-xs text-gray-400 hover:text-blue-400 transition-colors"
                >
                    Balance: <span className="font-medium">{balance}</span>
                </motion.button>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="number"
                    placeholder={placeholder}
                    className="w-full bg-transparent text-2xl outline-none placeholder-gray-600"
                />
                <motion.div
                    whileHover={{ backgroundColor: 'rgba(96, 165, 250, 0.1)' }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-lg border border-gray-700/50"
                >
                    <span className="text-sm font-medium text-gray-200">
                        {token}
                    </span>
                    <motion.span className="text-xs text-gray-400">
                        ▼
                    </motion.span>
                </motion.div>
            </div>

            {/* Focus indicator */}
            <motion.div
                className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500"
                initial={{ scaleX: 0 }}
                whileFocus={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    )
}

export default Input
