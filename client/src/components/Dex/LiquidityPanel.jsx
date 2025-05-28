// import { useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import { useDex } from "../../hooks/useDex";
// import Button from "../UI/Button";
// import Input from "../UI/Input";
// import { PlusIcon, MinusIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

// export const LiquidityPanel = () => {
//     const [activeTab, setActiveTab] = useState('add');
//     const {
//         liquidityAmount,
//         ethLiquidityAmount,
//         setLiquidityAmount,
//         setEthLiquidityAmount,
//         handleAddLiquidity,
//         handleRemoveLiquidity,
//         ethBalance,
//         tokenBalance,
//         ethReserve,
//         tokenReserve,
//         isConnected,
//         isLoading
//     } = useDex();

//     const handleConnectWallet = () => {
//         document.dispatchEvent(new Event('openWalletModal'));
//     };

//     const poolShare = useMemo(() => {
//         const parsedLiquidityAmount = parseFloat(liquidityAmount);
//         const parsedTokenReserve = parseFloat(tokenReserve);

//         if (isNaN(parsedLiquidityAmount) || isNaN(parsedTokenReserve) || parsedTokenReserve === 0) {
//             return '0.00';
//         }
//         return ((parsedLiquidityAmount / parsedTokenReserve) * 100).toFixed(2);
//     }, [liquidityAmount, tokenReserve]);

//     const ethPoolRatio = useMemo(() => {
//         const parsedEthReserve = parseFloat(ethReserve);
//         const parsedTokenReserve = parseFloat(tokenReserve);

//         if (isNaN(parsedEthReserve) || isNaN(parsedTokenReserve) || parsedEthReserve === 0) {
//             return 'N/A';
//         }
//         return (parsedTokenReserve / parsedEthReserve).toFixed(6);
//     }, [ethReserve, tokenReserve]);

//     const estimatedEthReceived = useMemo(() => {
//         const parsedLiquidityAmount = parseFloat(liquidityAmount);
//         const parsedEthReserve = parseFloat(ethReserve);
//         const parsedTokenReserve = parseFloat(tokenReserve);

