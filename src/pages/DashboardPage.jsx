import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { JOBS } from '../data/jobs'
import { getSavedJobIds, saveJobId, removeSavedJobId } from '../utils/savedJobs'
import { getPreferences, hasPreferencesSet } from '../utils/preferences'
import { computeMatchScore } from '../utils/matchScore'
import { filterAndSortJobs, getUniqueLocations } from '../utils/filterJobs'
import { getStatusMap, setStatus } from '../utils/jobStatus'
import { JobCard } from '../components/JobCard'
import { ViewJobModal } from '../components/ViewJobModal'
import { FilterBar } from '../components/FilterBar'
import { Toast } from '../components/Toast'

const DEFAULT_FILTERS = {
  keyword: '',
  location: '',
  mode: '',
  experience: '',
  source: '',
  status: '',
  sort: 'latest',
}

export function DashboardPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [savedIds, setSavedIds] = useState(getSavedJobIds)
  const [statusMap, setStatusMap] = useState(getStatusMap)
  const [modalJob, setModalJob] = useState(null)
  const [showOnlyAboveThreshold, setShowOnlyAboveThreshold] = useState(false)
  const [preferences, setPreferences] = useState(getPreferences)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => {
    const handler = () => setPreferences(getPreferences())
    window.addEventListener('jobTrackerPreferencesSaved', handler)
    return () => window.removeEventListener('jobTrackerPreferencesSaved', handler)
  }, [])

  const locations = useMemo(() => getUniqueLocations(JOBS), [])

  const jobsWithScore = useMemo(() => {
    return JOBS.map((job) => ({
      ...job,
      matchScore: computeMatchScore(job, preferences),
    }))
  }, [preferences])

  const filteredJobs = useMemo(() => {
    let result = filterAndSortJobs(jobsWithScore, filters)
    if (showOnlyAboveThreshold && preferences) {
      const threshold = typeof preferences.minMatchScore === 'number' ? preferences.minMatchScore : 40
      result = result.filter((j) => (j.matchScore ?? 0) >= threshold)
    }
    if (filters.status) {
      result = result.filter((j) => (statusMap[j.id] || 'Not Applied') === filters.status)
    }
    return result
  }, [jobsWithScore, filters, showOnlyAboveThreshold, preferences, statusMap])

  const handleSave = (jobId) => {
    if (savedIds.includes(jobId)) {
      removeSavedJobId(jobId)
    } else {
      saveJobId(jobId)
    }
    setSavedIds(getSavedJobIds())
  }

  const handleApply = (url) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleStatusChange = (jobId, status) => {
    setStatus(jobId, status)
    setStatusMap((prev) => ({ ...prev, [jobId]: status }))
    if (status !== 'Not Applied') {
      setToastMessage(`Status updated: ${status}`)
      setToastVisible(true)
    }
  }

  const prefsSet = hasPreferencesSet(preferences)

  return (
    <div className="page-block page-block--full">
      <h1 className="page-block__title">Dashboard</h1>

      {!prefsSet && (
        <div className="dashboard-banner" role="status">
          <p className="dashboard-banner__text">
            Set your preferences to activate intelligent matching.
          </p>
          <Link to="/settings" className="dashboard-banner__link">Go to Settings</Link>
        </div>
      )}

      <FilterBar filters={filters} locations={locations} onChange={setFilters} />

      {prefsSet && (
        <label className="dashboard-threshold">
          <input
            type="checkbox"
            checked={showOnlyAboveThreshold}
            onChange={(e) => setShowOnlyAboveThreshold(e.target.checked)}
          />
          <span>Show only jobs above my threshold</span>
        </label>
      )}

      <div className="job-list">
        {filteredJobs.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__message">
              No roles match your criteria. Adjust filters or lower threshold.
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              matchScore={job.matchScore}
              currentStatus={statusMap[job.id] || 'Not Applied'}
              onView={setModalJob}
              onSave={handleSave}
              onApply={handleApply}
              onStatusChange={handleStatusChange}
              isSaved={savedIds.includes(job.id)}
            />
          ))
        )}
      </div>
      {modalJob && (
        <ViewJobModal job={modalJob} onClose={() => setModalJob(null)} />
      )}
      <Toast
        message={toastMessage}
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
    </div>
  )
}
