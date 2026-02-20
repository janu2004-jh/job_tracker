import React, { useState, useEffect } from 'react'
import { getAllTestItems, getTestChecklist, toggleTestItem, resetTestChecklist, getTestSummary } from '../utils/testChecklist'

export function TestPage() {
  const [checklist, setChecklist] = useState(getTestChecklist)
  const summary = getTestSummary()

  useEffect(() => {
    setChecklist(getTestChecklist())
  }, [])

  const handleToggle = (itemId) => {
    const updated = toggleTestItem(itemId)
    setChecklist(updated)
  }

  const handleReset = () => {
    if (window.confirm('Reset all test checkboxes?')) {
      resetTestChecklist()
      setChecklist({})
    }
  }

  return (
    <div className="page-block page-block--test">
      <h1 className="page-block__title">Test Checklist</h1>

      <div className="test-summary">
        <p className="test-summary__count">
          Tests Passed: <strong>{summary.passed} / {summary.total}</strong>
        </p>
        {!summary.allPassed && (
          <p className="test-summary__warning">
            Resolve all issues before shipping.
          </p>
        )}
      </div>

      <div className="test-checklist card">
        <ul className="test-checklist__list">
          {getAllTestItems().map((item) => (
            <li key={item.id} className="test-checklist__item">
              <label className="test-checklist__label">
                <input
                  type="checkbox"
                  className="test-checklist__checkbox"
                  checked={Boolean(checklist[item.id])}
                  onChange={() => handleToggle(item.id)}
                />
                <span className="test-checklist__text">{item.label}</span>
                {item.hint && (
                  <span className="test-checklist__hint" title={item.hint}>
                    ℹ️
                  </span>
                )}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="test-actions">
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Reset Test Status
        </button>
      </div>
    </div>
  )
}
