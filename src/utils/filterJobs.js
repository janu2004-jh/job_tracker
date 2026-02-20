/**
 * Filter and sort jobs. AND behavior for all filters.
 * Jobs may include matchScore for sort-by-match and threshold filter (applied by caller).
 */
export function filterAndSortJobs(jobs, filters) {
  const { keyword, location, mode, experience, source, sort } = filters
  let result = [...jobs]

  const kw = (keyword || '').trim().toLowerCase()
  if (kw) {
    result = result.filter(
      (j) =>
        (j.title || '').toLowerCase().includes(kw) ||
        (j.company || '').toLowerCase().includes(kw)
    )
  }
  if (location) {
    result = result.filter((j) => j.location === location)
  }
  if (mode) {
    result = result.filter((j) => j.mode === mode)
  }
  if (experience) {
    result = result.filter((j) => j.experience === experience)
  }
  if (source) {
    result = result.filter((j) => j.source === source)
  }

  // Sort: Latest = newest first (low postedDaysAgo first); Oldest = oldest first; Match = score desc; Salary = numeric desc
  if (sort === 'match') {
    result.sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
  } else if (sort === 'salary') {
    result.sort((a, b) => extractSalarySort(b) - extractSalarySort(a))
  } else if (sort === 'oldest') {
    result.sort((a, b) => (b.postedDaysAgo ?? 0) - (a.postedDaysAgo ?? 0))
  } else {
    // latest (default): newest first (ascending postedDaysAgo)
    result.sort((a, b) => (a.postedDaysAgo ?? 0) - (b.postedDaysAgo ?? 0))
  }

  return result
}

/** Extract a numeric value from salaryRange for sorting (higher first). */
function extractSalarySort(job) {
  const s = (job.salaryRange || '').trim()
  // Match first number: "3–5 LPA" -> 3, "₹30k–₹50k" -> 30, "10–18 LPA" -> 10
  const m = s.match(/(\d+)/)
  if (!m) return 0
  let n = parseInt(m[1], 10)
  if (s.includes('LPA') && n < 100) n *= 100000
  if (/k|K/.test(s) && n < 10000) n *= 1000
  return n
}

export function getUniqueLocations(jobs) {
  const set = new Set(jobs.map((j) => j.location).filter(Boolean))
  return Array.from(set).sort()
}
