import React from 'react'

function formatPosted(daysAgo) {
  if (daysAgo === 0) return 'Today'
  if (daysAgo === 1) return '1 day ago'
  return `${daysAgo} days ago`
}

function getMatchScoreClass(score) {
  if (score == null) return ''
  if (score >= 80) return 'job-card__match--high'
  if (score >= 60) return 'job-card__match--medium'
  if (score >= 40) return 'job-card__match--neutral'
  return 'job-card__match--low'
}

const STATUS_OPTIONS = ['Not Applied', 'Applied', 'Rejected', 'Selected']

function getStatusClass(status) {
  if (status === 'Applied') return 'job-card__status--applied'
  if (status === 'Rejected') return 'job-card__status--rejected'
  if (status === 'Selected') return 'job-card__status--selected'
  return 'job-card__status--neutral'
}

export function JobCard({ job, matchScore, onView, onSave, onApply, onStatusChange, isSaved, currentStatus = 'Not Applied' }) {
  const matchClass = getMatchScoreClass(matchScore)

  return (
    <article className="job-card card">
      <div className="job-card__header">
        <h2 className="job-card__title">{job.title}</h2>
        <div className="job-card__badges">
          {matchScore != null && (
            <span className={`job-card__match ${matchClass}`} title="Match score">
              {matchScore}
            </span>
          )}
          <span className="job-card__source" data-source={job.source}>
            {job.source}
          </span>
        </div>
      </div>
      <p className="job-card__company">{job.company}</p>
      <div className="job-card__meta">
        <span>{job.location}</span>
        <span className="job-card__dot" aria-hidden>·</span>
        <span>{job.mode}</span>
        <span className="job-card__dot" aria-hidden>·</span>
        <span>{job.experience}</span>
      </div>
      <p className="job-card__salary">{job.salaryRange}</p>
      <p className="job-card__posted">{formatPosted(job.postedDaysAgo)}</p>

      <div className="job-card__status-group">
        <span className="job-card__status-label">Status:</span>
        <div className="job-card__status-buttons" role="group" aria-label="Job application status">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              type="button"
              className={`job-card__status-btn ${getStatusClass(status)} ${currentStatus === status ? 'job-card__status-btn--active' : ''}`}
              onClick={() => onStatusChange && onStatusChange(job.id, status)}
              aria-pressed={currentStatus === status}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="job-card__actions">
        <button type="button" className="btn btn-secondary" onClick={() => onView(job)}>
          View
        </button>
        <button
          type="button"
          className={`btn ${isSaved ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => onSave(job.id)}
          aria-pressed={isSaved}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onApply(job.applyUrl)}
        >
          Apply
        </button>
      </div>
    </article>
  )
}
