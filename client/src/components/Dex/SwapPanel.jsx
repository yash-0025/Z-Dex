import { motion } from 'framer-motion'
import { useDex } from '../../hooks/useDex'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { ArrowDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

export const SwapPanel = () => {
  const {
    fromAmount,
    toAmount,
    setFromAmount,
    slippage,
    setSlippage,
    ethBalance,
    tokenBalance,
    ethReserve,
    tokenReserve,
    tokenPrice,
    handleEthToTokenSwap,
    handleTokenToEthSwap,
    isConnected
  } = useDex()

  const [isEthToZdex, setIsEthToZdex] = useState(true)

  const handleReverse = () => {
    setIsEthToZdex(!isEthToZdex)
    setFromAmount(toAmount)
  }

  const priceImpact = useMemo(() => {
    if (!fromAmount || !ethReserve || !tokenReserve) return 0
    
    const inputAmount = parseFloat(fromAmount)
    const inputReserve = parseFloat(ethReserve)
    const outputReserve = parseFloat(tokenReserve)
    
    if (inputReserve === 0 || outputReserve === 0) return 0
    
    const newInputReserve = inputReserve + (isEthToZdex ? inputAmount : 0)
    const newOutputReserve = outputReserve + (isEthToZdex ? 0 : inputAmount)
    const priceImpact = ((outputReserve - newOutputReserve) / outputReserve) * 100
    
    return Math.abs(priceImpact).toFixed(2)
  }, [fromAmount, ethReserve, tokenReserve, isEthToZdex])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <motion.h2 
            className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            {isEthToZdex ? 'ETH → ZDEX' : 'ZDEX → ETH'}
          </motion.h2>
          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReverse}
            className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
            title="Reverse tokens"
          >
            <ArrowsRightLeftIcon className="h-5 w-5 text-blue-400" />
          </motion.button>
        </div>
        
        <div className="space-y-4">
          <Input 
            label="From" 
            balance={isEthToZdex ? `${ethBalance} ETH` : `${tokenBalance} ZDEX`}
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
            token={isEthToZdex ? 'ETH' : 'ZDEX'}
          />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: 'rgba(56, 182, 255, 0.2)'
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleReverse}
                className="p-2 z-10 bg-gray-800 rounded-full border-2 border-gray-700 hover:border-blue-400 transition-all"
                title="Switch tokens"
              >
                <ArrowDownIcon className="h-5 w-5 text-blue-400" />
              </motion.button>
            </div>
            <div className="h-px bg-gray-800/50 w-full" />
          </div>
          
          <Input
            label="To"
            balance={isEthToZdex ? `${tokenBalance} ZDEX` : `${ethBalance} ETH`}
            value={toAmount}
            readOnly
            placeholder="0.0"
            token={isEthToZdex ? 'ZDEX' : 'ETH'}
          />
          
          <div className="flex flex-col gap-1 text-sm text-gray-400 px-2">
            <div className="flex justify-between">
              <span>ETH Reserve</span>
              <span className="text-gray-300">
                {ethReserve ? parseFloat(ethReserve).toFixed(4) : '0'} ETH
              </span>
            </div>
            <div className="flex justify-between">
              <span>ZDEX Reserve</span>
              <span className="text-gray-300">
                {tokenReserve ? parseFloat(tokenReserve).toFixed(2) : '0'} ZDEX
              </span>
            </div>
            <div className="flex justify-between">
              <span>Exchange Rate</span>
              <span className="text-gray-300">
                {ethReserve && tokenReserve ? `1 ETH = ${(parseFloat(tokenReserve)/parseFloat(ethReserve)).toFixed(4)} ZDEX` : 'Loading...'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Price Impact</span>
              <span className={priceImpact > 2 ? 'text-rose-400' : 'text-emerald-400'}>
                {priceImpact}%
              </span>
            </div>
          </div>
          
          <Button 
            onClick={isEthToZdex ? handleEthToTokenSwap : handleTokenToEthSwap}
            disabled={!isConnected || !fromAmount}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
          >
            {isConnected ? (isEthToZdex ? 'Swap ETH for ZDEX' : 'Swap ZDEX for ETH') : 'Connect Wallet'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}