import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { JOBS } from '../data/jobs'
import { getPreferences, hasPreferencesSet } from '../utils/preferences'
import { computeMatchScore } from '../utils/matchScore'
import {
  getTodayKey,
  getDigestForDate,
  setDigestForDate,
  generateDigestJobs,
  formatDigestAsPlainText,
} from '../utils/digest'
import { getAllStatusRecords } from '../utils/jobStatus'

function formatDisplayDate() {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatStatusDate(isoString) {
  if (!isoString) return '—'
  try {
    return new Date(isoString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return '—'
  }
}

export function DigestPage() {
  const todayKey = getTodayKey()
  const [digestJobs, setDigestJobs] = useState(() => getDigestForDate(new Date()))
  const [copied, setCopied] = useState(false)
  const preferences = getPreferences()
  const prefsSet = hasPreferencesSet(preferences)

  const handleGenerate = useCallback(() => {
    const existing = getDigestForDate(new Date())
    if (existing && existing.length > 0) {
      setDigestJobs(existing)
      return
    }
    const top10 = generateDigestJobs(JOBS, preferences, computeMatchScore)
    if (top10.length === 0) {
      setDigestJobs([])
      return
    }
    setDigestForDate(new Date(), top10)
    setDigestJobs(top10)
  }, [preferences])

  const handleCopy = useCallback(() => {
    if (!digestJobs || digestJobs.length === 0) return
    const text = formatDigestAsPlainText(digestJobs, formatDisplayDate())
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [digestJobs])

  const handleEmailDraft = useCallback(() => {
    if (!digestJobs || digestJobs.length === 0) return
    const body = formatDigestAsPlainText(digestJobs, formatDisplayDate())
    const subject = encodeURIComponent('My 9AM Job Digest')
    const bodyEnc = encodeURIComponent(body)
    window.location.href = `mailto:?subject=${subject}&body=${bodyEnc}`
  }, [digestJobs])

  if (!prefsSet) {
    return (
      <div className="page-block">
        <h1 className="page-block__title">Digest</h1>
        <div className="digest-block digest-block--blocking">
          <p className="digest-block__message">
            Set preferences to generate a personalized digest.
          </p>
          <Link to="/settings" className="btn btn-primary digest-block__cta">Go to Settings</Link>
        </div>
      </div>
    )
  }

  const hasDigest = digestJobs && digestJobs.length > 0
  const isEmptyMatch = digestJobs && digestJobs.length === 0
  const statusUpdates = getAllStatusRecords()
  const statusUpdatesWithJob = statusUpdates
    .map((r) => ({ ...r, job: JOBS.find((j) => j.id === r.jobId) }))
    .filter((r) => r.job)
    .slice(0, 20)

  return (
    <div className="page-block page-block--digest">
      <h1 className="page-block__title">Digest</h1>

      {!hasDigest && !isEmptyMatch && (
        <div className="digest-actions">
          <button type="button" className="btn btn-primary" onClick={handleGenerate}>
            Generate Today's 9AM Digest (Simulated)
          </button>
        </div>
      )}

      {hasDigest && (
        <>
          <div className="digest-actions digest-actions--row">
            <button type="button" className="btn btn-secondary" onClick={handleCopy}>
              {copied ? 'Copied' : 'Copy Digest to Clipboard'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleEmailDraft}>
              Create Email Draft
            </button>
          </div>

          <div className="digest-card">
            <header className="digest-card__header">
              <h2 className="digest-card__headline">Top 10 Jobs For You — 9AM Digest</h2>
              <p className="digest-card__date">{formatDisplayDate()}</p>
            </header>

            <ul className="digest-card__list">
              {digestJobs.map((job) => (
                <li key={job.id} className="digest-card__item">
                  <div className="digest-card__item-main">
                    <span className="digest-card__item-title">{job.title}</span>
                    <span className="digest-card__item-company">{job.company}</span>
                    <span className="digest-card__item-meta">
                      {job.location} · {job.experience} · Match: {job.matchScore ?? 0}
                    </span>
                  </div>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary digest-card__apply"
                  >
                    Apply
                  </a>
                </li>
              ))}
            </ul>

            <footer className="digest-card__footer">
              This digest was generated based on your preferences.
            </footer>
          </div>
        </>
      )}

      {isEmptyMatch && (
        <div className="digest-block digest-block--empty">
          <p className="digest-block__message">
            No matching roles today. Check again tomorrow.
          </p>
          <button type="button" className="btn btn-secondary" onClick={handleGenerate}>
            Try again
          </button>
        </div>
      )}

      {hasDigest && (
        <p className="digest-demo-note">Demo Mode: Daily 9AM trigger simulated manually.</p>
      )}

      {prefsSet && statusUpdatesWithJob.length > 0 && (
        <section className="digest-status-section">
          <h2 className="digest-status-section__title">Recent Status Updates</h2>
          <ul className="digest-status-section__list">
            {statusUpdatesWithJob.map(({ jobId, status, updatedAt, job }) => (
              <li key={jobId} className="digest-status-section__item">
                <span className="digest-status-section__job-title">{job.title}</span>
                <span className="digest-status-section__company">{job.company}</span>
                <span className={`digest-status-section__status digest-status-section__status--${status.toLowerCase().replace(' ', '-')}`}>
                  {status}
                </span>
                <span className="digest-status-section__date">{formatStatusDate(updatedAt)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
