'use client';

import { DocPage, DocSection, CodeBlock, InfoBox, ParamTable } from '@/components/docs/DocPage';

export default function AuditLogsPage() {
  return (
    <DocPage
      title="Audit Logs"
      description="Complete record of all actions"
      badge="Governance"
      prev={{ title: 'Attack Mode', href: '/docs/governance/attack-mode' }}
      next={{ title: 'Plugins Overview', href: '/docs/plugins/overview' }}
    >
      <DocSection title="Why Audit Logs?">
        <p className="text-slate-300 mb-4">
          Every action in TestUniverse is logged immutably. This provides
          accountability, enables debugging, and supports compliance requirements.
        </p>
        <InfoBox type="info" title="Constitutional Rule #4">
          "Memory {'>'} Speed" - Audit trails and evidence required.
          Every action logged immutably.
        </InfoBox>
      </DocSection>

      <DocSection title="What's Logged">
        <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
          <li>All scan requests and configurations</li>
          <li>Authorization checks and decisions</li>
          <li>Scope enforcement actions</li>
          <li>Rate limit adjustments</li>
          <li>Plugin executions and results</li>
          <li>Attack mode approvals</li>
          <li>All HTTP requests (in attack mode)</li>
          <li>Finding discoveries and deduplication</li>
          <li>Report generation</li>
        </ul>
      </DocSection>

      <DocSection title="Log Format">
        <CodeBlock title="audit.jsonl">{`{"ts":"2024-01-15T10:30:00Z","level":"INFO","event":"scan_started","run_id":"run_xyz789","target":"staging.example.com","user":"ci-bot"}
{"ts":"2024-01-15T10:30:01Z","level":"INFO","event":"auth_check","run_id":"run_xyz789","method":"dns_txt","result":"valid"}
{"ts":"2024-01-15T10:30:02Z","level":"INFO","event":"scope_check","run_id":"run_xyz789","url":"https://staging.example.com/","result":"allowed"}
{"ts":"2024-01-15T10:30:05Z","level":"INFO","event":"plugin_started","run_id":"run_xyz789","plugin":"lighthouse"}
{"ts":"2024-01-15T10:31:30Z","level":"INFO","event":"plugin_completed","run_id":"run_xyz789","plugin":"lighthouse","findings":45}
{"ts":"2024-01-15T10:31:31Z","level":"WARN","event":"scope_blocked","run_id":"run_xyz789","url":"https://production.example.com/","reason":"out_of_scope"}
{"ts":"2024-01-15T10:35:00Z","level":"INFO","event":"scan_completed","run_id":"run_xyz789","duration_s":300,"total_findings":52}`}</CodeBlock>
      </DocSection>

      <DocSection title="Log Levels">
        <ParamTable params={[
          { name: 'DEBUG', type: 'level', description: 'Verbose debugging information' },
          { name: 'INFO', type: 'level', description: 'Normal operational events' },
          { name: 'WARN', type: 'level', description: 'Potential issues, blocked actions' },
          { name: 'ERROR', type: 'level', description: 'Errors that don\'t stop execution' },
          { name: 'CRITICAL', type: 'level', description: 'Fatal errors, security events' },
        ]} />
      </DocSection>

      <DocSection title="Viewing Logs">
        <CodeBlock title="CLI Commands">{`# View logs for a run
aiciv logs --run-id=run_xyz789

# Filter by level
aiciv logs --run-id=run_xyz789 --level=WARN

# Filter by event type
aiciv logs --run-id=run_xyz789 --event=scope_blocked

# Export logs
aiciv logs --run-id=run_xyz789 --format=json > audit.json

# Stream logs in real-time
aiciv logs --follow`}</CodeBlock>
      </DocSection>

      <DocSection title="Log Storage">
        <CodeBlock title="Configuration">{`output:
  audit:
    # Log file location
    path: ./results/audit.jsonl

    # Retention period
    retention_days: 90

    # Log level
    level: INFO

    # Include request/response bodies (attack mode only)
    include_bodies: false

    # Encryption at rest
    encrypt: true

    # Remote shipping
    ship_to:
      type: s3
      bucket: my-audit-logs
      prefix: testuniverse/`}</CodeBlock>

        <InfoBox type="warning" title="Compliance">
          For compliance requirements (SOC 2, HIPAA, etc.), ensure logs are
          shipped to immutable storage and retained for the required period.
        </InfoBox>
      </DocSection>
    </DocPage>
  );
}
