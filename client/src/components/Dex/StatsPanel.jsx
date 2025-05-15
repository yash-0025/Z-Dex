import { useReadContract } from "wagmi"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { DEX_ABI } from "../../utils/constants"
import { ChartBarIcon, CurrencyDollarIcon, ArrowsRightLeftIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline"

export const StatsPanel = ({ dexAddress }) => {
    const { data: ethReserve } = useReadContract({
        address: dexAddress,
        abi: DEX_ABI,
        functionName: 'ethReserve'
    })

    const { data: tokenReserve } = useReadContract({
        address: dexAddress,
        abi: DEX_ABI,
        functionName: 'tokenReserve'
    })

       // Calculate TVL (assuming 1 ETH = $2000 for demo)
    const tvl = useMemo(() => {
        if (!ethReserve) return 0
        const ethAmount = parseFloat(formatEther(ethReserve))
        return ethAmount * 2 * 2000 // 2x because AMMs have equal value on both sides
    }, [ethReserve])
    
    const stats = [
        {
            name: 'ETH Reserve',
            value: ethReserve ? `${(parseInt(ethReserve) / 1e18).toFixed(4)} ETH` : `0 ETH`,
            icon: CurrencyDollarIcon,
            change: '',
            trend: 'neutral'
        },
        {
            name: 'ZDEX Reserve',
            value: tokenReserve ? `${(parseInt(tokenReserve) / 1e18).toFixed(2)} ZDEX` : '0 ZDEX',
            icon: ArrowsRightLeftIcon,
            change: '',
            trend: 'neutral'
        },
        {
            name: 'Total Value Locked',
            value: `$ ${(tvl / 1e18 * 2000).toLocaleString()}`,
            icon: ChartBarIcon,
            change: '',
            trend: 'neutral'
        },
        {
            name: 'Exchange Rate',
            value: ethReserve && tokenReserve ?
                `1 ETH = ${(parseInt(tokenReserve) / parseInt(ethReserve)).toFixed(2)} ZDEX` :
                'Loading...',
            icon: ArrowTrendingUpIcon,
            change: '',
            trend: 'neutral'
        }
    ]

    return (
        <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Pool Statistics
        </h2>
        <div className="text-xs px-2 py-1 rounded-full bg-gray-800/50 border border-gray-700/50">
          Live
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -2 }}
            className="p-4 bg-gray-900/30 rounded-xl border border-gray-800/30 hover:border-gray-700/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="p-2 mr-3 rounded-lg bg-blue-500/10">
                <stat.icon className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-400">{stat.name}</p>
              <p className="text-xl font-semibold mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
    )
}