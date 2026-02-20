const STORAGE_KEY = 'jobTrackerPreferences'

const DEFAULTS = {
  roleKeywords: '',
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: '',
  skills: '',
  minMatchScore: 40,
}

export function getPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    const parsed = JSON.parse(raw)
    return {
      roleKeywords: parsed.roleKeywords ?? DEFAULTS.roleKeywords,
      preferredLocations: Array.isArray(parsed.preferredLocations) ? parsed.preferredLocations : DEFAULTS.preferredLocations,
      preferredMode: Array.isArray(parsed.preferredMode) ? parsed.preferredMode : DEFAULTS.preferredMode,
      experienceLevel: parsed.experienceLevel ?? DEFAULTS.experienceLevel,
      skills: parsed.skills ?? DEFAULTS.skills,
      minMatchScore: typeof parsed.minMatchScore === 'number' ? Math.max(0, Math.min(100, parsed.minMatchScore)) : DEFAULTS.minMatchScore,
    }
  } catch {
    return { ...DEFAULTS }
  }
}

export function setPreferences(prefs) {
  const payload = {
    roleKeywords: prefs.roleKeywords ?? DEFAULTS.roleKeywords,
    preferredLocations: Array.isArray(prefs.preferredLocations) ? prefs.preferredLocations : DEFAULTS.preferredLocations,
    preferredMode: Array.isArray(prefs.preferredMode) ? prefs.preferredMode : DEFAULTS.preferredMode,
    experienceLevel: prefs.experienceLevel ?? DEFAULTS.experienceLevel,
    skills: prefs.skills ?? DEFAULTS.skills,
    minMatchScore: typeof prefs.minMatchScore === 'number' ? Math.max(0, Math.min(100, prefs.minMatchScore)) : DEFAULTS.minMatchScore,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function hasPreferencesSet(prefs) {
  if (!prefs) return false
  const hasRole = (prefs.roleKeywords || '').trim().length > 0
  const hasLocations = Array.isArray(prefs.preferredLocations) && prefs.preferredLocations.length > 0
  const hasMode = Array.isArray(prefs.preferredMode) && prefs.preferredMode.length > 0
  const hasExperience = (prefs.experienceLevel || '').trim().length > 0
  const hasSkills = (prefs.skills || '').trim().length > 0
  return hasRole || hasLocations || hasMode || hasExperience || hasSkills
}
