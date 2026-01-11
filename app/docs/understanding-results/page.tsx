'use client';

import { DocPage, DocSection, CodeBlock, InfoBox } from '@/components/docs/DocPage';
import { Card, CardContent } from '@/components/ui/Card';

export default function UnderstandingResultsPage() {
  return (
    <DocPage
      title="Understanding Results"
      description="How to interpret and act on TestUniverse findings"
      badge="Getting Started"
      prev={{ title: 'First Scan', href: '/docs/first-scan' }}
      next={{ title: 'Targets', href: '/docs/concepts/targets' }}
    >
      <DocSection title="Severity Levels">
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <Card className="border-red-500/30">
            <CardContent className="py-4">
              <h4 className="font-bold text-red-400 mb-2">CRITICAL</h4>
              <p className="text-sm text-slate-300">
                Exploitable vulnerabilities requiring immediate action.
                Examples: SQL injection, RCE, exposed secrets.
              </p>
            </CardContent>
          </Card>
          <Card className="border-orange-500/30">
            <CardContent className="py-4">
              <h4 className="font-bold text-orange-400 mb-2">HIGH</h4>
              <p className="text-sm text-slate-300">
                Serious issues that should be addressed soon.
                Examples: XSS, missing security headers, auth bypass.
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-500/30">
            <CardContent className="py-4">
              <h4 className="font-bold text-amber-400 mb-2">MEDIUM</h4>
              <p className="text-sm text-slate-300">
                Issues to fix in your normal development cycle.
                Examples: CSRF, information disclosure, weak configs.
              </p>
            </CardContent>
          </Card>
          <Card className="border-green-500/30">
            <CardContent className="py-4">
              <h4 className="font-bold text-green-400 mb-2">LOW</h4>
              <p className="text-sm text-slate-300">
                Best practices and minor improvements.
                Examples: Missing headers, verbose errors, minor a11y issues.
              </p>
            </CardContent>
          </Card>
        </div>
      </DocSection>

      <DocSection title="Confidence Scores">
        <p className="text-slate-300 mb-4">
          Every finding includes a confidence score (0.0 to 1.0):
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li><strong className="text-white">0.90+</strong> - Confirmed: Reproduced deterministically 3/3 times</li>
          <li><strong className="text-white">0.60-0.89</strong> - Suspected: Detected but intermittent reproduction</li>
          <li><strong className="text-white">&lt;0.60</strong> - Unverified: Could not verify (auth required, timeout)</li>
        </ul>

        <InfoBox type="info" title="Confidence Factors">
          Confidence is calculated based on: reproduction success rate,
          tool reliability, evidence quality, and cross-tool correlation.
        </InfoBox>
      </DocSection>

      <DocSection title="Reading the HTML Report">
        <p className="text-slate-300 mb-4">
          The HTML report includes:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li><strong className="text-white">Executive Summary</strong> - High-level overview for stakeholders</li>
          <li><strong className="text-white">Findings by Severity</strong> - Grouped and sorted findings</li>
          <li><strong className="text-white">Evidence</strong> - Screenshots, HAR files, reproduction steps</li>
          <li><strong className="text-white">Remediation Guidance</strong> - How to fix each issue</li>
          <li><strong className="text-white">Tool Output</strong> - Raw output from each plugin</li>
        </ul>
      </DocSection>

      <DocSection title="Finding Schema">
        <CodeBlock title="finding.json">{`{
  "finding_id": "find_abc123",
  "title": "SQL Injection in Search Parameter",
  "severity": "critical",
  "confidence": 0.98,
  "family": "security",
  "tool": {
    "plugin_id": "zap-baseline",
    "rule_id": "40018"
  },
  "location": {
    "url": "https://example.com/search",
    "parameter": "q"
  },
  "evidence": [{
    "type": "har",
    "artifact_ref": "artifacts/request.har"
  }],
  "fix": {
    "summary": "Use parameterized queries",
    "references": ["https://owasp.org/..."]
  }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Acting on Results">
        <ol className="list-decimal list-inside text-slate-300 space-y-2">
          <li><strong className="text-white">Triage</strong> - Review critical/high findings first</li>
          <li><strong className="text-white">Verify</strong> - Check evidence and reproduce manually if needed</li>
          <li><strong className="text-white">Prioritize</strong> - Consider business impact and exploitability</li>
          <li><strong className="text-white">Fix</strong> - Follow remediation guidance</li>
          <li><strong className="text-white">Re-scan</strong> - Verify fixes with a new scan</li>
        </ol>
      </DocSection>
    </DocPage>
  );
}
