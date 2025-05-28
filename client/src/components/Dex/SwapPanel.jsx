
import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDex } from '../../hooks/useDex';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { ArrowDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

export const SwapPanel = () => {
    const {
        fromAmount,
        toAmount,
        setFromAmount,
        setToAmount,
        handleEthToTokenSwap,
        handleTokenToEthSwap,
        getSwapOutput,
        ethBalance,
        tokenBalance,
        ethReserve,
        tokenReserve,
        isConnected,
        isLoading
    } = useDex();

    const [isEthToToken, setIsEthToToken] = useState(true);

    useEffect(() => {
        const updateOutput = async () => {
            if (!fromAmount) {
                setToAmount('');
                return;
            }
            const output = await getSwapOutput(fromAmount, isEthToToken);
            setToAmount(output);
        };
        updateOutput();
    }, [fromAmount, isEthToToken, getSwapOutput, setToAmount]);

    const handleConnectWallet = () => {
        document.dispatchEvent(new Event('openWalletModal'));
    };

    const handleReverse = useCallback(async () => {
        setIsEthToToken(prev => !prev);
        const currentFromAmount = fromAmount;
        const currentToAmount = toAmount;
        setFromAmount(currentToAmount);
        setToAmount(currentFromAmount);
    }, [fromAmount, toAmount, setFromAmount, setToAmount]);

    const currentSwapHandler = useCallback(() => {
        if (isEthToToken) {
            handleEthToTokenSwap();
        } else {
            handleTokenToEthSwap();
        }
    }, [isEthToToken, handleEthToTokenSwap, handleTokenToEthSwap]);

    const fromInputProps = useMemo(() => {
        if (isEthToToken) {
            return {
                label: "From (ETH)",
                balance: `${ethBalance} ETH`,
                token: "ETH",
                value: fromAmount,
                onChange: (e) => setFromAmount(e.target.value),
                disabled: !isConnected
            };
        } else {
            return {
                label: "From (ZDEX)",
                balance: tokenBalance === 'Loading...' ? 'Loading...' : `${tokenBalance} ZDEX`,
                token: "ZDEX",
                value: fromAmount,
                onChange: (e) => setFromAmount(e.target.value),
                disabled: !isConnected
            };
        }
    }, [isEthToToken, fromAmount, ethBalance, tokenBalance, setFromAmount, isConnected]);

    const toInputProps = useMemo(() => {
        if (isEthToToken) {
            return {
                label: "To (ZDEX)",
                balance: tokenBalance === 'Loading...' ? 'Loading...' : `${tokenBalance} ZDEX`,
                token: "ZDEX",
                value: toAmount,
                readOnly: true,
                disabled: !isConnected
            };
        } else {
            return {
                label: "To (ETH)",
                balance: `${ethBalance} ETH`,
                token: "ETH",
                value: toAmount,
                readOnly: true,
                disabled: !isConnected
            };
        }
    }, [isEthToToken, toAmount, ethBalance, tokenBalance, isConnected]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto"
        >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <motion.h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Swap Tokens
                    </motion.h2>
                    <motion.button
                        onClick={handleReverse}
                        className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                    >
                        <ArrowsRightLeftIcon className="h-5 w-5 text-blue-400" />
                    </motion.button>
                </div>

                <div className="space-y-4">
                    <Input {...fromInputProps} placeholder="0.0" />
                    
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.button
                                onClick={handleReverse}
                                className="p-2 z-10 bg-gray-800 rounded-full border-2 border-gray-700 hover:border-blue-400 transition-all"
                            >
                                <ArrowDownIcon className="h-5 w-5 text-blue-400" />
                            </motion.button>
                        </div>
                        <div className="h-px bg-gray-800/50 w-full" />
                    </div>

                    <Input {...toInputProps} placeholder="0.0" />

                    <div className="flex flex-col gap-1 text-sm text-gray-400 px-2">
                        <div className="flex justify-between">
                            <span>ETH Reserve</span>
                            <span className="text-gray-300">
                                {parseFloat(ethReserve).toFixed(4)} ETH
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>ZDEX Reserve</span>
                            <span className="text-gray-300">
                                {parseFloat(tokenReserve).toFixed(2)} ZDEX
                            </span>
                        </div>
                    </div>

                    <Button
                        onClick={isConnected ? currentSwapHandler : handleConnectWallet}
                        isLoading={isLoading}
                        disabled={isConnected ? (!fromAmount || isLoading) : false}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                    >
                        {isConnected ? 'Swap' : 'Connect Wallet'}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};