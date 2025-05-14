import {useState,useEffect,useMemo, useCallback} from "react";
import { useAccount, useBalance, useReadContract, useSwitchAccount, useWriteContract, useChainId } from "wagmi";
import { formatEther, parseEther } from "viem";
import {DEX_ABI, TOKEN_ABI} from "../utils/constants"



export const useDex = (tokenAddress, dexAddress) => {

    const {address} = useAccount();
    const chainId = useChainId();

    const [tokenAddress, setTokenAddress] = useState('');
    const [dexAddress, setDexAddress] = useState('');
    const [priceFeedAddress, setPriceFeedAddress] = useState('')


    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [slippage, setSlippage] = useState(0.5)

    const [liquidityAmount, setLiquidityAmount] = useState('');
    const [ethLiquidityAmount, setEthLiquidityAmount] = useState('')

    const dexContractConfig = useMemo(() => ({
        address: dexAddress,
        abi: DEX_ABI,
    }), [dexAddress]);

    const tokenContractConfig = useMemo(() => ({
        address: tokenAddress,
        abi: TOKEN_ABI,
    }),[tokenAddress])

    const {data:ethBalance} = useBalance({address});
    const {data:tokenBalance} = useBalance({
        address,
        token:tokenAddress,
        enabled: !!tokenAddress,
    });

    // DEX RESERVE
    const {data: ethReserve} = useReadContract({
        ...dexContractConfig,
        functionName:'ethReserve'
    })


    return {

    }
}