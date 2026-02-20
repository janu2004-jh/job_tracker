import React, { useState, useEffect } from 'react'
import { JOBS } from '../data/jobs'
import { getUniqueLocations } from '../utils/filterJobs'
import { getPreferences, setPreferences } from '../utils/preferences'

const MODES = ['Remote', 'Hybrid', 'Onsite']
const EXPERIENCE_OPTIONS = ['', 'Fresher', '0-1', '1-3', '3-5']

export function SettingsPage() {
  const [roleKeywords, setRoleKeywords] = useState('')
  const [preferredLocations, setPreferredLocations] = useState([])
  const [preferredMode, setPreferredMode] = useState([])
  const [experienceLevel, setExperienceLevel] = useState('')
  const [skills, setSkills] = useState('')
  const [minMatchScore, setMinMatchScore] = useState(40)
  const [saved, setSaved] = useState(false)

  const locations = getUniqueLocations(JOBS)

  useEffect(() => {
    const prefs = getPreferences()
    setRoleKeywords(prefs.roleKeywords || '')
    setPreferredLocations(Array.isArray(prefs.preferredLocations) ? prefs.preferredLocations : [])
    setPreferredMode(Array.isArray(prefs.preferredMode) ? prefs.preferredMode : [])
    setExperienceLevel(prefs.experienceLevel || '')
    setSkills(prefs.skills || '')
    setMinMatchScore(typeof prefs.minMatchScore === 'number' ? prefs.minMatchScore : 40)
  }, [])

  const handleModeChange = (mode) => {
    setPreferredMode((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    )
  }

  const handleLocationChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value)
    setPreferredLocations(selected)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPreferences({
      roleKeywords,
      preferredLocations,
      preferredMode,
      experienceLevel,
      skills,
      minMatchScore,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    try {
      window.dispatchEvent(new CustomEvent('jobTrackerPreferencesSaved'))
    } catch (_) {}
  }

  return (
    <div className="page-block">
      <h1 className="page-block__title">Settings</h1>
      <p className="page-block__subtext">
        Configure your job preferences. Saved to this device only.
      </p>
      <form className="settings-form card" onSubmit={handleSubmit}>
        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="role-keywords">
            Role keywords
          </label>
          <input
            id="role-keywords"
            type="text"
            className="input"
            placeholder="e.g. Frontend, React, Product Manager"
            value={roleKeywords}
            onChange={(e) => setRoleKeywords(e.target.value)}
          />
          <span className="settings-form__hint">Comma-separated</span>
        </div>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="locations">
            Preferred locations
          </label>
          <select
            id="locations"
            className="input settings-form__multiselect"
            multiple
            value={preferredLocations}
            onChange={handleLocationChange}
            aria-label="Preferred locations (hold Ctrl/Cmd to select multiple)"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <span className="settings-form__hint">Hold Ctrl/Cmd to select multiple</span>
        </div>

        <div className="settings-form__field">
          <span className="settings-form__label">Preferred mode</span>
          <div className="settings-form__checkboxes">
            {MODES.map((mode) => (
              <label key={mode} className="settings-form__checkbox-label">
                <input
                  type="checkbox"
                  checked={preferredMode.includes(mode)}
                  onChange={() => handleModeChange(mode)}
                />
                <span>{mode}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="experience">
            Experience level
          </label>
          <select
            id="experience"
            className="input"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="">Select level</option>
            {EXPERIENCE_OPTIONS.filter(Boolean).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="skills">
            Skills
          </label>
          <input
            id="skills"
            type="text"
            className="input"
            placeholder="e.g. Java, React, Python, SQL"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <span className="settings-form__hint">Comma-separated</span>
        </div>

        <div className="settings-form__field">
          <label className="settings-form__label" htmlFor="min-match-score">
            Minimum match score threshold: {minMatchScore}
          </label>
          <input
            id="min-match-score"
            type="range"
            min={0}
            max={100}
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(Number(e.target.value))}
            className="settings-form__slider"
          />
          <span className="settings-form__hint">0–100. Used with “Show only jobs above my threshold” on Dashboard.</span>
        </div>

        <div className="settings-form__actions">
          <button type="submit" className="btn btn-primary">
            {saved ? 'Saved' : 'Save preferences'}
          </button>
        </div>
      </form>
    </div>
  )
}
