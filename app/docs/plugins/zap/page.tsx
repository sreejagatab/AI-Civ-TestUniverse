'use client';

import { DocPage, DocSection, CodeBlock, InfoBox, ParamTable } from '@/components/docs/DocPage';

export default function ZapPage() {
  return (
    <DocPage
      title="ZAP Plugin"
      description="OWASP ZAP security scanning"
      badge="Plugins"
      prev={{ title: 'Lighthouse', href: '/docs/plugins/lighthouse' }}
      next={{ title: 'Axe', href: '/docs/plugins/axe' }}
    >
      <DocSection title="Overview">
        <p className="text-slate-300 mb-4">
          The ZAP plugin integrates OWASP ZAP for dynamic application security
          testing (DAST). It includes both baseline (passive) and full (active) modes.
        </p>
        <ParamTable params={[
          { name: 'Plugin ID', type: '-', description: 'zap-baseline, zap-full' },
          { name: 'Tool', type: '-', description: 'OWASP ZAP' },
          { name: 'Family', type: '-', description: 'security' },
          { name: 'Target Types', type: '-', description: 'web, api' },
        ]} />
      </DocSection>

      <DocSection title="Scan Modes">
        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Baseline Scan (Passive)</h4>
        <p className="text-slate-300 mb-4">
          Safe for production - only passive analysis, no attack payloads.
        </p>
        <CodeBlock title="bash">{`aiciv run https://example.com --plugins=zap-baseline`}</CodeBlock>

        <h4 className="text-lg font-semibold text-white mt-6 mb-3">Full Scan (Active)</h4>
        <InfoBox type="error" title="Requires Attack Mode">
          Full scan sends attack payloads and requires explicit approval.
        </InfoBox>
        <CodeBlock title="bash">{`aiciv run https://staging.example.com --plugins=zap-full --attack-mode`}</CodeBlock>
      </DocSection>

      <DocSection title="Configuration">
        <CodeBlock title="target.yaml">{`plan:
  plugins:
    - zap-baseline

  plugin_config:
    zap-baseline:
      # Spider configuration
      spider:
        max_duration: 60      # seconds
        max_depth: 5
        max_children: 10

      # Ajax spider for SPAs
      ajax_spider:
        enabled: true
        max_duration: 120

      # Rules to ignore
      ignore_rules:
        - 10096  # Timestamp Disclosure

      # Custom scan policy
      policy: "Default Policy"

    zap-full:
      # Active scan configuration
      active_scan:
        max_duration: 600
        threads: 5
        strength: medium  # low, medium, high, insane

      # Attack vectors
      attack_vectors:
        - sqli
        - xss
        - path_traversal
        - command_injection`}</CodeBlock>
      </DocSection>

      <DocSection title="OWASP Top 10 Coverage">
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li>A01:2021 - Broken Access Control</li>
          <li>A02:2021 - Cryptographic Failures</li>
          <li>A03:2021 - Injection (SQL, XSS, etc.)</li>
          <li>A04:2021 - Insecure Design</li>
          <li>A05:2021 - Security Misconfiguration</li>
          <li>A06:2021 - Vulnerable Components</li>
          <li>A07:2021 - Auth Failures</li>
          <li>A08:2021 - Data Integrity Failures</li>
          <li>A09:2021 - Logging Failures</li>
          <li>A10:2021 - SSRF</li>
        </ul>
      </DocSection>

      <DocSection title="Example Finding">
        <CodeBlock title="SQL Injection Finding">{`{
  "title": "SQL Injection in Search Parameter",
  "severity": "critical",
  "confidence": 0.98,
  "family": "security",
  "category": "injection",
  "tool": {
    "plugin_id": "zap-baseline",
    "tool_name": "OWASP ZAP",
    "rule_id": "40018"
  },
  "location": {
    "url": "https://example.com/search",
    "method": "GET",
    "parameter": "q"
  },
  "evidence": [{
    "type": "har",
    "artifact_ref": "artifacts/zap/sqli-request.har"
  }],
  "fix": {
    "summary": "Use parameterized queries",
    "references": ["https://owasp.org/www-community/attacks/SQL_Injection"]
  }
}`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
