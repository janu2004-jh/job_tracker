import React from 'react'

const STATUS_OPTIONS = ['Not Started', 'In Progress', 'Shipped']

export function TopBar({ projectName = 'Project', step = 1, totalSteps = 1, status = 'Not Started' }) {
  return (
    <header className="top-bar" role="banner">
      <div className="top-bar__project">{projectName}</div>
      <div className="top-bar__progress" aria-label={`Step ${step} of ${totalSteps}`}>
        Step {step} / {totalSteps}
      </div>
      <div className="top-bar__status">
        <span className="top-bar__status-badge" data-status={STATUS_OPTIONS.includes(status) ? status.toLowerCase().replace(' ', '-') : 'not-started'}>
          {status}
        </span>
      </div>
    </header>
  )
}
