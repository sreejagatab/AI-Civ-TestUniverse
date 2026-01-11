'use client';

import { DocPage, DocSection, CodeBlock, InfoBox, ParamTable } from '@/components/docs/DocPage';

export default function PoliciesPage() {
  return (
    <DocPage
      title="Policies"
      description="Define quality thresholds and constraints"
      badge="Core Concepts"
      prev={{ title: 'Targets', href: '/docs/concepts/targets' }}
      next={{ title: 'Plans', href: '/docs/concepts/plans' }}
    >
      <DocSection title="What is a Policy?">
        <p className="text-slate-300 mb-4">
          A Policy defines your quality standards: what severity levels matter,
          which test families to run, and the thresholds for pass/fail decisions.
        </p>
      </DocSection>

      <DocSection title="Policy Configuration">
        <CodeBlock title="policy.yaml">{`policy:
  # Quality gate thresholds
  gate:
    critical: 0    # Fail if any critical findings
    high: 3        # Fail if more than 3 high findings
    medium: null   # No threshold for medium
    low: null      # No threshold for low

  # Test families to include
  families:
    - security
    - performance
    - accessibility
    - api

  # Minimum confidence to report
  confidence_threshold: 0.6

  # Severity threshold (ignore below this)
  severity_threshold: low

  # Time constraints
  timebox_seconds: 600

  # Rate limiting
  rate_limit:
    requests_per_second: 10
    burst: 20`}</CodeBlock>
      </DocSection>

      <DocSection title="Test Families">
        <ParamTable params={[
          { name: 'security', type: 'family', description: 'OWASP Top 10, security headers, secrets, dependencies' },
          { name: 'performance', type: 'family', description: 'Core Web Vitals, load testing, TTFB' },
          { name: 'accessibility', type: 'family', description: 'WCAG 2.1 compliance, screen reader compatibility' },
          { name: 'api', type: 'family', description: 'Contract validation, schema compliance' },
          { name: 'functional', type: 'family', description: 'User journeys, form validation, navigation' },
          { name: 'mobile', type: 'family', description: 'Mobile-specific testing' },
          { name: 'infrastructure', type: 'family', description: 'Container security, IaC scanning' },
          { name: 'observability', type: 'family', description: 'SLO evaluation, synthetic monitoring' },
        ]} />
      </DocSection>

      <DocSection title="Quality Gates">
        <p className="text-slate-300 mb-4">
          Quality gates determine if a scan passes or fails:
        </p>
        <CodeBlock title="Gate Configuration">{`# Strict: No critical or high findings allowed
gate:
  critical: 0
  high: 0

# Moderate: Allow some high findings
gate:
  critical: 0
  high: 5
  medium: 20

# Permissive: Only block on critical
gate:
  critical: 0

# CI mode shorthand
aiciv run target.yaml --gate="critical=0,high=3"`}</CodeBlock>

        <InfoBox type="info" title="Exit Codes">
          When a quality gate fails, TestUniverse exits with code 1 (GATE_FAIL),
          which fails your CI pipeline.
        </InfoBox>
      </DocSection>

      <DocSection title="Inheritance">
        <p className="text-slate-300 mb-4">
          Policies can inherit from base policies:
        </p>
        <CodeBlock title="Policy Inheritance">{`# base-policy.yaml
policy:
  gate:
    critical: 0
  families:
    - security
    - performance

# team-policy.yaml
policy:
  extends: base-policy.yaml
  gate:
    high: 5  # Override high threshold
  families:
    - accessibility  # Add to families`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
