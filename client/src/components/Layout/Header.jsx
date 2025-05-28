import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useAccount, 
  useDisconnect,
  useEnsName,
  useEnsAvatar,
  useConnect
} from 'wagmi';
import { 
  ArrowRightEndOnRectangleIcon,
  WalletIcon
} from '@heroicons/react/24/outline';
import { shortenAddress } from '../../utils/helpers';

const Header = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  // Add event listener for external open requests
  useEffect(() => {
    const handleOpenModal = () => setWalletModalOpen(true);
    document.addEventListener('openWalletModal', handleOpenModal);
    return () => document.removeEventListener('openWalletModal', handleOpenModal);
  }, []);

  const handleDisconnect = () => {
    try {
      disconnect();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800"
    >
      <div className='max-w-7xl mx-auto px-6 py-3 flex justify-between items-center'>
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <svg 
              className="h-9 w-9" 
              viewBox="0 0 40 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="zdex-gradient-header" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient id="zdex-inner-header" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
              
              <path
                d="M20 2 L32 10 L32 26 L20 34 L8 26 L8 10 Z"
                fill="url(#zdex-gradient-header)"
                opacity="0.9"
              />
              
              <g fill="url(#zdex-inner-header)">
                <rect x="12" y="12" width="2" height="12" rx="1" />
                <rect x="26" y="12" width="2" height="12" rx="1" />
                <rect x="12" y="12" width="16" height="2" rx="1" />
                <path d="M14 18 L26 18 L14 22 L26 22 Z" fill="white" opacity="0.9" />
                <rect x="12" y="22" width="16" height="2" rx="1" />
              </g>
              
              <circle cx="12" cy="8" r="1.5" fill="#60A5FA" opacity="0.7" />
              <circle cx="28" cy="8" r="1.5" fill="#60A5FA" opacity="0.7" />
              <circle cx="34" cy="20" r="1.5" fill="#60A5FA" opacity="0.7" />
              <circle cx="28" cy="32" r="1.5" fill="#60A5FA" opacity="0.7" />
              <circle cx="12" cy="32" r="1.5" fill="#60A5FA" opacity="0.7" />
              <circle cx="6" cy="20" r="1.5" fill="#60A5FA" opacity="0.7" />
            </svg>
          </motion.div>
          <h1 className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
            ZDEX
          </h1>
        </motion.div>

        {/* Wallet Connection */}
        {isConnected ? (
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2"
          >
            {ensAvatar ? (
              <img 
                src={ensAvatar} 
                alt={ensName} 
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <WalletIcon className="h-5 w-5 text-blue-400" />
              </div>
            )}
            <span className="text-sm font-medium text-gray-100">
              {ensName || shortenAddress(address)}
            </span>
            <button 
              onClick={handleDisconnect}
              className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-gray-400 hover:text-red-400" />
            </button>
          </motion.div>
        ) : (
          <ConnectWalletButton 
            walletModalOpen={walletModalOpen}
            setWalletModalOpen={setWalletModalOpen}
          />
        )}
      </div>
    </motion.header>
  );
};

const ConnectWalletButton = ({ walletModalOpen, setWalletModalOpen }) => {
  const { connectors, connect } = useConnect();

  const handleConnect = (connector) => {
    try {
      connect({ connector });
      setWalletModalOpen(false);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setWalletModalOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
      >
        <WalletIcon className="h-5 w-5 text-blue-400 group-hover:text-purple-300 transition-colors" />
        <span className="font-medium text-gray-100 group-hover:text-white">
          Connect Wallet
        </span>
        <ArrowRightEndOnRectangleIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-300 transition-colors" />
      </motion.button>

      <AnimatePresence>
        {walletModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-gray-800 shadow-lg ring-1 ring-gray-700 focus:outline-none z-50 border border-gray-700/50"
          >
            <div className="py-1">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => handleConnect(connector)}
                  className="block w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-gray-700/50 hover:text-blue-300 transition-colors"
                >
                  {connector.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default Header;