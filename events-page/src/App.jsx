import React from 'react'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Roadmap from './components/Roadmap'
import ClosingCTA from './components/ClosingCTA'

export default function App() {
  return (
    <main className="bg-ieee-bg min-h-screen text-white font-body selection:bg-ieee-blue selection:text-ieee-bg">
      <Hero />
      <StatsBar />
      <Roadmap />
      <ClosingCTA />
    </main>
  )
}
