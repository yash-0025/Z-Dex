import { useMemo } from "react";
import { motion } from "framer-motion";
import { useReadContract, useBalance } from "wagmi";
import { DEX_ABI, TOKEN_ABI, TOKEN_CONTRACT_ADDRESS } from "../../utils/constants";
import { 
  CurrencyDollarIcon, 
  ArrowsRightLeftIcon,
  CubeTransparentIcon
} from "@heroicons/react/24/outline";
import { formatEther, formatUnits } from "viem";

export const StatsPanel = ({ dexAddress }) => {
  // Since ethReserve is not public in contract, we'll read the contract's ETH balance
  const { data: contractEthBalance } = useBalance({
    address: dexAddress,
    watch: true
  });

  const { data: tokenReserveRaw } = useReadContract({
    address: dexAddress,
    abi: DEX_ABI,
    functionName: 'tokenReserve',
    watch: true
  });

  // Get token decimals
  const { data: zdexDecimalsData } = useReadContract({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: 'decimals',
    enabled: !!TOKEN_CONTRACT_ADDRESS,
    watch: true,
  });
  const zdexDecimals = zdexDecimalsData !== undefined ? Number(zdexDecimalsData) : undefined;

  // Format reserves
  const ethReserve = useMemo(() => 
    contractEthBalance ? parseFloat(formatEther(contractEthBalance.value)) : 0, 
    [contractEthBalance]
  );

  const tokenReserve = useMemo(() => {
    if (tokenReserveRaw !== undefined && zdexDecimals !== undefined) {
      return parseFloat(formatUnits(tokenReserveRaw, zdexDecimals));
    }
    return 0;
  }, [tokenReserveRaw, zdexDecimals]);

  // Calculate exchange rate (1 ETH = X ZDEX)
  const exchangeRate = useMemo(() => {
    if (ethReserve <= 0 || tokenReserve <= 0) return 0;
    return tokenReserve / ethReserve;
  }, [ethReserve, tokenReserve]);

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
      value: exchangeRate > 0 ? exchangeRate.toFixed(4) : 'N/A',
      unit: exchangeRate > 0 ? 'ZDEX/ETH' : '',
      icon: ArrowsRightLeftIcon,
      color: 'text-green-400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg h-full"
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

      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -2 }}
            className="p-4 bg-gray-900/30 rounded-xl border border-gray-800/30 hover:border-gray-700/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 mr-3 rounded-lg ${stat.color.replace('text', 'bg')}/10`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.name}</p>
                  <p className="text-xl font-semibold mt-1">
                    {stat.value} {stat.unit && <span className="text-sm text-gray-400 ml-1">{stat.unit}</span>}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};