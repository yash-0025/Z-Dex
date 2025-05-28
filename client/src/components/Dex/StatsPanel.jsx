import { useMemo } from "react";
import { motion } from "framer-motion";
import { useReadContract } from "wagmi";
import { DEX_ABI } from "../../utils/constants";
import { 
  CurrencyDollarIcon, 
  ArrowsRightLeftIcon, 
  ArrowTrendingUpIcon,
  CubeTransparentIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
import { formatEther } from "viem";

export const StatsPanel = ({ dexAddress }) => {
  // Read contract data
  const { data: ethReserveRaw } = useReadContract({
    address: dexAddress,
    abi: DEX_ABI,
    functionName: 'ethReserve'
  });

  const { data: tokenReserveRaw } = useReadContract({
    address: dexAddress,
    abi: DEX_ABI,
    functionName: 'tokenReserve'
  });

  // Get price from contract
  const { data: tokenPriceInEth } = useReadContract({
    address: dexAddress,
    abi: DEX_ABI,
    functionName: 'getTokenPriceInETH'
  });

  // Format raw data
  const ethReserve = useMemo(() => 
    ethReserveRaw ? parseFloat(formatEther(ethReserveRaw)) : 0, 
    [ethReserveRaw]
  );

  const tokenReserve = useMemo(() => 
    tokenReserveRaw ? parseFloat(formatEther(tokenReserveRaw)) : 0, 
    [tokenReserveRaw]
  );

  // Calculate exchange rates
  const exchangeRate = useMemo(() => {
    if (ethReserve === 0 || tokenReserve === 0) return 0;
    return tokenReserve / ethReserve;
  }, [ethReserve, tokenReserve]);

  const tokenPrice = useMemo(() => {
    if (!tokenPriceInEth) return 0;
    return parseFloat(formatEther(tokenPriceInEth));
  }, [tokenPriceInEth]);

  // Stats data
  const stats = [
    {
      name: 'ETH Liquidity',
      value: ethReserve.toFixed(4),
      unit: 'ETH',
      icon: CurrencyDollarIcon,
      color: 'text-blue-400'
    },
    {
      name: 'ZDEX Liquidity',
      value: tokenReserve.toFixed(2),
      unit: 'ZDEX',
      icon: CubeTransparentIcon,
      color: 'text-purple-400'
    },
    {
      name: 'Exchange Rate',
      value: exchangeRate.toFixed(4),
      unit: 'ZDEX/ETH',
      icon: ArrowsRightLeftIcon,
      color: 'text-green-400'
    },
    {
      name: 'Token Price',
      value: tokenPrice.toFixed(6),
      unit: 'ETH/ZDEX',
      icon: BanknotesIcon,
      color: 'text-yellow-400'
    }
  ];

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
        <div className="flex items-center text-xs px-2 py-1 rounded-full bg-gray-800/50 border border-gray-700/50">
          <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
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
              <div className={`p-2 mr-3 rounded-lg ${stat.color.replace('text', 'bg')}/10`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-400">{stat.name}</p>
              <div className="flex items-baseline mt-1">
                <p className="text-xl font-semibold mr-2">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.unit}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};