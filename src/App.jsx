import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import {
  LandingPage,
  DashboardPage,
  SettingsPage,
  SavedPage,
  DigestPage,
  ProofPage,
  TestPage,
} from './pages'
import { ShipPage } from './pages/ShipPage'
import { FinalProofPage } from './pages/FinalProofPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="digest" element={<DigestPage />} />
          <Route path="proof" element={<ProofPage />} />
        </Route>
        <Route path="/jt" element={<AppShell />}>
          <Route path="07-test" element={<TestPage />} />
          <Route path="08-ship" element={<ShipPage />} />
          <Route path="proof" element={<FinalProofPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
