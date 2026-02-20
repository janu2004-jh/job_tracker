import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/saved', label: 'Saved' },
  { path: '/digest', label: 'Digest' },
  { path: '/settings', label: 'Settings' },
  { path: '/proof', label: 'Proof' },
  { path: '/jt/07-test', label: 'Test' },
]

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="top-nav" role="banner">
      <div className="top-nav__inner">
        <NavLink to="/" className="top-nav__brand" end>
          Job Notification Tracker
        </NavLink>

        <button
          type="button"
          className="top-nav__hamburger"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="top-nav__hamburger-bar" />
          <span className="top-nav__hamburger-bar" />
          <span className="top-nav__hamburger-bar" />
        </button>

        <nav
          className={`top-nav__links ${menuOpen ? 'top-nav__links--open' : ''}`}
          aria-label="Main"
        >
          {NAV_ITEMS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `top-nav__link ${isActive ? 'top-nav__link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
