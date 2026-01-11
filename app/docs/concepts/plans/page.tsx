'use client';

import { DocPage, DocSection, CodeBlock, InfoBox } from '@/components/docs/DocPage';

export default function PlansPage() {
  return (
    <DocPage
      title="Plans"
      description="Define what tests to run and how"
      badge="Core Concepts"
      prev={{ title: 'Policies', href: '/docs/concepts/policies' }}
      next={{ title: 'Findings', href: '/docs/concepts/findings' }}
    >
      <DocSection title="What is a Plan?">
        <p className="text-slate-300 mb-4">
          A Plan defines what tests to run, which plugins to use, and how to
          execute them. Plans can be pre-defined packs or custom configurations.
        </p>
      </DocSection>

      <DocSection title="Using Packs">
        <p className="text-slate-300 mb-4">
          Packs are pre-configured plans for common scenarios:
        </p>
        <CodeBlock title="Using a Pack">{`plan:
  pack: mvp-webapp

# Or via CLI
aiciv run https://example.com --pack=mvp-webapp`}</CodeBlock>

        <h4 className="text-lg font-semibold text-white mt-6 mb-3">Available Packs</h4>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li><code className="text-primary-400">mvp-webapp</code> - Lighthouse, Axe, ZAP Baseline, Security Headers</li>
          <li><code className="text-primary-400">mvp-api</code> - Newman, OpenAPI Validator, GraphQL Tester</li>
          <li><code className="text-primary-400">mvp-security</code> - ZAP Full, Secrets Scanner, Dependency Check, Trivy</li>
        </ul>
      </DocSection>

      <DocSection title="Custom Plans">
        <CodeBlock title="Custom Plan Configuration">{`plan:
  # Specific plugins to run
  plugins:
    - lighthouse
    - axe
    - zap-baseline
    - security-headers

  # Execution settings
  parallel: true
  max_workers: 4

  # Time constraints
  timebox_seconds: 600

  # Plugin-specific configuration
  plugin_config:
    lighthouse:
      categories:
        - performance
        - accessibility
        - best-practices
      throttling: mobile

    zap-baseline:
      ajax_spider: true
      max_duration: 300`}</CodeBlock>
      </DocSection>

      <DocSection title="Execution Modes">
        <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
          <li><code className="text-primary-400">ci</code> - Fast, focused scan for CI pipelines</li>
          <li><code className="text-primary-400">deep</code> - Comprehensive scan with all checks</li>
          <li><code className="text-primary-400">quick</code> - Rapid smoke test</li>
          <li><code className="text-primary-400">security</code> - Security-focused deep scan</li>
        </ul>
        <CodeBlock title="bash">{`# CI mode (default)
aiciv run target.yaml --mode=ci

# Deep scan (nightly)
aiciv run target.yaml --mode=deep

# Quick smoke test
aiciv run target.yaml --mode=quick`}</CodeBlock>
      </DocSection>

      <DocSection title="Plugin Dependencies">
        <p className="text-slate-300 mb-4">
          Plans automatically resolve plugin dependencies:
        </p>
        <CodeBlock title="DAG Execution">{`# Execution order is determined by the DAG engine
# Dependencies are respected automatically

plan:
  plugins:
    - recon          # Runs first (no dependencies)
    - lighthouse     # Depends on recon
    - zap-baseline   # Depends on recon
    - axe            # Depends on recon
    - security-headers  # Runs in parallel with others`}</CodeBlock>

        <InfoBox type="info" title="Parallelism">
          TestUniverse automatically parallelizes plugin execution where possible,
          respecting dependencies defined in the plugin manifests.
        </InfoBox>
      </DocSection>
    </DocPage>
  );
}
