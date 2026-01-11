'use client';

import { DocPage, DocSection, CodeBlock, InfoBox, ParamTable } from '@/components/docs/DocPage';

export default function QualityGatesPage() {
  return (
    <DocPage
      title="Quality Gates"
      description="Configure pass/fail thresholds for your pipeline"
      badge="CI/CD"
      prev={{ title: 'Exit Codes', href: '/docs/ci-cd/exit-codes' }}
      next={{ title: 'CLI Reference', href: '/docs/api/cli' }}
    >
      <DocSection title="What are Quality Gates?">
        <p className="text-slate-300 mb-4">
          Quality gates define thresholds for findings. If findings exceed the
          threshold, the scan fails (exit code 1), blocking your pipeline.
        </p>
      </DocSection>

      <DocSection title="Configuration">
        <CodeBlock title="CLI Usage">{`# Block on any critical or more than 3 high findings
aiciv run https://example.com --gate="critical=0,high=3"

# Block only on critical findings
aiciv run https://example.com --gate="critical=0"

# Strict: No high-severity issues allowed
aiciv run https://example.com --gate="critical=0,high=0"

# Permissive: Only block on critical
aiciv run https://example.com --gate="critical=0,high=999,medium=999"`}</CodeBlock>

        <CodeBlock title="YAML Configuration">{`policy:
  gate:
    critical: 0      # Fail if any critical findings
    high: 3          # Fail if more than 3 high findings
    medium: null     # No threshold (don't fail on medium)
    low: null        # No threshold (don't fail on low)

    # Additional conditions
    new_findings_only: false  # Only count new findings
    min_confidence: 0.7       # Only count findings with 70%+ confidence`}</CodeBlock>
      </DocSection>

      <DocSection title="Gate Evaluation">
        <CodeBlock title="Evaluation Logic">{`Gate Evaluation:
─────────────────────────────────────────
Threshold: critical=0, high=3

Findings:
  CRITICAL: 0 ≤ 0 ✅
  HIGH:     5 > 3  ❌
  MEDIUM:   10 (no threshold)
  LOW:      20 (no threshold)

Result: GATE_FAIL (exit code 1)
Reason: HIGH findings (5) exceed threshold (3)`}</CodeBlock>
      </DocSection>

      <DocSection title="Common Patterns">
        <h4 className="text-lg font-semibold text-white mt-4 mb-3">PR Gate (Strict)</h4>
        <CodeBlock title="bash">{`# Block PR on any critical or high findings
aiciv run \$PR_URL --gate="critical=0,high=0"`}</CodeBlock>

        <h4 className="text-lg font-semibold text-white mt-6 mb-3">Main Branch (Moderate)</h4>
        <CodeBlock title="bash">{`# Allow some high findings on main
aiciv run \$STAGING_URL --gate="critical=0,high=5"`}</CodeBlock>

        <h4 className="text-lg font-semibold text-white mt-6 mb-3">Nightly Scan (Permissive)</h4>
        <CodeBlock title="bash">{`# Nightly scans report but rarely fail
aiciv run \$STAGING_URL --gate="critical=0,high=20,medium=50"`}</CodeBlock>
      </DocSection>

      <DocSection title="Baseline Comparison">
        <p className="text-slate-300 mb-4">
          Compare against a baseline to only fail on new findings:
        </p>
        <CodeBlock title="bash">{`# First run: create baseline
aiciv run https://example.com --save-baseline=baseline.json

# Subsequent runs: compare against baseline
aiciv run https://example.com \\
  --baseline=baseline.json \\
  --gate="critical=0,high=0" \\
  --new-only`}</CodeBlock>
        <InfoBox type="info" title="New Findings Only">
          With <code>--new-only</code>, only findings not in the baseline count
          toward the gate threshold.
        </InfoBox>
      </DocSection>

      <DocSection title="Gate Report">
        <CodeBlock title="Gate Results in report.json">{`{
  "gate": {
    "passed": false,
    "thresholds": {
      "critical": 0,
      "high": 3
    },
    "actual": {
      "critical": 0,
      "high": 5,
      "medium": 10,
      "low": 20
    },
    "violations": [
      "HIGH: 5 findings exceed threshold of 3"
    ],
    "exit_code": 1,
    "exit_reason": "GATE_FAIL"
  }
}`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
