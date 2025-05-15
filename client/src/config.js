import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { DEX_ABI, TOKEN_ABI } from './utils/constants'

export const config = createConfig({
  chains: [mainnet, sepolia],
  contracts: {
    zdex: {
      address: import.meta.env.VITE_DEX_ADDRESS,
      abi: DEX_ABI,
    },
    zdexToken: {
      address: import.meta.env.VITE_TOKEN_ADDRESS,
      abi: TOKEN_ABI,
    },
  },
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})