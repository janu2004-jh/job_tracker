import React from 'react'
import { Link } from 'react-router-dom'

export function LandingPage() {
  return (
    <div className="landing-hero">
      <h1 className="landing-hero__headline">Stop Missing The Right Jobs.</h1>
      <p className="landing-hero__subtext">
        Precision-matched job discovery delivered daily at 9AM.
      </p>
      <Link to="/settings" className="btn btn-primary landing-hero__cta">
        Start Tracking
      </Link>
    </div>
  )
}
