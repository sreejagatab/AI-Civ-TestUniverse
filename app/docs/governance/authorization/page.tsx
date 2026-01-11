'use client';

import { DocPage, DocSection, CodeBlock, InfoBox } from '@/components/docs/DocPage';

export default function AuthorizationPage() {
  return (
    <DocPage
      title="Authorization"
      description="Ensuring you have permission to test"
      badge="Governance"
      prev={{ title: 'Evidence', href: '/docs/concepts/evidence' }}
      next={{ title: 'Scope Control', href: '/docs/governance/scope-control' }}
    >
      <DocSection title="Why Authorization Matters">
        <p className="text-slate-300 mb-4">
          TestUniverse requires explicit authorization before scanning any target.
          This is enforced by the Governor agent and cannot be bypassed.
        </p>
        <InfoBox type="warning" title="Constitutional Rule #2">
          "Governance {'>'} Autonomy" - Authorization and scope enforcement always.
          Governor has absolute veto power.
        </InfoBox>
      </DocSection>

      <DocSection title="Authorization Methods">
        <h4 className="text-lg font-semibold text-white mt-6 mb-3">1. Domain Ownership Proof</h4>
        <CodeBlock title="DNS TXT Record">{`# Add a TXT record to your domain
_testuniverse.example.com TXT "v=testuniverse1 auth=abc123"

# TestUniverse verifies this before scanning
aiciv run https://example.com --verify-dns`}</CodeBlock>

        <h4 className="text-lg font-semibold text-white mt-6 mb-3">2. Well-Known File</h4>
        <CodeBlock title="/.well-known/testuniverse.json">{`{
  "version": "1.0",
  "authorization": "granted",
  "scope": ["/*"],
  "expires": "2024-12-31T23:59:59Z"
}`}</CodeBlock>

        <h4 className="text-lg font-semibold text-white mt-6 mb-3">3. Environment Variable</h4>
        <CodeBlock title="bash">{`# Set authorization proof
export TESTUNIVERSE_AUTH_PROOF="signed-token-from-owner"

# Run scan
aiciv run https://example.com`}</CodeBlock>

        <h4 className="text-lg font-semibold text-white mt-6 mb-3">4. Configuration File</h4>
        <CodeBlock title="target.yaml">{`target:
  url: https://example.com
  authorization:
    method: owner_proof
    proof: "signed-authorization-token"
    expires: "2024-12-31"`}</CodeBlock>
      </DocSection>

      <DocSection title="Authorization Flow">
        <CodeBlock title="Governor Validation">{`┌─────────────────┐
│  Scan Request   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Governor     │
│  Agent Check    │
└────────┬────────┘
         │
    ┌────┴────┐
    │  Auth?  │
    └────┬────┘
         │
    ┌────┴────┬────────────┐
    │         │            │
    ▼         ▼            ▼
 ✓ Valid   ⚠ Expired    ✗ Missing
    │         │            │
    ▼         ▼            ▼
 Proceed    Warn &      BLOCKED
            Prompt      Exit Code 2`}</CodeBlock>
      </DocSection>

      <DocSection title="Bypassing Authorization">
        <InfoBox type="error" title="Not Possible">
          Authorization cannot be bypassed. This is a constitutional rule enforced
          at the kernel level. Attempts to bypass will result in immediate termination
          with exit code 2 (AUTH_BLOCKED).
        </InfoBox>
        <p className="text-slate-300 mt-4">
          If you're testing your own systems, use one of the authorization methods above.
          For third-party systems, you must obtain written permission from the owner.
        </p>
      </DocSection>
    </DocPage>
  );
}
