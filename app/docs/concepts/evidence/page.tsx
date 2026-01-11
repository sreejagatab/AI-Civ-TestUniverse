'use client';

import { DocPage, DocSection, CodeBlock, InfoBox, ParamTable } from '@/components/docs/DocPage';

export default function EvidencePage() {
  return (
    <DocPage
      title="Evidence"
      description="Proof and artifacts for every finding"
      badge="Core Concepts"
      prev={{ title: 'Findings', href: '/docs/concepts/findings' }}
      next={{ title: 'Authorization', href: '/docs/governance/authorization' }}
    >
      <DocSection title="What is Evidence?">
        <p className="text-slate-300 mb-4">
          Every finding in TestUniverse is backed by evidence - artifacts that
          prove the issue exists and can be reproduced. No claim without proof.
        </p>
      </DocSection>

      <DocSection title="Evidence Types">
        <ParamTable params={[
          { name: 'screenshot', type: 'image', description: 'Visual capture of the issue' },
          { name: 'har', type: 'file', description: 'HTTP Archive with request/response' },
          { name: 'video', type: 'file', description: 'Screen recording of reproduction' },
          { name: 'trace', type: 'file', description: 'Playwright/Puppeteer trace file' },
          { name: 'log', type: 'text', description: 'Console or server logs' },
          { name: 'json', type: 'data', description: 'Structured tool output' },
          { name: 'html', type: 'file', description: 'HTML report from tool' },
        ]} />
      </DocSection>

      <DocSection title="Evidence Structure">
        <CodeBlock title="Evidence in Finding">{`{
  "evidence": [
    {
      "type": "screenshot",
      "artifact_ref": "artifacts/screenshots/sqli-error.png",
      "description": "Database error message revealing SQL syntax",
      "timestamp": "2024-01-15T10:30:15Z"
    },
    {
      "type": "har",
      "artifact_ref": "artifacts/network/request-123.har",
      "description": "HTTP request with injection payload",
      "timestamp": "2024-01-15T10:30:14Z"
    },
    {
      "type": "log",
      "content": "SQLITE_ERROR: near \\"1\\": syntax error",
      "description": "Server error log showing SQL error"
    }
  ]
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Evidence Storage">
        <p className="text-slate-300 mb-4">
          Evidence is stored in the results directory:
        </p>
        <CodeBlock title="Directory Structure">{`results/
├── report.html
├── report.json
├── report.sarif.json
└── artifacts/
    ├── screenshots/
    │   ├── lighthouse-filmstrip-001.png
    │   ├── axe-violation-001.png
    │   └── zap-finding-001.png
    ├── network/
    │   ├── lighthouse.har
    │   └── zap-requests.har
    ├── traces/
    │   └── playwright-trace.zip
    ├── reports/
    │   ├── lighthouse.html
    │   ├── axe.json
    │   └── zap-report.html
    └── logs/
        └── console.log`}</CodeBlock>
      </DocSection>

      <DocSection title="Evidence Retention">
        <CodeBlock title="Retention Configuration">{`output:
  evidence:
    # Keep evidence for 30 days
    retention_days: 30

    # Compress artifacts
    compress: true

    # Maximum size per artifact (MB)
    max_artifact_size: 50

    # What to include
    include:
      - screenshots
      - har
      - reports

    # What to exclude
    exclude:
      - video  # Too large`}</CodeBlock>

        <InfoBox type="warning" title="Secrets Redaction">
          TestUniverse automatically redacts secrets from evidence. API keys,
          passwords, and tokens are replaced with [REDACTED] before storage.
        </InfoBox>
      </DocSection>

      <DocSection title="Viewing Evidence">
        <CodeBlock title="CLI Commands">{`# List evidence for a run
aiciv evidence list --run-id=run_xyz789

# Extract specific artifact
aiciv evidence get --run-id=run_xyz789 --artifact=screenshots/sqli-error.png

# Open HTML report
aiciv report open --run-id=run_xyz789`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
