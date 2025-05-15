import React from 'react'
import { motion } from "framer-motion"

const Input = ({
    label,
    balance,
    value,
    onChange,
    placeholder,
    token,
    readOnly = false,
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
                <span className="text-xs text-gray-400">
                    Balance: <span className="font-medium">{balance}</span>
                </span>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="number"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    className="w-full bg-transparent text-2xl outline-none placeholder-gray-600"
                />
                <motion.div
                    whileHover={{ backgroundColor: 'rgba(96, 165, 250, 0.1)' }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-lg border border-gray-700/50"
                >
                    <span className="text-sm font-medium text-gray-200">
                        {token}
                    </span>
                </motion.div>
            </div>

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