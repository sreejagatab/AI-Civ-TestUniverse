'use client';

import { DocPage, DocSection, CodeBlock, ParamTable } from '@/components/docs/DocPage';
import { Card, CardContent } from '@/components/ui/Card';

export default function ExitCodesPage() {
  return (
    <DocPage
      title="Exit Codes"
      description="Deterministic exit codes for CI/CD integration"
      badge="CI/CD"
      prev={{ title: 'Jenkins', href: '/docs/ci-cd/jenkins' }}
      next={{ title: 'Quality Gates', href: '/docs/ci-cd/quality-gates' }}
    >
      <DocSection title="Exit Code Reference">
        <div className="grid md:grid-cols-3 gap-4 my-6">
          <Card className="border-accent-500/30">
            <CardContent className="py-4 text-center">
              <div className="text-3xl font-mono font-bold text-accent-400 mb-2">0</div>
              <div className="font-semibold text-white">PASS</div>
              <p className="text-sm text-slate-400 mt-1">Quality gate passed</p>
            </CardContent>
          </Card>
          <Card className="border-red-500/30">
            <CardContent className="py-4 text-center">
              <div className="text-3xl font-mono font-bold text-red-400 mb-2">1</div>
              <div className="font-semibold text-white">GATE_FAIL</div>
              <p className="text-sm text-slate-400 mt-1">Findings exceeded threshold</p>
            </CardContent>
          </Card>
          <Card className="border-red-500/30">
            <CardContent className="py-4 text-center">
              <div className="text-3xl font-mono font-bold text-red-400 mb-2">2</div>
              <div className="font-semibold text-white">AUTH_BLOCKED</div>
              <p className="text-sm text-slate-400 mt-1">Authorization denied</p>
            </CardContent>
          </Card>
          <Card className="border-red-500/30">
            <CardContent className="py-4 text-center">
              <div className="text-3xl font-mono font-bold text-red-400 mb-2">3</div>
              <div className="font-semibold text-white">INTERNAL_ERROR</div>
              <p className="text-sm text-slate-400 mt-1">Unexpected error</p>
            </CardContent>
          </Card>
          <Card className="border-amber-500/30">
            <CardContent className="py-4 text-center">
              <div className="text-3xl font-mono font-bold text-amber-400 mb-2">4</div>
              <div className="font-semibold text-white">TIMEOUT</div>
              <p className="text-sm text-slate-400 mt-1">Timebox exceeded</p>
            </CardContent>
          </Card>
          <Card className="border-red-500/30">
            <CardContent className="py-4 text-center">
              <div className="text-3xl font-mono font-bold text-red-400 mb-2">5</div>
              <div className="font-semibold text-white">TARGET_UNREACHABLE</div>
              <p className="text-sm text-slate-400 mt-1">Cannot connect to target</p>
            </CardContent>
          </Card>
        </div>
      </DocSection>

      <DocSection title="Handling Exit Codes">
        <CodeBlock title="Bash">{`#!/bin/bash

aiciv run https://example.com --mode=ci --gate="critical=0,high=3"
EXIT_CODE=$?

case $EXIT_CODE in
    0)
        echo "✅ Quality gate passed"
        ;;
    1)
        echo "❌ Quality gate failed - too many findings"
        exit 1
        ;;
    2)
        echo "🔒 Authorization blocked - check your auth proof"
        exit 2
        ;;
    3)
        echo "💥 Internal error - check logs"
        exit 3
        ;;
    4)
        echo "⏱️ Timeout - scan took too long"
        # May want to continue or retry
        ;;
    5)
        echo "🔌 Target unreachable - check URL and network"
        exit 5
        ;;
    *)
        echo "Unknown exit code: $EXIT_CODE"
        exit $EXIT_CODE
        ;;
esac`}</CodeBlock>
      </DocSection>

      <DocSection title="CI/CD Usage">
        <CodeBlock title="GitHub Actions">{`- name: Run Security Scan
  id: scan
  run: aiciv run \${{ env.TARGET_URL }} --mode=ci --gate="critical=0,high=3"
  continue-on-error: true

- name: Handle Results
  run: |
    if [ "\${{ steps.scan.outcome }}" == "failure" ]; then
      echo "Scan failed or gate failed"
      # Check specific exit code in results
    fi`}</CodeBlock>

        <CodeBlock title="GitLab CI">{`security-scan:
  script:
    - aiciv run $CI_PROJECT_URL --mode=ci --gate="critical=0,high=3"
  allow_failure:
    exit_codes:
      - 4  # Allow timeout, but fail on other errors`}</CodeBlock>
      </DocSection>

      <DocSection title="Exit Code in Reports">
        <CodeBlock title="report.json">{`{
  "summary": {
    "exit_code": 1,
    "exit_reason": "GATE_FAIL",
    "gate": {
      "passed": false,
      "violations": [
        "HIGH: 5 findings exceed threshold of 3"
      ]
    }
  }
}`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
