import { motion } from 'framer-motion'
import { useDex } from '../../hooks/useDex'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { ArrowDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import { useConnect } from 'wagmi'

export const SwapPanel = () => {
   const {
    fromAmount,
    toAmount,
    setFromAmount,
    setToAmount,
    handleSwap,
    getSwapOutput, // Add this destructuring
    ethBalance,
    tokenBalance,
    ethReserve,
    tokenReserve,
    priceImpact,
    isLoading,
    isConnected
  } = useDex()



   const handleConnectWallet = () => {
    // This will be handled by the Header's connect button
    // The button will just trigger the Header's modal
    document.dispatchEvent(new Event('openWalletModal'))
  }

   // Modified handleReverse function
  const handleReverse = async () => {
    if (!fromAmount) return;
    
    try {
      // Store current values
      const currentFrom = fromAmount;
      const currentTo = toAmount;
      
      // Clear inputs temporarily
      setFromAmount('');
      setToAmount('');
      
      // Calculate new values
      const newToAmount = await getSwapOutput(currentFrom, false);
      
      // Swap the values
      setFromAmount(currentTo || '0');
      setToAmount(newToAmount);
    } catch (error) {
      console.error("Error reversing swap:", error);
      // Revert to original values on error
      setFromAmount(fromAmount);
      setToAmount(toAmount);
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <motion.h2 
            className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            Swap Tokens
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
        
        {/* Swap Form */}
        <div className="space-y-4">
          {/* From Input */}
          <Input 
            label="From" 
            balance={`${ethBalance} ETH`}
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
            token="ETH"
            className="hover:bg-gray-800/30"
          />
          
          {/* Swap Direction Button */}
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
          
          {/* To Input */}
          <Input
            label="To"
            balance={`${tokenBalance} ZDEX`}
            value={toAmount}
            readOnly
            placeholder="0.0"
            token="ZDEX"
            className="hover:bg-gray-800/30"
          />
          
          {/* Swap Info */}
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
              <span>Price Impact</span>
              <span className={priceImpact > 2 ? 'text-rose-400' : 'text-emerald-400'}>
                {priceImpact}%
              </span>
            </div>
          </div>
          
          {/* Swap Button */}
          <Button 
            onClick={isConnected ? handleSwap : handleConnectWallet}
            isLoading={isLoading}
            disabled={isConnected ? (!fromAmount || isLoading) : false}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isConnected ? 'Swap' : 'Connect Wallet'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}