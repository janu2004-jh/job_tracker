/**
 * Daily digest: persist per day as jobTrackerDigest_YYYY-MM-DD.
 * Top 10 jobs: matchScore descending, then postedDaysAgo ascending.
 */

export function getDigestStorageKey(date) {
  const d = typeof date === 'string' ? date : toDateString(date)
  return `jobTrackerDigest_${d}`
}

function toDateString(d) {
  if (!d) d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function getTodayKey() {
  return toDateString(new Date())
}

/** Get digest for a given date (default today). Returns array of jobs with matchScore or null. */
export function getDigestForDate(date = new Date()) {
  const key = getDigestStorageKey(date)
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return null
    return parsed
  } catch {
    return null
  }
}

/** Save digest for a given date. */
export function setDigestForDate(date, jobList) {
  const key = getDigestStorageKey(date)
  localStorage.setItem(key, JSON.stringify(jobList))
}

/**
 * Generate top 10 jobs: sort by matchScore desc, then postedDaysAgo asc.
 * Returns array of jobs with matchScore. Does not persist.
 */
export function generateDigestJobs(jobs, preferences, computeMatchScore) {
  const withScore = jobs.map((job) => ({
    ...job,
    matchScore: computeMatchScore(job, preferences),
  }))
  const sorted = [...withScore].sort((a, b) => {
    const scoreA = a.matchScore ?? 0
    const scoreB = b.matchScore ?? 0
    if (scoreB !== scoreA) return scoreB - scoreA
    return (a.postedDaysAgo ?? 999) - (b.postedDaysAgo ?? 999)
  })
  return sorted.slice(0, 10)
}

/** Format digest as plain text for clipboard / email body. */
export function formatDigestAsPlainText(jobList, dateLabel) {
  const lines = [
    'Top 10 Jobs For You — 9AM Digest',
    dateLabel,
    '',
    'This digest was generated based on your preferences.',
    '',
    '---',
    '',
  ]
  jobList.forEach((job, i) => {
    lines.push(`${i + 1}. ${job.title} — ${job.company}`)
    lines.push(`   ${job.location || '—'} · ${job.experience || '—'} · Match: ${job.matchScore ?? 0}`)
    lines.push(`   Apply: ${job.applyUrl || ''}`)
    lines.push('')
  })
  lines.push('---')
  lines.push('')
  lines.push('This digest was generated based on your preferences.')
  return lines.join('\n')
}
