'use client';

import { DocPage, DocSection, CodeBlock, InfoBox } from '@/components/docs/DocPage';

export default function ScopeControlPage() {
  return (
    <DocPage
      title="Scope Control"
      description="Defining boundaries for testing"
      badge="Governance"
      prev={{ title: 'Authorization', href: '/docs/governance/authorization' }}
      next={{ title: 'Rate Limits', href: '/docs/governance/rate-limits' }}
    >
      <DocSection title="What is Scope Control?">
        <p className="text-slate-300 mb-4">
          Scope control defines what URLs and resources TestUniverse can access
          during a scan. This prevents accidental testing of production systems
          or unauthorized endpoints.
        </p>
      </DocSection>

      <DocSection title="Scope Configuration">
        <CodeBlock title="target.yaml">{`target:
  url: https://staging.example.com

scope:
  # Explicit allow list (glob patterns)
  include:
    - "https://staging.example.com/*"
    - "https://api.staging.example.com/*"

  # Explicit deny list (always takes precedence)
  exclude:
    - "*/admin/*"
    - "*/api/v1/users/delete/*"
    - "*/logout"
    - "*/_internal/*"

  # Domain restrictions
  same_origin: true
  allowed_domains:
    - "staging.example.com"
    - "api.staging.example.com"

  # Crawl limits
  max_depth: 5
  max_pages: 1000

  # Protocol restrictions
  protocols:
    - https  # Only HTTPS, no HTTP`}</CodeBlock>
      </DocSection>

      <DocSection title="Scope Enforcement">
        <p className="text-slate-300 mb-4">
          The Sentinel agent monitors all requests and blocks out-of-scope access:
        </p>
        <CodeBlock title="Sentinel Enforcement">{`# Request to https://staging.example.com/api/users
✓ ALLOWED - Matches include pattern

# Request to https://staging.example.com/admin/settings
✗ BLOCKED - Matches exclude pattern "*/admin/*"

# Request to https://production.example.com/api
✗ BLOCKED - Different domain, same_origin=true

# Request to http://staging.example.com/api
✗ BLOCKED - HTTP not in allowed protocols`}</CodeBlock>

        <InfoBox type="info" title="Audit Trail">
          All blocked requests are logged in the audit trail with the reason
          for blocking. This helps identify misconfigurations.
        </InfoBox>
      </DocSection>

      <DocSection title="Dynamic Scope Adjustment">
        <p className="text-slate-300 mb-4">
          The Planner agent can suggest scope adjustments during recon:
        </p>
        <CodeBlock title="Scope Suggestions">{`# During RECON phase
[Planner] Discovered additional subdomains:
  - cdn.staging.example.com
  - auth.staging.example.com

[Planner] Suggestion: Add to scope?
  → Requires explicit approval in attack mode
  → Auto-added in passive mode if same parent domain`}</CodeBlock>
      </DocSection>

      <DocSection title="Common Patterns">
        <h4 className="text-lg font-semibold text-white mt-6 mb-3">Staging Environment</h4>
        <CodeBlock title="staging-scope.yaml">{`scope:
  include:
    - "https://staging.*"
  exclude:
    - "*/admin/*"
    - "*/delete/*"
  same_origin: false
  allowed_domains:
    - "staging.example.com"
    - "staging-api.example.com"`}</CodeBlock>

        <h4 className="text-lg font-semibold text-white mt-6 mb-3">API Only</h4>
        <CodeBlock title="api-scope.yaml">{`scope:
  include:
    - "https://api.example.com/v1/*"
    - "https://api.example.com/v2/*"
  exclude:
    - "*/internal/*"
    - "*/health"
  max_depth: 1  # No crawling`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
