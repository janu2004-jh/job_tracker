import React from 'react'

export function PlaceholderPage({ pageName }) {
  return (
    <div className="placeholder-page">
      <h1 className="placeholder-page__heading">{pageName}</h1>
      <p className="placeholder-page__subtext">
        This section will be built in the next step.
      </p>
    </div>
  )
}
