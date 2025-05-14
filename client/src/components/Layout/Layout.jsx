import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-web3-dark text-gray-100 relative overflow-hidden">
      {/* Optional floating particles (like the Dribbble example) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default Layout