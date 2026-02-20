import React from 'react'

export function SecondaryPanel({
  stepExplanation,
  promptContent,
  onCopy,
  onBuildInLovable,
  onItWorked,
  onError,
  onAddScreenshot,
}) {
  return (
    <aside className="secondary-panel" role="complementary">
      {stepExplanation && (
        <p className="secondary-panel__explanation text-small">{stepExplanation}</p>
      )}
      {promptContent != null && (
        <div className="secondary-panel__prompt-box">
          <pre className="secondary-panel__prompt-content">{promptContent}</pre>
          <div className="secondary-panel__actions">
            <button type="button" className="btn btn-secondary" onClick={onCopy}>
              Copy
            </button>
            <button type="button" className="btn btn-primary" onClick={onBuildInLovable}>
              Build in Lovable
            </button>
            <button type="button" className="btn btn-secondary" onClick={onItWorked}>
              It Worked
            </button>
            <button type="button" className="btn btn-secondary" onClick={onError}>
              Error
            </button>
            <button type="button" className="btn btn-secondary" onClick={onAddScreenshot}>
              Add Screenshot
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}
