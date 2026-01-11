'use client';

import { DocPage, DocSection, CodeBlock, InfoBox } from '@/components/docs/DocPage';

export default function FirstScanPage() {
  return (
    <DocPage
      title="Your First Scan"
      description="Run your first security and quality scan"
      badge="Getting Started"
      prev={{ title: 'Installation', href: '/docs/installation' }}
      next={{ title: 'Understanding Results', href: '/docs/understanding-results' }}
    >
      <DocSection title="Quick Start">
        <p className="text-slate-300 mb-4">
          The fastest way to run a scan is with the CLI:
        </p>
        <CodeBlock title="bash">{`# Scan a website with default settings
aiciv run https://your-staging-site.com

# Use a specific pack
aiciv run https://your-staging-site.com --pack=mvp-webapp

# Run in CI mode with quality gates
aiciv run https://your-staging-site.com --mode=ci --gate="critical=0,high=3"`}</CodeBlock>
      </DocSection>

      <DocSection title="Using a Configuration File">
        <p className="text-slate-300 mb-4">
          For more control, create a target configuration file:
        </p>
        <CodeBlock title="target.yaml">{`# target.yaml
target:
  id: my-webapp
  type: web
  url: https://staging.example.com

  # Optional: Authentication
  auth:
    type: bearer
    token_env: STAGING_API_TOKEN

policy:
  severity_threshold: high
  families:
    - security
    - performance
    - accessibility

plan:
  pack: mvp-webapp
  timebox_seconds: 600

output:
  formats:
    - html
    - json
    - sarif
  dir: ./results`}</CodeBlock>
        <CodeBlock title="bash">{`# Run with config file
aiciv run target.yaml`}</CodeBlock>
      </DocSection>

      <DocSection title="Available Packs">
        <p className="text-slate-300 mb-4">
          TestUniverse includes pre-configured packs for common scenarios:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li><code className="text-primary-400">mvp-webapp</code> - Web applications (Lighthouse, Axe, ZAP Baseline, Security Headers)</li>
          <li><code className="text-primary-400">mvp-api</code> - REST/GraphQL APIs (Newman, OpenAPI Validator, Security Headers)</li>
          <li><code className="text-primary-400">mvp-security</code> - Security-focused (ZAP Full, Secrets Scanner, Dependency Check)</li>
        </ul>

        <InfoBox type="info" title="Custom Packs">
          You can also create custom packs by specifying individual plugins in your configuration.
        </InfoBox>
      </DocSection>

      <DocSection title="Understanding the Output">
        <p className="text-slate-300 mb-4">
          After a scan completes, you'll see a summary:
        </p>
        <CodeBlock title="Terminal Output">{`═══════════════════════════════════════════════
SUMMARY
═══════════════════════════════════════════════
  CRITICAL: 0
  HIGH:     2
  MEDIUM:   15
  LOW:      35

  Quality Gate: PASS (threshold: critical=0, high=5)
  Duration: 4m 32s

Reports:
  → results/report.html (human-readable)
  → results/report.json (machine-readable)
  → results/report.sarif (GitHub Security)`}</CodeBlock>
      </DocSection>

      <DocSection title="Next Steps">
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li>Learn how to <a href="/docs/understanding-results" className="text-primary-400 hover:underline">understand your results</a></li>
          <li>Explore <a href="/docs/concepts/targets" className="text-primary-400 hover:underline">target configuration</a></li>
          <li>Set up <a href="/docs/ci-cd/github-actions" className="text-primary-400 hover:underline">CI/CD integration</a></li>
        </ul>
      </DocSection>
    </DocPage>
  );
}
