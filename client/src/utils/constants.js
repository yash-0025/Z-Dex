export const DEX_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_priceFeed",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "type": "error",
        "name": "ReentrancyGuardReentrantCall"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "provider",
                "type": "address",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "ethAmount",
                "type": "uint256",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256",
                "indexed": false
            }
        ],
        "type": "event",
        "name": "LiquidityAdded",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "provider",
                "type": "address",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "ethAmount",
                "type": "uint256",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256",
                "indexed": false
            }
        ],
        "type": "event",
        "name": "LiquidityRemoved",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "seller",
                "type": "address",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "ethAmount",
                "type": "uint256",
                "indexed": false
            }
        ],
        "type": "event",
        "name": "PurchaseETH",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "buyer",
                "type": "address",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "ethAmount",
                "type": "uint256",
                "indexed": false
            },
            {
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256",
                "indexed": false
            }
        ],
        "type": "event",
        "name": "PurchaseToken",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function",
        "name": "addLiquidity"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "minTokens",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function",
        "name": "ethToTokenSwap"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "getEthAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "ethAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "getTokenAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "getTokenPriceInETH",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "priceConsumer",
        "outputs": [
            {
                "internalType": "contract PriceConsumer",
                "name": "",
                "type": "address"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "liquidityTokens",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "removeLiquidity"
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "token",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "tokenReserve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minEth",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "tokenToEthSwap"
    }
]

export const TOKEN_ABI = [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "initialSupply",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "allowance",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "needed",
                            "type": "uint256"
                        }
                    ],
                    "type": "error",
                    "name": "ERC20InsufficientAllowance"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "sender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "balance",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "needed",
                            "type": "uint256"
                        }
                    ],
                    "type": "error",
                    "name": "ERC20InsufficientBalance"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "approver",
                            "type": "address"
                        }
                    ],
                    "type": "error",
                    "name": "ERC20InvalidApprover"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "receiver",
                            "type": "address"
                        }
                    ],
                    "type": "error",
                    "name": "ERC20InvalidReceiver"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "sender",
                            "type": "address"
                        }
                    ],
                    "type": "error",
                    "name": "ERC20InvalidSender"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        }
                    ],
                    "type": "error",
                    "name": "ERC20InvalidSpender"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address",
                            "indexed": true
                        },
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address",
                            "indexed": true
                        },
                        {
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256",
                            "indexed": false
                        }
                    ],
                    "type": "event",
                    "name": "Approval",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address",
                            "indexed": true
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address",
                            "indexed": true
                        },
                        {
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256",
                            "indexed": false
                        }
                    ],
                    "type": "event",
                    "name": "Transfer",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "allowance",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "approve",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "decimals",
                    "outputs": [
                        {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "name",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "symbol",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "transfer",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "transferFrom",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ]
                }
            ]


export const ZDEX_CONTRACT_ADDRESS = "0xF6552D52507e1E44B28075ab705aec6F782C4552"
export const TOKEN_CONTRACT_ADDRESS = "0x2B8A8A929f5a9f9a072D3e20E48D07575d95FC64"