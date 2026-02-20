import React from 'react'
import { TopBar } from './TopBar'
import { ContextHeader } from './ContextHeader'
import { PrimaryWorkspace } from './PrimaryWorkspace'
import { SecondaryPanel } from './SecondaryPanel'
import { ProofFooter } from './ProofFooter'

export function PageLayout({
  projectName,
  step,
  totalSteps,
  status,
  headline,
  subtext,
  primaryContent,
  stepExplanation,
  promptContent,
  onCopy,
  onBuildInLovable,
  onItWorked,
  onError,
  onAddScreenshot,
  proof,
  onProofChange,
}) {
  return (
    <div className="app-layout">
      <TopBar
        projectName={projectName}
        step={step}
        totalSteps={totalSteps}
        status={status}
      />
      <div className="app-main">
        <ContextHeader headline={headline} subtext={subtext} />
        <div className="app-workspace-row">
          <PrimaryWorkspace>{primaryContent}</PrimaryWorkspace>
          <SecondaryPanel
            stepExplanation={stepExplanation}
            promptContent={promptContent}
            onCopy={onCopy}
            onBuildInLovable={onBuildInLovable}
            onItWorked={onItWorked}
            onError={onError}
            onAddScreenshot={onAddScreenshot}
          />
        </div>
      </div>
      <ProofFooter proof={proof} onProofChange={onProofChange} />
    </div>
  )
}
