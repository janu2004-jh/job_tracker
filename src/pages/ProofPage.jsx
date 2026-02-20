import React from 'react'
import { Link } from 'react-router-dom'

export function ProofPage() {
  return (
    <div className="page-block">
      <h1 className="page-block__title">Proof</h1>
      <p className="page-block__subtext">
        Placeholder for artifact collection. Will be built in a later step.
      </p>
      <div className="proof-links card">
        <p className="proof-links__heading">Built-in test checklist</p>
        <p className="proof-links__text">
          Run the test checklist before shipping.
        </p>
        <div className="proof-links__actions">
          <Link to="/jt/07-test" className="btn btn-primary">
            Test Checklist
          </Link>
          <Link to="/jt/08-ship" className="btn btn-secondary">
            Ship
          </Link>
          <Link to="/jt/proof" className="btn btn-secondary">
            Final Proof & Submission
          </Link>
        </div>
      </div>
      <div className="empty-state empty-state--minimal">
        <p className="empty-state__message">
          Artifact collection area.
        </p>
      </div>
    </div>
  )
}
