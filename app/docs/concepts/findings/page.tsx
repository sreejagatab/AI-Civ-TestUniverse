'use client';

import { DocPage, DocSection, CodeBlock, InfoBox, ParamTable } from '@/components/docs/DocPage';

export default function FindingsPage() {
  return (
    <DocPage
      title="Findings"
      description="Understanding test results and issues"
      badge="Core Concepts"
      prev={{ title: 'Plans', href: '/docs/concepts/plans' }}
      next={{ title: 'Evidence', href: '/docs/concepts/evidence' }}
    >
      <DocSection title="What is a Finding?">
        <p className="text-slate-300 mb-4">
          A Finding represents a single issue discovered during testing. All plugins
          output findings in a universal schema, making it easy to compare and triage.
        </p>
      </DocSection>

      <DocSection title="Finding Schema">
        <CodeBlock title="finding.json">{`{
  "schema_version": "1.0.0",
  "finding_id": "find_abc123",
  "run_id": "run_xyz789",
  "target_id": "my-webapp",

  "title": "SQL Injection in Search Parameter",
  "description": "The search parameter is vulnerable to SQL injection attacks.",

  "family": "security",
  "category": "injection",
  "severity": "critical",
  "confidence": 0.98,

  "tool": {
    "plugin_id": "zap-baseline",
    "tool_name": "OWASP ZAP",
    "tool_version": "2.14.0",
    "rule_id": "40018"
  },

  "location": {
    "url": "https://example.com/search",
    "method": "GET",
    "parameter": "q",
    "line": null,
    "column": null
  },

  "evidence": [{
    "type": "har",
    "artifact_ref": "artifacts/request.har",
    "description": "HTTP request/response showing injection"
  }],

  "fix": {
    "summary": "Use parameterized queries",
    "guidance": "Replace string concatenation with prepared statements",
    "references": [
      "https://owasp.org/www-community/attacks/SQL_Injection"
    ]
  },

  "metadata": {
    "cwe": "CWE-89",
    "cvss": 9.8,
    "first_seen": "2024-01-15T10:30:00Z"
  }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Severity Levels">
        <ParamTable params={[
          { name: 'critical', type: 'severity', description: 'Exploitable vulnerabilities requiring immediate action' },
          { name: 'high', type: 'severity', description: 'Serious issues that should be addressed soon' },
          { name: 'medium', type: 'severity', description: 'Issues to fix in normal development cycle' },
          { name: 'low', type: 'severity', description: 'Best practices and minor improvements' },
          { name: 'info', type: 'severity', description: 'Informational findings, no action required' },
        ]} />
      </DocSection>

      <DocSection title="Confidence Scoring">
        <p className="text-slate-300 mb-4">
          Confidence scores indicate how certain we are about a finding:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li><strong className="text-white">0.90-1.00</strong> - Confirmed: Reproduced 3/3 times</li>
          <li><strong className="text-white">0.70-0.89</strong> - High confidence: Strong evidence</li>
          <li><strong className="text-white">0.50-0.69</strong> - Medium confidence: Some uncertainty</li>
          <li><strong className="text-white">0.00-0.49</strong> - Low confidence: Needs manual verification</li>
        </ul>

        <InfoBox type="info" title="Confidence Factors">
          Confidence is calculated from: reproduction rate, tool reliability,
          evidence quality, and cross-tool correlation.
        </InfoBox>
      </DocSection>

      <DocSection title="Deduplication">
        <p className="text-slate-300 mb-4">
          TestUniverse automatically deduplicates findings from multiple tools:
        </p>
        <CodeBlock title="Deduplication Logic">{`# Findings are deduplicated based on:
# 1. Same location (URL + parameter)
# 2. Same category
# 3. Similar title (fuzzy match)

# Original: 68 findings from 4 tools
# After dedupe: 52 unique findings
# Removed: 16 duplicates

# Each deduplicated finding shows all source tools
"sources": [
  { "plugin": "zap-baseline", "rule_id": "40018" },
  { "plugin": "security-headers", "rule_id": "csp-missing" }
]`}</CodeBlock>
      </DocSection>

      <DocSection title="Filtering Findings">
        <CodeBlock title="CLI Filtering">{`# Filter by severity
aiciv results --severity=critical,high

# Filter by family
aiciv results --family=security

# Filter by confidence
aiciv results --min-confidence=0.8

# Filter by tool
aiciv results --tool=zap-baseline`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
