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
  const dex = useDex()
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Layout>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Swap and Liquidity */}
          <div className="lg:col-span-2 space-y-6">
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-800/50 p-1">
                <Tab
                  className={({ selected }) =>
                    `w-full py-2.5 text-sm font-medium rounded-lg transition-all ${selected
                      ? 'bg-blue-600/90 text-white shadow'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`
                  }
                >
                  Swap
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full py-2.5 text-sm font-medium rounded-lg transition-all ${selected
                      ? 'bg-blue-600/90 text-white shadow'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`
                  }
                >
                  Liquidity
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel>
                  <SwapPanel />
                </Tab.Panel>
                <Tab.Panel>
                  <LiquidityPanel />
                </Tab.Panel>
              </Tab.Panels>
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
  )
}

export default App