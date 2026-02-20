import React, { useState, useCallback } from 'react'
import { getProofArtifacts, setProofArtifacts, isValidUrl, allLinksProvided, getProjectStatus } from '../utils/proofArtifacts'
import { getTestChecklist, getTestSummary, getAllTestItems } from '../utils/testChecklist'

const STEP_LABELS = [
  'Preferences persist after refresh',
  'Match score calculates correctly',
  '"Show only matches" toggle works',
  'Save job persists after refresh',
  'Apply opens in new tab',
  'Status tracking and filter work',
  'Digest generates and persists',
  'All test checklist items passed',
]

function buildSubmissionText(artifacts) {
  return [
    '------------------------------------------',
    'Job Notification Tracker — Final Submission',
    '------------------------------------------',
    '',
    'Lovable Project:',
    artifacts.lovableLink || '(not provided)',
    '',
    'GitHub Repository:',
    artifacts.githubLink || '(not provided)',
    '',
    'Live Deployment:',
    artifacts.deployedUrl || '(not provided)',
    '',
    'Core Features:',
    '- Intelligent match scoring',
    '- Daily digest simulation',
    '- Status tracking',
    '- Test checklist enforced',
    '',
    '------------------------------------------',
  ].join('\n')
}

export function FinalProofPage() {
  const [artifacts, setArtifacts] = useState(getProofArtifacts())
  const [errors, setErrors] = useState({ lovableLink: '', githubLink: '', deployedUrl: '' })
  const [touched, setTouched] = useState({})

  const checklist = getTestChecklist()
  const testItems = getAllTestItems()
  const testSummary = getTestSummary()
  const stepsCompleted = STEP_LABELS.map((_, i) => {
    if (i < 7) return Boolean(checklist[testItems[i]?.id])
    return testSummary.allPassed
  })
  const status = getProjectStatus(getTestSummary)
  const linksOk = allLinksProvided(artifacts)

  const updateLink = useCallback((field, value) => {
    const next = { ...artifacts, [field]: value }
    setArtifacts(next)
    setProofArtifacts(next)
    setTouched((t) => ({ ...t, [field]: true }))
    if (value.trim() === '' || isValidUrl(value)) {
      setErrors((e) => ({ ...e, [field]: '' }))
    } else {
      setErrors((e) => ({ ...e, [field]: 'Enter a valid URL (e.g. https://...)' }))
    }
  }, [artifacts])

  const handleCopySubmission = useCallback(() => {
    const text = buildSubmissionText(artifacts)
    navigator.clipboard.writeText(text).then(() => {})
  }, [artifacts])

  return (
    <div className="page-block page-block--proof-final">
      <h1 className="page-block__title">Project 1 — Job Notification Tracker</h1>

      <div className="proof-status-badge" data-status={status.toLowerCase().replace(' ', '-')}>
        {status}
      </div>

      {status === 'Shipped' && (
        <p className="proof-shipped-message">Project 1 Shipped Successfully.</p>
      )}

      <section className="proof-section card">
        <h2 className="proof-section__title">A) Step Completion Summary</h2>
        <ul className="proof-steps">
          {STEP_LABELS.map((label, i) => (
            <li key={i} className="proof-steps__item">
              <span className="proof-steps__checkbox" aria-hidden>
                {stepsCompleted[i] ? '✓' : '□'}
              </span>
              <span className="proof-steps__label">{label}</span>
              <span className="proof-steps__status">
                {stepsCompleted[i] ? 'Completed' : 'Pending'}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="proof-section card">
        <h2 className="proof-section__title">B) Artifact Collection</h2>
        <div className="proof-artifacts">
          <div className="proof-artifacts__field">
            <label className="proof-artifacts__label" htmlFor="proof-lovable">
              Lovable Project Link
            </label>
            <input
              id="proof-lovable"
              type="url"
              className="input proof-artifacts__input"
              placeholder="https://..."
              value={artifacts.lovableLink}
              onChange={(e) => updateLink('lovableLink', e.target.value)}
            />
            {touched.lovableLink && errors.lovableLink && (
              <span className="proof-artifacts__error">{errors.lovableLink}</span>
            )}
          </div>
          <div className="proof-artifacts__field">
            <label className="proof-artifacts__label" htmlFor="proof-github">
              GitHub Repository Link
            </label>
            <input
              id="proof-github"
              type="url"
              className="input proof-artifacts__input"
              placeholder="https://github.com/..."
              value={artifacts.githubLink}
              onChange={(e) => updateLink('githubLink', e.target.value)}
            />
            {touched.githubLink && errors.githubLink && (
              <span className="proof-artifacts__error">{errors.githubLink}</span>
            )}
          </div>
          <div className="proof-artifacts__field">
            <label className="proof-artifacts__label" htmlFor="proof-deployed">
              Deployed URL (Vercel or equivalent)
            </label>
            <input
              id="proof-deployed"
              type="url"
              className="input proof-artifacts__input"
              placeholder="https://..."
              value={artifacts.deployedUrl}
              onChange={(e) => updateLink('deployedUrl', e.target.value)}
            />
            {touched.deployedUrl && errors.deployedUrl && (
              <span className="proof-artifacts__error">{errors.deployedUrl}</span>
            )}
          </div>
        </div>
      </section>

      <div className="proof-actions">
        <button type="button" className="btn btn-primary" onClick={handleCopySubmission}>
          Copy Final Submission
        </button>
      </div>
    </div>
  )
}
