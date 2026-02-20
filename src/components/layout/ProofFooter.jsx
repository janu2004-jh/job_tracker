import React from 'react'

const CHECKLIST_ITEMS = [
  { id: 'ui', label: 'UI Built', proofKey: 'uiBuilt' },
  { id: 'logic', label: 'Logic Working', proofKey: 'logicWorking' },
  { id: 'test', label: 'Test Passed', proofKey: 'testPassed' },
  { id: 'deployed', label: 'Deployed', proofKey: 'deployed' },
]

export function ProofFooter({ proof = {}, onProofChange }) {
  return (
    <footer className="proof-footer" role="contentinfo">
      <div className="proof-footer__checklist">
        {CHECKLIST_ITEMS.map(({ id, label, proofKey }) => (
          <label key={id} className="proof-footer__item">
            <input
              type="checkbox"
              className="proof-footer__checkbox"
              checked={Boolean(proof[proofKey])}
              onChange={(e) => onProofChange?.(proofKey, e.target.checked)}
              aria-label={label}
            />
            <span className="proof-footer__label">{label}</span>
          </label>
        ))}
      </div>
    </footer>
  )
}
