const STORAGE_KEY = 'jobTrackerProofArtifacts'

/** Basic URL validation: must start with http:// or https:// and contain a host. */
export function isValidUrl(str) {
  if (!str || typeof str !== 'string') return false
  const trimmed = str.trim()
  if (!trimmed) return false
  try {
    const u = new URL(trimmed)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export function getProofArtifacts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { lovableLink: '', githubLink: '', deployedUrl: '' }
    const parsed = JSON.parse(raw)
    return {
      lovableLink: parsed.lovableLink ?? '',
      githubLink: parsed.githubLink ?? '',
      deployedUrl: parsed.deployedUrl ?? '',
    }
  } catch {
    return { lovableLink: '', githubLink: '', deployedUrl: '' }
  }
}

export function setProofArtifacts(artifacts) {
  const payload = {
    lovableLink: (artifacts.lovableLink ?? '').trim(),
    githubLink: (artifacts.githubLink ?? '').trim(),
    deployedUrl: (artifacts.deployedUrl ?? '').trim(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function allLinksProvided(artifacts) {
  const a = artifacts || getProofArtifacts()
  return (
    isValidUrl(a.lovableLink) &&
    isValidUrl(a.githubLink) &&
    isValidUrl(a.deployedUrl)
  )
}

/** Returns 'Shipped' | 'In Progress' | 'Not Started'. Requires getTestSummary from testChecklist. */
export function getProjectStatus(getTestSummaryFn) {
  const artifacts = getProofArtifacts()
  const linksOk = allLinksProvided(artifacts)
  const testSummary = getTestSummaryFn ? getTestSummaryFn() : null
  const allTestsPassed = testSummary && testSummary.allPassed

  if (linksOk && allTestsPassed) return 'Shipped'
  if (linksOk || (testSummary && testSummary.passed > 0)) return 'In Progress'
  return 'Not Started'
}
