'use client';

import { DocPage, DocSection, CodeBlock, InfoBox, ParamTable } from '@/components/docs/DocPage';

export default function RateLimitsPage() {
  return (
    <DocPage
      title="Rate Limits"
      description="Controlling request rates to protect targets"
      badge="Governance"
      prev={{ title: 'Scope Control', href: '/docs/governance/scope-control' }}
      next={{ title: 'Attack Mode', href: '/docs/governance/attack-mode' }}
    >
      <DocSection title="Why Rate Limiting?">
        <p className="text-slate-300 mb-4">
          Rate limiting ensures TestUniverse doesn't overwhelm target systems.
          This protects against accidental DoS and respects target capacity.
        </p>
        <InfoBox type="warning" title="Constitutional Rule #3">
          "Boundaries {'>'} Capability" - Rate limits are enforced, not suggested.
          Can't bypass. Can't disable.
        </InfoBox>
      </DocSection>

      <DocSection title="Rate Limit Configuration">
        <CodeBlock title="target.yaml">{`policy:
  rate_limit:
    # Requests per second (sustained)
    requests_per_second: 10

    # Burst allowance (short spikes)
    burst: 20

    # Concurrent connections
    max_concurrent: 5

    # Delay between requests (ms)
    delay_ms: 100

    # Per-endpoint limits
    per_endpoint:
      "/api/search": 2   # Expensive endpoint
      "/api/login": 1    # Auth endpoint`}</CodeBlock>
      </DocSection>

      <DocSection title="Default Limits">
        <ParamTable params={[
          { name: 'requests_per_second', type: 'int', description: 'Maximum sustained request rate', default: '10' },
          { name: 'burst', type: 'int', description: 'Maximum burst size', default: '20' },
          { name: 'max_concurrent', type: 'int', description: 'Maximum concurrent connections', default: '5' },
          { name: 'delay_ms', type: 'int', description: 'Minimum delay between requests', default: '100' },
        ]} />
      </DocSection>

      <DocSection title="Adaptive Rate Limiting">
        <p className="text-slate-300 mb-4">
          TestUniverse automatically adjusts rates based on target response:
        </p>
        <CodeBlock title="Adaptive Behavior">{`# Normal operation
[RateLimiter] Current rate: 10 req/s

# Target returns 429 Too Many Requests
[RateLimiter] Received 429, backing off...
[RateLimiter] Reduced rate to 5 req/s
[RateLimiter] Waiting 30s before retry

# Target returns 503 Service Unavailable
[RateLimiter] Received 503, target stressed
[RateLimiter] Reduced rate to 2 req/s
[RateLimiter] Pausing for 60s

# Gradual recovery
[RateLimiter] No errors for 5m, increasing rate
[RateLimiter] New rate: 7 req/s`}</CodeBlock>
      </DocSection>

      <DocSection title="Rate Limit by Mode">
        <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
          <li><code className="text-primary-400">ci</code> - Conservative (5 req/s) for CI pipelines</li>
          <li><code className="text-primary-400">quick</code> - Fast (20 req/s) for smoke tests</li>
          <li><code className="text-primary-400">deep</code> - Slow (2 req/s) for thorough scans</li>
          <li><code className="text-primary-400">stress</code> - High (100 req/s) with approval only</li>
        </ul>

        <InfoBox type="error" title="Stress Mode Requires Approval">
          High-rate testing (stress mode) requires explicit 3-step approval
          through the Attack Mode system.
        </InfoBox>
      </DocSection>

      <DocSection title="Monitoring Rate Limits">
        <CodeBlock title="CLI Commands">{`# View current rate limit status
aiciv status --rate-limits

# View rate limit violations
aiciv logs --filter=rate-limit

# Adjust during scan (if permitted)
aiciv adjust --rate-limit=5`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
