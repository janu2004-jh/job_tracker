const STORAGE_KEY = 'jobTrackerStatus'

const DEFAULT_STATUS = 'Not Applied'

export function getStatus(jobId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATUS
    const data = JSON.parse(raw)
    const record = data[jobId]
    if (!record || !record.status) return DEFAULT_STATUS
    return record.status
  } catch {
    return DEFAULT_STATUS
  }
}

/** Returns { status, updatedAt } or null if not set / default. */
export function getStatusRecord(jobId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    const record = data[jobId]
    if (!record || record.status === DEFAULT_STATUS) return null
    return record
  } catch {
    return null
  }
}

/** Set status for a job. Persists updatedAt. */
export function setStatus(jobId, status) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const data = raw ? JSON.parse(raw) : {}
    data[jobId] = {
      status: status || DEFAULT_STATUS,
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (_) {}
}

/** Plain map jobId -> status for filtering/display. */
export function getStatusMap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const data = JSON.parse(raw)
    const map = {}
    for (const [id, record] of Object.entries(data)) {
      map[id] = record && record.status ? record.status : DEFAULT_STATUS
    }
    return map
  } catch {
    return {}
  }
}

/** All records with status !== Not Applied, sorted by updatedAt desc. */
export function getAllStatusRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    const list = []
    for (const [jobId, record] of Object.entries(data)) {
      if (record && record.status && record.status !== DEFAULT_STATUS) {
        list.push({
          jobId,
          status: record.status,
          updatedAt: record.updatedAt || '',
        })
      }
    }
    list.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
    return list
  } catch {
    return []
  }
}
