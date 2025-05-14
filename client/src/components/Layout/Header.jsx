import React from 'react';
import { motion } from "framer-motion";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { WalletIcon } from "@heroicons/react/24/solid";
import {BoltIcon} from '@heroicons/react/24/outline';

const Header = () => {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800"
        >
            <div className='max-w-7xl mx-auto px-6 py-3 flex justify-between items-center'>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 cursor-pointer"
                >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        {/* <span className="text-white font-bold text-lg">Z</span> */}
                        <BoltIcon/>
                    </div>
                    <h1 className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                        ZDEX
                    </h1>
                </motion.div>

                <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
                >
                    <WalletIcon className="h-5 w-5 text-blue-400 group-hover:text-purple-300 transition-colors" />
                    <span className="font-medium text-gray-100 group-hover:text-white">
                        Connect Wallet
                    </span>
                    <ArrowRightEndOnRectangleIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-300 transition-colors" />
                </motion.button>
            </div>
        </motion.header>
    );
};

export default Header;