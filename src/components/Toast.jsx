import React, { useEffect } from 'react'

export function Toast({ message, visible, onDismiss, duration = 2500 }) {
  useEffect(() => {
    if (!visible || !message) return
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [visible, message, duration, onDismiss])

  if (!visible || !message) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      <p className="toast__message">{message}</p>
    </div>
  )
}
