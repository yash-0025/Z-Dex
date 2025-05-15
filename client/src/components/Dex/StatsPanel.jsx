import { useReadContract } from 'wagmi'
import { motion } from 'framer-motion'
import { DEX_ABI } from '../../constants'
import { ChartBarIcon, CurrencyDollarIcon, ArrowsRightLeftIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'

export const StatsPanel = () => {
  const { data: totalVolume } = useReadContract({
    address: 'DEX_CONTRACT_ADDRESS',
    abi: DEX_ABI,
    functionName: 'totalVolume'
  })

  const { data: dailyVolume } = useReadContract({
    address: 'DEX_CONTRACT_ADDRESS',
    abi: DEX_ABI,
    functionName: 'dailyVolume'
  })

  const { data: totalTrades } = useReadContract({
    address: 'DEX_CONTRACT_ADDRESS',
    abi: DEX_ABI,
    functionName: 'totalTrades'
  })

  const stats = [
    { 
      name: 'Total Volume', 
      value: totalVolume ? `$${(parseInt(totalVolume) / 100).toLocaleString()}` : '$0', 
      icon: CurrencyDollarIcon,
      change: '+12.5%',
      trend: 'up'
    },
    { 
      name: '24h Volume', 
      value: dailyVolume ? `$${(parseInt(dailyVolume) / 100).toLocaleString()}` : '$0', 
      icon: ArrowsRightLeftIcon,
      change: '+5.2%',
      trend: 'up'
    },
    { 
      name: 'Total Trades', 
      value: totalTrades ? parseInt(totalTrades).toLocaleString() : '0', 
      icon: ChartBarIcon,
      change: '+8.1%',
      trend: 'up'
    },
    { 
      name: 'Active Pairs', 
      value: '1', 
      icon: ArrowTrendingUpIcon,
      change: 'New',
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
          Protocol Analytics
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
                <stat.icon className={`h-5 w-5 ${
                  stat.trend === 'up' ? 'text-emerald-400' : 
                  stat.trend === 'down' ? 'text-rose-400' : 'text-blue-400'
                }`} />
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 
                  stat.trend === 'down' ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-400">{stat.name}</p>
              <p className="text-xl font-semibold mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional stats row */}
      <div className="mt-6 pt-6 border-t border-gray-800/30">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">TVL</div>
          <div className="font-medium">$1,245,320</div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-gray-400">24h Fees</div>
          <div className="font-medium text-emerald-400">$3,245</div>
        </div>
      </div>
    </motion.div>
  )
}