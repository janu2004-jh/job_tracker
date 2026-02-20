import React, { useState } from 'react'
import { JOBS } from '../data/jobs'
import { getSavedJobIds, removeSavedJobId } from '../utils/savedJobs'
import { getPreferences } from '../utils/preferences'
import { computeMatchScore } from '../utils/matchScore'
import { getStatusMap, setStatus } from '../utils/jobStatus'
import { JobCard } from '../components/JobCard'
import { ViewJobModal } from '../components/ViewJobModal'
import { Toast } from '../components/Toast'

export function SavedPage() {
  const [savedIds, setSavedIds] = useState(getSavedJobIds())
  const [statusMap, setStatusMap] = useState(getStatusMap)
  const [modalJob, setModalJob] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  const preferences = getPreferences()
  const savedJobs = JOBS.filter((j) => savedIds.includes(j.id)).map((job) => ({
    ...job,
    matchScore: computeMatchScore(job, preferences),
  }))

  const handleUnsave = (jobId) => {
    removeSavedJobId(jobId)
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

  return (
    <div className="page-block page-block--full">
      <h1 className="page-block__title">Saved</h1>
      {savedJobs.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state__message">
            No saved jobs yet. Save jobs from the Dashboard to see them here.
          </p>
        </div>
      ) : (
        <>
          <div className="job-list">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                matchScore={job.matchScore}
                currentStatus={statusMap[job.id] || 'Not Applied'}
                onView={setModalJob}
                onSave={handleUnsave}
                onApply={handleApply}
                onStatusChange={handleStatusChange}
                isSaved={true}
              />
            ))}
          </div>
          {modalJob && (
            <ViewJobModal job={modalJob} onClose={() => setModalJob(null)} />
          )}
          <Toast
            message={toastMessage}
            visible={toastVisible}
            onDismiss={() => setToastVisible(false)}
          />
        </>
      )}
    </div>
  )
}
