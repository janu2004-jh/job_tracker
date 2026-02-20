import React from 'react'
import { Link } from 'react-router-dom'
import { getTestSummary } from '../utils/testChecklist'

export function ShipPage() {
  const summary = getTestSummary()

  if (!summary.allPassed) {
    return (
      <div className="page-block page-block--ship">
        <h1 className="page-block__title">Ship</h1>
        <div className="ship-lock card">
          <p className="ship-lock__message">
            All tests must pass before shipping.
          </p>
          <p className="ship-lock__count">
            Current: {summary.passed} / {summary.total} tests passed
          </p>
          <Link to="/jt/07-test" className="btn btn-primary">
            Go to Test Checklist
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-block page-block--ship">
      <h1 className="page-block__title">Ship</h1>
      <div className="ship-ready card">
        <p className="ship-ready__message">
          ✓ All tests passed. Ready to ship!
        </p>
      </div>
    </div>
  )
}
