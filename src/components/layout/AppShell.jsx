import React from 'react'
import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'

export function AppShell() {
  return (
    <div className="app-shell">
      <TopNav />
      <div className="app-shell__main">
        <Outlet />
      </div>
    </div>
  )
}
