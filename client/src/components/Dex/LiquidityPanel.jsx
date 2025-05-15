import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useDex } from "../../hooks/useDex";
import Button from "../UI/Button";
import  Input  from "../UI/Input"; 
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export const LiquidityPanel = () => {
    const [activeTab, setActiveTab] = useState('add');
    const {
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
    } = useDex();

    const poolShare = useMemo(() => {
        if (!liquidityAmount || !tokenReserve) return '0';
        return ((parseFloat(liquidityAmount) / parseFloat(tokenReserve)) * 100).toFixed(2);
    }, [liquidityAmount, tokenReserve]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg mt-6"
        >
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
                    <Input 
                        label="ETH Amount"
                        balance={`${ethBalance} ETH`}
                        value={ethLiquidityAmount}
                        onChange={(e) => setEthLiquidityAmount(e.target.value)}
                        placeholder="0.0"
                        token="ETH"
                    />
                    
                    <Input
                        label="ZDEX Amount"
                        balance={`${tokenBalance} ZDEX`}
                        value={liquidityAmount}
                        onChange={(e) => setLiquidityAmount(e.target.value)}
                        placeholder="0.0"
                        token="ZDEX"
                    />

                    <div className="bg-gray-900/20 rounded-xl p-4 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-800/30">
                            <span className="text-gray-400">Pool Ratio</span>
                            <span className="font-medium">
                                {ethReserve && tokenReserve ? 
                                `1 ETH = ${(parseFloat(tokenReserve)/parseFloat(ethReserve)).toFixed(6)} ZDEX` : 
                                'Loading...'}
                            </span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-400">Your Share</span>
                            <span className="font-medium">{poolShare}%</span>
                        </div>
                    </div>

                    <Button 
                        onClick={handleAddLiquidity}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                        disabled={!ethLiquidityAmount || !liquidityAmount}
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add Liquidity
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    <Input
                        label="LP Tokens to Remove"
                        balance={`${tokenBalance} LP`}
                        value={liquidityAmount}
                        onChange={(e) => setLiquidityAmount(e.target.value)}
                        placeholder="0.0"
                        token="LP"
                    />

                    <div className="bg-gray-900/20 rounded-xl p-4 text-sm">
                        <div className="flex justify-between py-2">
                            <span className="text-gray-400">You will receive</span>
                            <span className="font-medium">
                                {liquidityAmount && ethReserve && tokenReserve ? 
                                `${(parseFloat(liquidityAmount) * parseFloat(ethReserve) / parseFloat(tokenReserve)).toFixed(6)} ETH` : 
                                '0 ETH'}
                            </span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-400">And</span>
                            <span className="font-medium">{liquidityAmount || '0'} ZDEX</span>
                        </div>
                    </div>

                    <Button 
                        onClick={handleRemoveLiquidity}
                        className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500"
                        disabled={!liquidityAmount}
                    >
                        <MinusIcon className="h-5 w-5 mr-2" />
                        Remove Liquidity
                    </Button>
                </div>
            )}
        </motion.div>
    );
};