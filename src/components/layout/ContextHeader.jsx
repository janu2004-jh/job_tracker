import React from 'react'

export function ContextHeader({ headline, subtext }) {
  return (
    <div className="context-header">
      <h1 className="context-header__headline">{headline}</h1>
      {subtext && <p className="context-header__subtext">{subtext}</p>}
    </div>
  )
}
