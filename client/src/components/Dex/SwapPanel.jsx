import React from 'react'
import {motion} from "framer-motion"
import Card from '../UI/Card'
import Button from '../UI/Button'
import Input from '../UI/Input'
import {ArrowDownIcon, ArrowsRightLeftIcon} from "@heroicons/react/24/outline"

const SwapPanel = () => {
  return (
 <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50">
        {/* Header with animated refresh */}
        <div className="flex justify-between items-center mb-6">
          <motion.h2 
            className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            Token Swap
          </motion.h2>
          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-blue-400 transition-colors"
            title="Refresh rates"
          >
            <ArrowsRightLeftIcon className="h-5 w-5" />
          </motion.button>
        </div>
        
        <div className="space-y-4">
          {/* From Input */}
          <Input 
            label="From" 
            balance="0.5 ETH"
            placeholder="0.0"
            token="ETH"
            className="bg-gray-800/50 hover:bg-gray-800/70 focus:ring-2 focus:ring-blue-500/30"
          />
          
          {/* Swap direction button */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: 'rgba(56, 182, 255, 0.2)'
                }}
                whileTap={{ scale: 0.9 }}
                className="p-2 z-10 bg-gray-800 rounded-full border-2 border-gray-700 hover:border-blue-400 transition-all"
                title="Switch tokens"
              >
                <ArrowDownIcon className="h-5 w-5 text-blue-400" />
              </motion.button>
            </div>
            <div className="h-px bg-gray-800/50 w-full" />
          </div>
          
          {/* To Input */}
          <Input
            label="To"
            balance="150.2 USDC"
            placeholder="0.0"
            token="USDC"
            className="bg-gray-800/50 hover:bg-gray-800/70 focus:ring-2 focus:ring-blue-500/30"
          />
          
          {/* Swap button with loading state potential */}
          <Button 
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <motion.span 
              className="font-medium"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              Swap
            </motion.span>
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
  

export default SwapPanel
