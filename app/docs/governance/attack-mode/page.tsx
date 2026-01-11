'use client';

import { DocPage, DocSection, CodeBlock, InfoBox } from '@/components/docs/DocPage';

export default function AttackModePage() {
  return (
    <DocPage
      title="Attack Mode"
      description="Controlled active security testing"
      badge="Governance"
      prev={{ title: 'Rate Limits', href: '/docs/governance/rate-limits' }}
      next={{ title: 'Audit Logs', href: '/docs/governance/audit-logs' }}
    >
      <DocSection title="What is Attack Mode?">
        <p className="text-slate-300 mb-4">
          Attack Mode enables active security testing - sending potentially
          malicious payloads to discover vulnerabilities. This requires explicit
          3-step approval due to the risks involved.
        </p>
        <InfoBox type="error" title="High Risk">
          Attack Mode can cause data corruption, service disruption, or trigger
          security alerts. Only use on systems you own or have explicit permission to test.
        </InfoBox>
      </DocSection>

      <DocSection title="Passive vs Active Testing">
        <CodeBlock title="Comparison">{`PASSIVE MODE (Default)
─────────────────────
✓ Read-only scanning
✓ Header analysis
✓ Response inspection
✓ No payload injection
✓ No fuzzing
✓ Safe for production

ACTIVE MODE (Attack Mode)
─────────────────────────
! SQL injection testing
! XSS payload injection
! Authentication bypass attempts
! Fuzzing
! Parameter manipulation
! NOT SAFE for production`}</CodeBlock>
      </DocSection>

      <DocSection title="3-Step Approval Process">
        <CodeBlock title="Enabling Attack Mode">{`# Step 1: Request attack mode
aiciv run target.yaml --request-attack-mode

[Governor] Attack mode requested for: staging.example.com
[Governor] This will enable active security testing including:
  - SQL injection testing
  - XSS payload injection
  - Authentication bypass attempts
  - Parameter fuzzing

# Step 2: Confirm understanding
[Governor] Do you understand the risks? (yes/no): yes

# Step 3: Provide authorization proof
[Governor] Enter authorization proof or token: ****

[Governor] Attack mode APPROVED
[Governor] Session ID: atk_abc123
[Governor] Valid for: 2 hours
[Governor] Scope: staging.example.com only`}</CodeBlock>
      </DocSection>

      <DocSection title="Attack Mode Constraints">
        <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
          <li>Time-limited sessions (default: 2 hours)</li>
          <li>Scope-locked to approved targets only</li>
          <li>All actions logged immutably</li>
          <li>Automatic rollback on scope violation</li>
          <li>Cannot be automated without pre-approval</li>
        </ul>

        <CodeBlock title="Attack Mode Configuration">{`policy:
  attack_mode:
    enabled: false  # Must be explicitly enabled

    # Require 3-step approval
    require_approval: true

    # Pre-approved (for CI with signed token)
    pre_approved_token_env: ATTACK_MODE_TOKEN

    # Time limit
    max_duration_hours: 2

    # Allowed attack types
    allowed_attacks:
      - sql_injection
      - xss
      - auth_bypass

    # Forbidden attacks (never allowed)
    forbidden_attacks:
      - dos
      - data_destruction
      - ransomware_simulation`}</CodeBlock>
      </DocSection>

      <DocSection title="CI/CD Integration">
        <p className="text-slate-300 mb-4">
          For automated attack mode in CI, use pre-signed tokens:
        </p>
        <CodeBlock title="GitHub Actions">{`- name: Run Security Scan (Attack Mode)
  env:
    TESTUNIVERSE_AUTH_PROOF: \${{ secrets.TEST_AUTH_PROOF }}
    TESTUNIVERSE_ATTACK_TOKEN: \${{ secrets.ATTACK_MODE_TOKEN }}
  run: |
    aiciv run staging.yaml \\
      --attack-mode \\
      --attack-token=\$TESTUNIVERSE_ATTACK_TOKEN`}</CodeBlock>

        <InfoBox type="warning" title="Token Security">
          Attack mode tokens should be tightly scoped and rotated regularly.
          Never commit tokens to source control.
        </InfoBox>
      </DocSection>
    </DocPage>
  );
}
