import React from 'react'

const MODES = ['All', 'Remote', 'Hybrid', 'Onsite']
const EXPERIENCE_OPTIONS = ['All', 'Fresher', '0-1', '1-3', '3-5']
const SOURCES = ['All', 'LinkedIn', 'Naukri', 'Indeed']
const STATUS_OPTIONS = ['All', 'Not Applied', 'Applied', 'Rejected', 'Selected']
const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'match', label: 'Match Score' },
  { value: 'salary', label: 'Salary' },
]

export function FilterBar({ filters, locations, onChange }) {
  const { keyword, location, mode, experience, source, status, sort } = filters

  return (
    <div className="filter-bar">
      <input
        type="search"
        className="input filter-bar__input filter-bar__keyword"
        placeholder="Search title or company"
        value={keyword}
        onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
        aria-label="Search by title or company"
      />
      <select
        className="input filter-bar__select"
        value={location}
        onChange={(e) => onChange({ ...filters, location: e.target.value })}
        aria-label="Filter by location"
      >
        <option value="">All locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
      <select
        className="input filter-bar__select"
        value={mode}
        onChange={(e) => onChange({ ...filters, mode: e.target.value })}
        aria-label="Filter by mode"
      >
        {MODES.map((m) => (
          <option key={m} value={m === 'All' ? '' : m}>{m}</option>
        ))}
      </select>
      <select
        className="input filter-bar__select"
        value={experience}
        onChange={(e) => onChange({ ...filters, experience: e.target.value })}
        aria-label="Filter by experience"
      >
        {EXPERIENCE_OPTIONS.map((opt) => (
          <option key={opt} value={opt === 'All' ? '' : opt}>{opt}</option>
        ))}
      </select>
      <select
        className="input filter-bar__select"
        value={source}
        onChange={(e) => onChange({ ...filters, source: e.target.value })}
        aria-label="Filter by source"
      >
        {SOURCES.map((s) => (
          <option key={s} value={s === 'All' ? '' : s}>{s}</option>
        ))}
      </select>
      <select
        className="input filter-bar__select"
        value={status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        aria-label="Filter by status"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s === 'All' ? '' : s}>{s}</option>
        ))}
      </select>
      <select
        className="input filter-bar__select"
        value={sort}
        onChange={(e) => onChange({ ...filters, sort: e.target.value })}
        aria-label="Sort order"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  )
}
