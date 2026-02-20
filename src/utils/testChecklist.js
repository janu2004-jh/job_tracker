const STORAGE_KEY = 'jobTrackerTestChecklist'

const TEST_ITEMS = [
  { id: 'prefs-persist', label: 'Preferences persist after refresh', hint: 'Set preferences in Settings, refresh page, verify they remain.' },
  { id: 'match-score', label: 'Match score calculates correctly', hint: 'Set preferences, check job cards show match scores.' },
  { id: 'threshold-toggle', label: '"Show only matches" toggle works', hint: 'Enable toggle on Dashboard, verify only jobs above threshold show.' },
  { id: 'save-persist', label: 'Save job persists after refresh', hint: 'Save a job, refresh page, verify it remains saved.' },
  { id: 'apply-new-tab', label: 'Apply opens in new tab', hint: 'Click Apply button, verify new tab opens.' },
  { id: 'status-persist', label: 'Status update persists after refresh', hint: 'Change job status, refresh, verify status remains.' },
  { id: 'status-filter', label: 'Status filter works correctly', hint: 'Filter by status on Dashboard, verify correct jobs show.' },
  { id: 'digest-generate', label: 'Digest generates top 10 by score', hint: 'Generate digest, verify top 10 jobs by match score.' },
  { id: 'digest-persist', label: 'Digest persists for the day', hint: 'Generate digest, refresh page, verify it loads without regenerating.' },
  { id: 'no-console-errors', label: 'No console errors on main pages', hint: 'Navigate through Dashboard, Settings, Saved, Digest, check browser console.' },
]

export function getTestChecklist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function setTestChecklist(checklist) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist))
}

export function toggleTestItem(itemId) {
  const checklist = getTestChecklist()
  checklist[itemId] = !checklist[itemId]
  setTestChecklist(checklist)
  return checklist
}

export function resetTestChecklist() {
  localStorage.removeItem(STORAGE_KEY)
}

export function getAllTestItems() {
  return TEST_ITEMS
}

export function getTestSummary() {
  const checklist = getTestChecklist()
  const passed = TEST_ITEMS.filter((item) => checklist[item.id]).length
  return { passed, total: TEST_ITEMS.length, allPassed: passed === TEST_ITEMS.length }
}
