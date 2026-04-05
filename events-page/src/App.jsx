import React from 'react'
import Hero from './components/Hero'
import Roadmap from './components/Roadmap'
import ClosingCTA from './components/ClosingCTA'

export default function App() {
  return (
    <main className="bg-ieee-bg min-h-screen text-white font-body selection:bg-ieee-blue selection:text-ieee-bg">
      <Hero />
      
      {/* Decorative separator line between header and content */}
      <div className="w-full flex justify-center py-4 bg-ieee-bg relative z-10">
        <div className="w-full max-w-[95%] 2xl:max-w-[1400px] h-[2px] bg-gradient-to-r from-transparent via-ieee-blue/80 to-transparent shadow-[0_0_15px_rgba(0,163,255,0.4)]"></div>
      </div>
      
      <Roadmap />
      
      {/* Decorative separator line between content and footer */}
      <div className="w-full flex justify-center py-4 bg-ieee-bg relative z-10">
        <div className="w-full max-w-[95%] 2xl:max-w-[1400px] h-[2px] bg-gradient-to-r from-transparent via-ieee-blue/80 to-transparent shadow-[0_0_15px_rgba(0,163,255,0.4)]"></div>
      </div>

      <ClosingCTA />
    </main>
  )
}
