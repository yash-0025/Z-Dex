// src/hooks/useDex.js
import { useState, useEffect, useMemo, useCallback } from "react";
import { useAccount, useBalance, useReadContract, useWriteContract, useChainId, usePublicClient } from "wagmi";
import { formatEther, parseEther, formatUnits, parseUnits } from "viem";
import { DEX_ABI, TOKEN_ABI } from "../utils/constants";
import { TOKEN_CONTRACT_ADDRESS, ZDEX_CONTRACT_ADDRESS } from "../utils/constants";

export const useDex = () => {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const publicClient = usePublicClient();

    const tokenAddress = TOKEN_CONTRACT_ADDRESS
    const dexAddress = ZDEX_CONTRACT_ADDRESS

    // State variables
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [slippage, setSlippage] = useState(0.5);
    const [liquidityAmount, setLiquidityAmount] = useState('');
    const [ethLiquidityAmount, setEthLiquidityAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Contract configs
    const dexContractConfig = useMemo(() => ({
        address: dexAddress,
        abi: DEX_ABI,
    }), [dexAddress]);

    const tokenContractConfig = useMemo(() => ({
        address: tokenAddress,
        abi: TOKEN_ABI,
    }), [tokenAddress]);

    // ETH Balance
    const { data: ethBalanceData } = useBalance({ address, watch: true });
    const ethBalance = ethBalanceData ? formatEther(ethBalanceData.value) : '0';

    // Contract ETH Balance (since ethReserve is not public)
    const { data: contractEthBalanceData } = useBalance({ 
        address: dexAddress, 
        watch: true 
    });
    const ethReserve = contractEthBalanceData ? formatEther(contractEthBalanceData.value) : '0';

    // Token decimals
    const { data: zdexDecimalsData } = useReadContract({
        ...tokenContractConfig,
        functionName: 'decimals',
        enabled: !!tokenAddress,
        watch: true,
    });
    const zdexDecimals = zdexDecimalsData !== undefined ? Number(zdexDecimalsData) : undefined;

    // Token balance with periodic refresh
    const { data: rawTokenBalanceData, refetch: refetchTokenBalance } = useReadContract({
        ...tokenContractConfig,
        functionName: 'balanceOf',
        args: [address],
        enabled: !!address && !!tokenAddress,
        watch: true,
    });

    const tokenBalance = useMemo(() => {
        if (!address || !tokenAddress) return '0';
        if (rawTokenBalanceData === undefined || zdexDecimals === undefined) return 'Loading...';
        
        try {
            return formatUnits(rawTokenBalanceData, zdexDecimals);
        } catch (error) {
            console.error('Error formatting token balance:', error);
            return 'Error';
        }
    }, [rawTokenBalanceData, zdexDecimals, address, tokenAddress]);
    
    useEffect(() => {
        if (isConnected) {
            const interval = setInterval(refetchTokenBalance, 15000);
            return () => clearInterval(interval);
        }
    }, [isConnected, refetchTokenBalance]);

    // Token Reserve (public in contract)
    const { data: tokenReserveData } = useReadContract({
        ...dexContractConfig,
        functionName: 'tokenReserve',
        enabled: !!zdexDecimals && !!dexAddress,
        watch: true,
    });
    const tokenReserve = useMemo(() => {
        if (tokenReserveData !== undefined && zdexDecimals !== undefined) {
            return formatUnits(tokenReserveData, zdexDecimals);
        }
        return '0';
    }, [tokenReserveData, zdexDecimals]);

    // Allowance
    const { data: allowanceData } = useReadContract({
        ...tokenContractConfig,
        functionName: 'allowance',
        args: [address, dexAddress],
        enabled: !!address && !!dexAddress && !!tokenAddress,
        watch: true,
    });
    const allowance = useMemo(() => {
        if (allowanceData !== undefined && zdexDecimals !== undefined) {
            return formatUnits(allowanceData, zdexDecimals);
        }
        return '0';
    }, [allowanceData, zdexDecimals]);

    // Token price from oracle
    const { data: ethPriceFromOracleData } = useReadContract({
        ...dexContractConfig,
        functionName: 'getTokenPriceInETH',
        enabled: !!dexAddress,
        watch: true,
    });
    const tokenPrice = ethPriceFromOracleData ? formatEther(ethPriceFromOracleData) : '0';

    const { writeContract: ethToTokenSwap } = useWriteContract();
    const { writeContract: tokenToEthSwap } = useWriteContract();
    const { writeContract: addLiquidity } = useWriteContract();
    const { writeContract: removeLiquidity } = useWriteContract();
    const { writeContract: approve } = useWriteContract();

    const getSwapOutput = useCallback(async (amount, isEthToToken) => {
        if (!amount || !dexAddress || !publicClient || zdexDecimals === undefined) return '0';

        try {
            const functionName = isEthToToken ? 'getTokenAmount' : 'getEthAmount';
            // Parse based on the input token's decimals
            const parsedAmount = isEthToToken ? parseEther(amount) : parseUnits(amount, zdexDecimals);

            const amountOut = await publicClient.readContract({
                ...dexContractConfig,
                functionName,
                args: [parsedAmount]
            });

            // Apply slippage
            const slippageFactor = BigInt(10000 - (slippage * 100)); // e.g., 0.5% slippage -> 9950
            const minAmount = (BigInt(amountOut) * slippageFactor) / 10000n;

            // Format based on the output token's decimals
            return isEthToToken ? formatUnits(minAmount, zdexDecimals) : formatEther(minAmount);

        } catch (error) {
            console.error("Error getting swap output:", error);
            return '0';
        }
    }, [dexContractConfig, slippage, publicClient, dexAddress, zdexDecimals]);

    useEffect(() => {
        const updateOutput = async () => {
            if (!fromAmount) {
                setToAmount('');
                return;
            }
        }
        updateOutput();
    }, [fromAmount, setToAmount, getSwapOutput]);

    const handleEthToTokenSwap = useCallback(() => {
        if (!fromAmount || !toAmount || zdexDecimals === undefined) {
            console.warn("Input amounts or token decimals are missing for ETH to Token swap.");
            return;
        }
        try {
            setIsLoading(true);
            ethToTokenSwap({
                ...dexContractConfig,
                functionName: 'ethToTokenSwap',
                value: parseEther(fromAmount), // ETH amount
                args: [parseUnits(toAmount, zdexDecimals)] // minTokens (use ZDEX decimals)
            }, {
                onSuccess: () => {
                    console.log("ETH to Token swap successful");
                    setFromAmount('');
                    setToAmount('');
                    setIsLoading(false);
                },
                onError: (error) => {
                    console.error("ETH to Token swap failed:", error);
                    setIsLoading(false);
                }
            });
        } catch (error) {
            console.error("Error initiating ETH to Token Swap:", error);
            setIsLoading(false);
        }
    }, [fromAmount, toAmount, zdexDecimals, dexContractConfig, ethToTokenSwap]);

    const handleTokenToEthSwap = useCallback(() => {
        if (!fromAmount || !toAmount || zdexDecimals === undefined) {
            console.warn("Input amounts or token decimals are missing for Token to ETH swap.");
            return;
        }

        try {
            setIsLoading(true);
            const parsedTokenAmount = parseUnits(fromAmount, zdexDecimals); // ZDEX amount
            const parsedEthAmount = parseEther(toAmount); // ETH amount

            approve({
                ...tokenContractConfig,
                functionName: 'approve',
                args: [dexAddress, parsedTokenAmount]
            }, {
                onSuccess: () => {
                    console.log("Approval successful, proceeding with token swap...");
                    tokenToEthSwap({
                        ...dexContractConfig,
                        functionName: 'tokenToEthSwap',
                        args: [
                            parsedTokenAmount,
                            parsedEthAmount
                        ]
                    }, {
                        onSuccess: () => {
                            console.log("Token to ETH swap successful");
                            setFromAmount('');
                            setToAmount('');
                            setIsLoading(false);
                        },
                        onError: (error) => {
                            console.error("Token to ETH swap failed:", error);
                            setIsLoading(false);
                        }
                    });
                },
                onError: (error) => {
                    console.error("Token approval failed:", error);
                    setIsLoading(false);
                }
            });
        } catch (error) {
            console.error("Error initiating Token to ETH Swap:", error);
            setIsLoading(false);
        }
    }, [fromAmount, toAmount, dexAddress, tokenContractConfig, dexContractConfig, approve, tokenToEthSwap, zdexDecimals]);

    const handleAddLiquidity = useCallback(() => {
        if (!ethLiquidityAmount || !liquidityAmount || zdexDecimals === undefined) {
            console.warn("Liquidity amounts or token decimals are missing for adding liquidity.");
            return;
        }
        try {
            setIsLoading(true);
            const parsedEthLiquidityAmount = parseEther(ethLiquidityAmount); // ETH amount
            const parsedTokenLiquidityAmount = parseUnits(liquidityAmount, zdexDecimals); // ZDEX amount

            approve({
                ...tokenContractConfig,
                functionName: 'approve',
                args: [dexAddress, parsedTokenLiquidityAmount]
            }, {
                onSuccess: () => {
                    console.log("Approval successful, proceeding with adding liquidity...");
                    addLiquidity({
                        ...dexContractConfig,
                        functionName: 'addLiquidity',
                        value: parsedEthLiquidityAmount,
                        args: [parsedTokenLiquidityAmount]
                    }, {
                        onSuccess: () => {
                            console.log("Add liquidity successful");
                            setEthLiquidityAmount('');
                            setLiquidityAmount('');
                            setIsLoading(false);
                        },
                        onError: (error) => {
                            console.error("Add liquidity failed:", error);
                            setIsLoading(false);
                        }
                    });
                },
                onError: (error) => {
                    console.error("Liquidity approval failed:", error);
                    setIsLoading(false);
                }
            });
        } catch (error) {
            console.error("Error initiating Add Liquidity:", error);
            setIsLoading(false);
        }
    }, [ethLiquidityAmount, liquidityAmount, tokenContractConfig, dexContractConfig, approve, addLiquidity, zdexDecimals]);

    const handleRemoveLiquidity = useCallback(() => {
        if (!liquidityAmount || zdexDecimals === undefined) {
            console.warn("Liquidity amount or token decimals are missing for removing liquidity.");
            return;
        }
        try {
            setIsLoading(true);
            const parsedLiquidityAmount = parseUnits(liquidityAmount, zdexDecimals); // ZDEX amount to remove

            removeLiquidity({
                ...dexContractConfig,
                functionName: 'removeLiquidity',
                args: [parsedLiquidityAmount]
            }, {
                onSuccess: () => {
                    console.log("Remove liquidity successful");
                    setLiquidityAmount('');
                    setIsLoading(false);
                },
                onError: (error) => {
                    console.error("Remove liquidity failed:", error);
                    setIsLoading(false);
                }
            });
        } catch (error) {
            console.error("Error initiating Remove Liquidity:", error);
            setIsLoading(false);
        }
    }, [liquidityAmount, dexContractConfig, removeLiquidity, zdexDecimals]);

    return {
        tokenAddress,
        dexAddress,
        isConnected,
        address,
        fromAmount,
        toAmount,
        setFromAmount,
        setToAmount,
        slippage,
        setSlippage,
        getSwapOutput,
        handleEthToTokenSwap,
        handleTokenToEthSwap,
        liquidityAmount,
        ethLiquidityAmount,
        setLiquidityAmount,
        setEthLiquidityAmount,
        handleAddLiquidity,
        handleRemoveLiquidity,
        ethBalance,
        tokenBalance,
        ethReserve,
        tokenReserve,
        allowance,
        tokenPrice,
        chainId,
        isLoading
    };
};