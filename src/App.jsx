import React, { useState } from 'react'
import { PageLayout } from './components/layout/PageLayout'

export default function App() {
  const [proof, setProof] = useState({})

  const handleProofChange = (key, value) => {
    setProof((p) => ({ ...p, [key]: value }))
  }

  return (
    <PageLayout
      projectName="Job Tracker"
      step={1}
      totalSteps={4}
      status="In Progress"
      headline="Design system"
      subtext="Layout and tokens are in place. No product features yet."
      primaryContent={
        <div className="card">
          <p className="text-body">
            Primary workspace: main product interaction lives here. Clean cards, predictable components.
          </p>
        </div>
      }
      stepExplanation="Short step explanation. Copyable prompt and actions sit in the secondary panel."
      promptContent={`Sample prompt text.\nCopy, Build in Lovable, It Worked, Error, Add Screenshot.`}
      onCopy={() => {}}
      onBuildInLovable={() => {}}
      onItWorked={() => {}}
      onError={() => {}}
      onAddScreenshot={() => {}}
      proof={proof}
      onProofChange={handleProofChange}
    />
  )
}
