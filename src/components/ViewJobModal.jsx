import React, { useEffect } from 'react'

export function ViewJobModal({ job, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!job) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content__header">
          <h2 id="modal-title" className="modal-content__title">{job.title}</h2>
          <button type="button" className="modal-content__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <p className="modal-content__company">{job.company}</p>
        <div className="modal-content__section">
          <h3 className="modal-content__label">Description</h3>
          <p className="modal-content__body">{job.description}</p>
        </div>
        <div className="modal-content__section">
          <h3 className="modal-content__label">Skills</h3>
          <div className="modal-content__skills">
            {job.skills.map((skill) => (
              <span key={skill} className="modal-content__skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
