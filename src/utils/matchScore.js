/**
 * Deterministic match score for a job given user preferences.
 * Cap at 100. Exact rules per specification.
 */
export function computeMatchScore(job, preferences) {
  if (!preferences) return 0

  let score = 0

  const roleKeywords = parseCommaList((preferences.roleKeywords || '').trim())
  const preferredLocations = Array.isArray(preferences.preferredLocations) ? preferences.preferredLocations : []
  const preferredMode = Array.isArray(preferences.preferredMode) ? preferences.preferredMode : []
  const experienceLevel = (preferences.experienceLevel || '').trim()
  const userSkills = parseCommaList((preferences.skills || '').trim())

  const titleLower = (job.title || '').toLowerCase()
  const descLower = (job.description || '').toLowerCase()

  // +25 if any roleKeyword appears in job.title (case-insensitive)
  if (roleKeywords.length > 0) {
    for (const kw of roleKeywords) {
      if (kw && titleLower.includes(kw.toLowerCase())) {
        score += 25
        break
      }
    }
  }

  // +15 if any roleKeyword appears in job.description
  if (roleKeywords.length > 0) {
    for (const kw of roleKeywords) {
      if (kw && descLower.includes(kw.toLowerCase())) {
        score += 15
        break
      }
    }
  }

  // +15 if job.location matches preferredLocations
  if (preferredLocations.length > 0 && job.location && preferredLocations.includes(job.location)) {
    score += 15
  }

  // +10 if job.mode matches preferredMode
  if (preferredMode.length > 0 && job.mode && preferredMode.includes(job.mode)) {
    score += 10
  }

  // +10 if job.experience matches experienceLevel
  if (experienceLevel && job.experience === experienceLevel) {
    score += 10
  }

  // +15 if overlap between job.skills and user skills (any match)
  const jobSkills = Array.isArray(job.skills) ? job.skills.map((s) => (s || '').trim().toLowerCase()) : []
  if (userSkills.length > 0 && jobSkills.length > 0) {
    const userSet = new Set(userSkills.map((s) => s.toLowerCase()))
    for (const js of jobSkills) {
      if (js && userSet.has(js)) {
        score += 15
        break
      }
    }
  }

  // +5 if postedDaysAgo <= 2
  if (typeof job.postedDaysAgo === 'number' && job.postedDaysAgo <= 2) {
    score += 5
  }

  // +5 if source is LinkedIn
  if (job.source === 'LinkedIn') {
    score += 5
  }

  return Math.min(100, score)
}

function parseCommaList(str) {
  if (!str) return []
  return str.split(',').map((s) => s.trim()).filter(Boolean)
}
