import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDex } from '../../hooks/useDex'
import { Button } from '../UI/Button'
import { PlusIcon, MinusIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

export const LiquidityPanel = () => {
  const [activeTab, setActiveTab] = useState('add')
  const {
    fromAmount,
    liquidityAmount,
    ethLiquidityAmount,
    setFromAmount,
    setLiquidityAmount,
    setEthLiquidityAmount,
    handleAddLiquidity,
    handleRemoveLiquidity,
    ethBalance,
    tokenBalance,
    ethReserve,
    tokenReserve
  } = useDex()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg mt-6"
    >
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-800/50 mb-6">
        <button
          className={`px-4 py-2 font-medium relative ${activeTab === 'add' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('add')}
        >
          Add Liquidity
          {activeTab === 'add' && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
              layoutId="liquidityTabIndicator"
            />
          )}
        </button>
        <button
          className={`px-4 py-2 font-medium relative ${activeTab === 'remove' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('remove')}
        >
          Remove Liquidity
          {activeTab === 'remove' && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
              layoutId="liquidityTabIndicator"
            />
          )}
        </button>
      </div>

      {activeTab === 'add' ? (
        <div className="space-y-4">
          {/* ETH Input */}
          <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-800/30 hover:border-gray-700/50 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400 uppercase tracking-wider">ETH Amount</span>
              <span className="text-xs text-gray-400">Balance: {ethBalance} ETH</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-transparent text-xl outline-none placeholder-gray-600"
              />
              <span className="px-3 py-1.5 bg-gray-800/50 rounded-lg text-sm font-medium">
                ETH
              </span>
            </div>
          </div>

          {/* Token Input */}
          <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-800/30 hover:border-gray-700/50 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Token Amount</span>
              <span className="text-xs text-gray-400">Balance: {tokenBalance} TOKEN</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={liquidityAmount}
                onChange={(e) => setLiquidityAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-transparent text-xl outline-none placeholder-gray-600"
              />
              <span className="px-3 py-1.5 bg-gray-800/50 rounded-lg text-sm font-medium">
                TOKEN
              </span>
            </div>
          </div>

          {/* Pool Info */}
          <div className="bg-gray-900/20 rounded-xl p-4 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-800/30">
              <span className="text-gray-400">Pool Ratio</span>
              <span className="font-medium">
                1 ETH = {(tokenReserve / ethReserve).toFixed(6)} TOKEN
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Your Share</span>
              <span className="font-medium">0%</span>
            </div>
          </div>

          <Button 
            onClick={handleAddLiquidity}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
            disabled={!fromAmount || !liquidityAmount}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Liquidity
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Liquidity Position */}
          <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-800/30">
            <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Your Liquidity</h3>
            <div className="space-y-3">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex justify-between items-center p-3 bg-gray-900/40 hover:bg-gray-800/40 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                    <div className="w-6 h-6 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="font-medium">ETH-TOKEN</span>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400">$1,245.32</div>
                  <div className="text-xs text-gray-400">0.5% of pool</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Remove Liquidity */}
          <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-800/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Amount to Remove</span>
              <span className="text-xs text-gray-400">Max: 100%</span>
            </div>
            <input
              type="number"
              value={ethLiquidityAmount}
              onChange={(e) => setEthLiquidityAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-gray-900/20 rounded-lg px-4 py-3 text-lg outline-none border border-gray-800/50 focus:border-blue-400/50"
            />
          </div>

          <Button 
            onClick={handleRemoveLiquidity}
            className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500"
            disabled={!ethLiquidityAmount}
          >
            <MinusIcon className="h-5 w-5 mr-2" />
            Remove Liquidity
          </Button>
        </div>
      )}
    </motion.div>
  )
}