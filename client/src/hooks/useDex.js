import {useState,useEffect,useMemo, useCallback} from "react";
import { useAccount, useBalance, useReadContract, useWriteContract, useChainId } from "wagmi";
import { formatEther, parseEther } from "viem";
import {DEX_ABI, TOKEN_ABI} from "../utils/constants"
import { readContract } from "viem/actions";
// import { readContract } from "viem/actions";



export const useDex = () => {

    const {address} = useAccount();
    const chainId = useChainId();

    const [tokenAddress, setTokenAddress] = useState('');
    const [dexAddress, setDexAddress] = useState('');
    // const [priceFeedAddress, setPriceFeedAddress] = useState('')


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
    });

    // DEX RESERVE
    const {data: ethReserve} = useReadContract({
        ...dexContractConfig,
        functionName:'ethReserve',
    });

    const {data: tokenReserve} = useReadContract({
        ...dexContractConfig,
        functionName:'tokenReserve',
    });

    const {data: allowance} = useReadContract({
        ...tokenContractConfig,
        functionName:'allowance',
        args:[address, dexAddress],
    });

    const {data: tokenPrice} = useReadContract({
        ...dexContractConfig,
        functionName: 'getTokenPriceInETH',
    });

    const {writeContract: ethToTokenSwap } = useWriteContract();

    const {writeContract:tokenToEthSwap} = useWriteContract();
    const {writeContract: addLiquidity} = useWriteContract();
    const {writeContract: removeLiquidity} = useWriteContract();
    const {writeContract: approve} = useWriteContract();



    const getSwapOutput = useCallback(async(amount, isEthToToken) => {
        if(!amount || !dexAddress) return '0';

        try{
            const functionName = isEthToToken ? 'getTokenAmount' : 'getEthAmount';
            const amountOut = await readContract({
                ...dexContractConfig,
                functionName,
                args:[parseEther(amount)]
            });

            const minAmount = BigInt(amountOut) * BigInt(1000 - slippage * 100) / 10000n;
            return formatEther(minAmount);
        } catch(error) {
            console.log("Error getting swap output", error);
            return '0';
        }
    },[dexContractConfig, slippage]);

    useEffect(() => {
        const updateOutput = async() => {
            if(!fromAmount) {
                setToAmount(' ');
                return
            }
            const output = await getSwapOutput(fromAmount, true);
            setToAmount(output)
        }
        updateOutput();
    }, [fromAmount, getSwapOutput])


    const handleEthToTokenSwap = useCallback(() => {
        if(!fromAmount || !toAmount) return;

        ethToTokenSwap({
            ...dexContractConfig,
            functionName: 'ethToTokenSwap',
            value: parseEther(fromAmount),
            args:[parseEther(toAmount)]
        });
    }, [fromAmount, toAmount, dexContractConfig, ethToTokenSwap])


    const handleTokenToEthSwap = useCallback(() => {
        if(!fromAmount || !toAmount) return;

        approve({
            ...tokenContractConfig,
            functionName: 'approve',
            args:[dexAddress, parseEther(fromAmount)]
        }, {
            onSuccess: () =>{
                tokenToEthSwap({
                    ...dexContractConfig,
                    functionName: 'tokenToEthSwap',
                    args: [
                        parseEther(fromAmount),
                        parseEther(toAmount)
                    ]
                })
            }
        })
    }, [fromAmount, toAmount, dexAddress, tokenContractConfig, dexContractConfig, approve, tokenToEthSwap]);


    const handleAddLiquidity = useCallback(() => {
        if(!ethLiquidityAmount || !liquidityAmount) return;

        approve({
            ...tokenContractConfig,
            functionName: 'approve',
            args: [dexAddress, parseEther(liquidityAmount)]
        }, {
            onSuccess: () => {

                addLiquidity({
                    ...dexContractConfig,
                    functionname: 'addLiqudity',
                    value: parseEther(ethLiquidityAmount),
                    args:[parseEther(liquidityAmount)]
                })
            }
        })
    }, [ethLiquidityAmount, liquidityAmount, tokenContractConfig, dexContractConfig, approve, addLiquidity])




    const handleRemoveLiquidity = useCallback(() => {
        if(!liquidityAmount) return;

        removeLiquidty({
            ...dexContractConfig,
            functionName:'removeLiquidity',
            args:[parseEther(liquidityAmount)]
        })
    }, [liquidityAmount, dexContractConfig, removeLiquidity])


    const formattedValues = useMemo(() => ({
        ethBalance: ethBalance ? formatEther(ethBalance.value) : '0',
        tokenBalance: tokenBalance ?  formatEther(tokenBalance.valule) : '0',
        ethReserve:  ethReserve ? formatEther(ethReserve) : '0',
        tokenReserve: tokenReserve ? formatEther(tokenReserve) : '0',
        tokenPrice: tokenPrice ? formatEther(tokenPrice) : '0',
        allowance: allowance ? formatEther(allowance) : '0',
    }), [ethBalance, tokenBalance, ethReserve, tokenReserve, tokenPrice, allowance]);





    return {

        // ADDRESSES
        tokenAddress,
        dexAddress,
        setTokenAddress,
        setDexAddress,

    // SWAP
    fromAmount,
    toAmount,
    setFromAmount,
    setToAmount,
    slippage,
    setSlippage,
    handleEthToTokenSwap,
    handleTokenToEthSwap,
    

    // LIQUIDITY
    liquidityAmount,
    ethLiquidityAmount,
    setLiquidityAmount,
    setEthLiquidityAmount,
    handleAddLiquidity,
    handleRemoveLiquidity,

    // BALANCE and RESERVE
    ...formattedValues,

    chainId
    }
}