//         if (isNaN(parsedLiquidityAmount) || isNaN(parsedEthReserve) || isNaN(parsedTokenReserve) || parsedTokenReserve === 0) {
//             return '0';
//         }
//         return ((parsedLiquidityAmount * parsedEthReserve) / parsedTokenReserve).toFixed(6);
//     }, [liquidityAmount, ethReserve, tokenReserve]);

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="w-full max-w-md mx-auto"
//         >
//             <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg">
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-6">
//                     <motion.h2
//                         className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
//                         whileHover={{ scale: 1.02 }}
//                     >
//                         Liquidity
//                     </motion.h2>
//                     <div className="flex border-b border-gray-800/50">
//                         <button
//                             className={`px-3 py-1 text-sm font-medium relative ${activeTab === 'add' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
//                             onClick={() => setActiveTab('add')}
//                         >
//                             Add
//                             {activeTab === 'add' && (
//                                 <motion.div
//                                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
//                                     layoutId="liquidityTabIndicator"
//                                 />
//                             )}
//                         </button>
//                         <button
//                             className={`px-3 py-1 text-sm font-medium relative ${activeTab === 'remove' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
//                             onClick={() => setActiveTab('remove')}
//                         >
//                             Remove
//                             {activeTab === 'remove' && (
//                                 <motion.div
//                                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
//                                     layoutId="liquidityTabIndicator"
//                                 />
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 {activeTab === 'add' ? (
//                     <div className="space-y-4">
//                         <Input
//                             label="ETH Amount"
//                             balance={`${ethBalance} ETH`}
//                             value={ethLiquidityAmount}
//                             onChange={(e) => setEthLiquidityAmount(e.target.value)}
//                             placeholder="0.0"
//                             token="ETH"
//                             disabled={!isConnected}
//                         />

//                         <Input
//                             label="ZDEX Amount"
//                             balance={`${tokenBalance} ZDEX`}
//                             value={liquidityAmount}
//                             onChange={(e) => setLiquidityAmount(e.target.value)}
//                             placeholder="0.0"
//                             token="ZDEX"
//                             disabled={!isConnected}
//                         />

//                         <div className="flex flex-col gap-1 text-sm text-gray-400 px-2">
//                             <div className="flex justify-between">
//                                 <span>Pool Ratio (1 ETH)</span>
//                                 <span className="text-gray-300">
//                                     {ethReserve && tokenReserve ?
//                                         `${ethPoolRatio} ZDEX` :
//                                         'N/A'
//                                     }
//                                 </span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span>Your Share</span>
//                                 <span className="text-gray-300">{poolShare}%</span>
//                             </div>
//                         </div>

//                         <Button
//                             onClick={isConnected ? handleAddLiquidity : handleConnectWallet}
//                             isLoading={isLoading}
//                             disabled={isConnected ? (!ethLiquidityAmount || !liquidityAmount || isLoading) : false}
//                             className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
//                             whileHover={{ scale: 1.01 }}
//                             whileTap={{ scale: 0.99 }}
//                         >
//                             {isConnected ? (
//                                 <>
//                                     <PlusIcon className="h-5 w-5 mr-2" />
//                                     Add Liquidity
//                                 </>
//                             ) : 'Connect Wallet'}
//                         </Button>
//                     </div>
//                 ) : (
//                     <div className="space-y-4">
//                         <Input
//                             label="ZDEX Tokens to Remove"
//                             balance={`${tokenBalance} ZDEX`}
//                             value={liquidityAmount}
//                             onChange={(e) => setLiquidityAmount(e.target.value)}
//                             placeholder="0.0"
//                             token="ZDEX"
//                             disabled={!isConnected}
//                         />

//                         <div className="flex flex-col gap-1 text-sm text-gray-400 px-2">
//                             <div className="flex justify-between">
//                                 <span>You will receive</span>
//                                 <span className="text-gray-300">
//                                     {estimatedEthReceived} ETH
//                                 </span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span>And</span>
//                                 <span className="text-gray-300">{liquidityAmount || '0'} ZDEX</span>
//                             </div>
//                         </div>

//                         <Button
//                             onClick={isConnected ? handleRemoveLiquidity : handleConnectWallet}
//                             isLoading={isLoading}
//                             disabled={isConnected ? (!liquidityAmount || isLoading) : false}
//                             className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500"
//                             whileHover={{ scale: 1.01 }}
//                             whileTap={{ scale: 0.99 }}
//                         >
//                             {isConnected ? (
//                                 <>
//                                     <MinusIcon className="h-5 w-5 mr-2" />
//                                     Remove Liquidity
//                                 </>
//                             ) : 'Connect Wallet'}
//                         </Button>
//                     </div>
//                 )}
//             </div>
//         </motion.div>
//     );
// };


// src/components/LiquidityPanel.js
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useDex } from "../../hooks/useDex";
import Button from "../UI/Button";
import Input from "../UI/Input";
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
        isConnected,
        isLoading
    } = useDex();

    const handleConnectWallet = () => {
        document.dispatchEvent(new Event('openWalletModal'));
    };

    const poolShare = useMemo(() => {
        const parsedLiquidityAmount = parseFloat(liquidityAmount);
        const parsedTokenReserve = parseFloat(tokenReserve);

        if (isNaN(parsedLiquidityAmount) || isNaN(parsedTokenReserve) || parsedTokenReserve === 0) {
            return '0.00';
        }
        return ((parsedLiquidityAmount / parsedTokenReserve) * 100).toFixed(2);
    }, [liquidityAmount, tokenReserve]);

    const ethPoolRatio = useMemo(() => {
        const parsedEthReserve = parseFloat(ethReserve);
        const parsedTokenReserve = parseFloat(tokenReserve);

        if (isNaN(parsedEthReserve) || isNaN(parsedTokenReserve) || parsedEthReserve === 0) {
            return 'N/A';
        }
        return (parsedTokenReserve / parsedEthReserve).toFixed(6);
    }, [ethReserve, tokenReserve]);

    const estimatedEthReceived = useMemo(() => {
        const parsedLiquidityAmount = parseFloat(liquidityAmount);
        const parsedEthReserve = parseFloat(ethReserve);
        const parsedTokenReserve = parseFloat(tokenReserve);

        if (isNaN(parsedLiquidityAmount) || isNaN(parsedEthReserve) || isNaN(parsedTokenReserve) || parsedTokenReserve === 0) {
            return '0';
        }
        return ((parsedLiquidityAmount * parsedEthReserve) / parsedTokenReserve).toFixed(6);
    }, [liquidityAmount, ethReserve, tokenReserve]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto mt-6"
        >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <motion.h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Liquidity
                    </motion.h2>
                    <div className="flex border-b border-gray-800/50">
                        <button
                            className={`px-3 py-1 text-sm font-medium relative ${activeTab === 'add' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('add')}
                        >
                            Add
                            {activeTab === 'add' && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                                    layoutId="liquidityTabIndicator"
                                />
                            )}
                        </button>
                        <button
                            className={`px-3 py-1 text-sm font-medium relative ${activeTab === 'remove' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('remove')}
                        >
                            Remove
                            {activeTab === 'remove' && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                                    layoutId="liquidityTabIndicator"
                                />
                            )}
                        </button>
                    </div>
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
                            disabled={!isConnected}
                        />

                        <Input
                            label="ZDEX Amount"
                            balance={tokenBalance === 'Loading...' ? 'Loading...' : `${tokenBalance} ZDEX`}
                            value={liquidityAmount}
                            onChange={(e) => setLiquidityAmount(e.target.value)}
                            placeholder="0.0"
                            token="ZDEX"
                            disabled={!isConnected}
                        />

                        <div className="flex flex-col gap-1 text-sm text-gray-400 px-2">
                            <div className="flex justify-between">
                                <span>Pool Ratio (1 ETH)</span>
                                <span className="text-gray-300">
                                    {ethReserve && tokenReserve ?
                                        `${ethPoolRatio} ZDEX` :
                                        'N/A'
                                    }
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Your Share</span>
                                <span className="text-gray-300">{poolShare}%</span>
                            </div>
                        </div>

                        <Button
                            onClick={isConnected ? handleAddLiquidity : handleConnectWallet}
                            isLoading={isLoading}
                            disabled={isConnected ? (!ethLiquidityAmount || !liquidityAmount || isLoading) : false}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                        >
                            {isConnected ? (
                                <>
                                    <PlusIcon className="h-5 w-5 mr-2" />
                                    Add Liquidity
                                </>
                            ) : 'Connect Wallet'}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <Input
                            label="ZDEX Tokens to Remove"
                            balance={tokenBalance === 'Loading...' ? 'Loading...' : `${tokenBalance} ZDEX`}
                            value={liquidityAmount}
                            onChange={(e) => setLiquidityAmount(e.target.value)}
                            placeholder="0.0"
                            token="ZDEX"
                            disabled={!isConnected}
                        />

                        <div className="flex flex-col gap-1 text-sm text-gray-400 px-2">
                            <div className="flex justify-between">
                                <span>You will receive</span>
                                <span className="text-gray-300">
                                    {estimatedEthReceived} ETH
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>And</span>
                                <span className="text-gray-300">{liquidityAmount || '0'} ZDEX</span>
                            </div>
                        </div>

                        <Button
                            onClick={isConnected ? handleRemoveLiquidity : handleConnectWallet}
                            isLoading={isLoading}
                            disabled={isConnected ? (!liquidityAmount || isLoading) : false}
                            className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500"
                        >
                            {isConnected ? (
                                <>
                                    <MinusIcon className="h-5 w-5 mr-2" />
                                    Remove Liquidity
                                </>
                            ) : 'Connect Wallet'}
                        </Button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};