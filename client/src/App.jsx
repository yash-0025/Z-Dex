import './App.css'
import { SwapPanel } from "./components/Dex/SwapPanel"
import { LiquidityPanel } from "./components/Dex/LiquidityPanel"
import { StatsPanel } from "./components/Dex/StatsPanel"
import Footer from './components/Layout/Footer'
import Header from './components/Layout/Header'
import Layout from './components/Layout/Layout'
import { useDex } from './hooks/useDex'
import { useState } from 'react'
import { Tab } from '@headlessui/react'

function App() {
    const dex = useDex();
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <Layout>
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Swap and Liquidity */}
                    <div className="lg:col-span-2 space-y-6">
                        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                            <div className="flex flex-col">
                                <Tab.List className="flex space-x-1 p-1 bg-gray-900/50 rounded-t-xl border-b border-gray-800/50">
                                    <Tab
                                        className={({ selected }) =>
                                            `px-4 py-2 text-sm font-medium rounded-t-md transition-all duration-200 ${selected
                                                ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800/30'
                                                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/20'
                                            }`
                                        }
                                    >
                                        Swap
                                    </Tab>
                                    <Tab
                                        className={({ selected }) =>
                                            `px-4 py-2 text-sm font-medium rounded-t-md transition-all duration-200 ${selected
                                                ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800/30'
                                                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/20'
                                            }`
                                        }
                                    >
                                        Liquidity
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels className="bg-gray-900/50 rounded-b-xl border border-t-0 border-gray-800/50">
                                    <Tab.Panel className="p-6">
                                        <SwapPanel />
                                    </Tab.Panel>
                                    <Tab.Panel className="p-6">
                                        <LiquidityPanel />
                                    </Tab.Panel>
                                </Tab.Panels>
                            </div>
                        </Tab.Group>
                    </div>

                    {/* Right Column - Stats */}
                    <div className="lg:col-span-1">
                        <StatsPanel dexAddress={dex.dexAddress} />
                    </div>
                </div>
            </div>
            <Footer />
        </Layout>
    );
}

export default App;