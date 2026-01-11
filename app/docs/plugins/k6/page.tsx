'use client';

import { DocPage, DocSection, CodeBlock, InfoBox, ParamTable } from '@/components/docs/DocPage';

export default function K6Page() {
  return (
    <DocPage
      title="k6 Plugin"
      description="Load and performance testing"
      badge="Plugins"
      prev={{ title: 'Axe', href: '/docs/plugins/axe' }}
      next={{ title: 'Writing Plugins', href: '/docs/plugins/writing-plugins' }}
    >
      <DocSection title="Overview">
        <p className="text-slate-300 mb-4">
          The k6 plugin integrates Grafana k6 for load testing, stress testing,
          and performance validation under realistic traffic conditions.
        </p>
        <ParamTable params={[
          { name: 'Plugin ID', type: '-', description: 'k6, k6-stress' },
          { name: 'Tool', type: '-', description: 'Grafana k6' },
          { name: 'Family', type: '-', description: 'performance' },
          { name: 'Target Types', type: '-', description: 'web, api' },
        ]} />
      </DocSection>

      <DocSection title="Test Types">
        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Load Test (k6)</h4>
        <p className="text-slate-300 mb-4">
          Standard load test with gradual ramp-up.
        </p>

        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Stress Test (k6-stress)</h4>
        <InfoBox type="warning" title="Requires Approval">
          Stress testing can impact target performance and requires approval.
        </InfoBox>
      </DocSection>

      <DocSection title="Configuration">
        <CodeBlock title="target.yaml">{`plan:
  plugins:
    - k6

  plugin_config:
    k6:
      # Test stages
      stages:
        - duration: 30s
          target: 10    # Ramp up to 10 VUs
        - duration: 1m
          target: 10    # Stay at 10 VUs
        - duration: 30s
          target: 0     # Ramp down

      # Thresholds
      thresholds:
        http_req_duration:
          - p95 < 500   # 95th percentile under 500ms
          - p99 < 1000  # 99th percentile under 1s
        http_req_failed:
          - rate < 0.01  # Less than 1% failures

      # Endpoints to test
      endpoints:
        - path: /
          method: GET
          weight: 50    # 50% of traffic
        - path: /api/products
          method: GET
          weight: 30
        - path: /api/search
          method: POST
          weight: 20
          body:
            query: "test"

      # Custom script (optional)
      script_path: ./k6/load-test.js`}</CodeBlock>
      </DocSection>

      <DocSection title="Metrics Collected">
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li><strong className="text-white">http_req_duration</strong> - Request duration (p50, p95, p99)</li>
          <li><strong className="text-white">http_req_failed</strong> - Failed request rate</li>
          <li><strong className="text-white">http_reqs</strong> - Total requests</li>
          <li><strong className="text-white">vus</strong> - Virtual users</li>
          <li><strong className="text-white">iterations</strong> - Completed iterations</li>
          <li><strong className="text-white">data_received</strong> - Bytes received</li>
          <li><strong className="text-white">data_sent</strong> - Bytes sent</li>
        </ul>
      </DocSection>

      <DocSection title="Example Finding">
        <CodeBlock title="Threshold Exceeded Finding">{`{
  "title": "Response time threshold exceeded",
  "severity": "high",
  "confidence": 0.98,
  "family": "performance",
  "category": "response-time",
  "tool": {
    "plugin_id": "k6",
    "rule_id": "threshold-http_req_duration"
  },
  "location": {
    "url": "https://example.com/api/search"
  },
  "evidence": [{
    "type": "json",
    "content": {
      "metric": "http_req_duration",
      "percentile": "p95",
      "value": 850,
      "unit": "ms",
      "threshold": 500,
      "samples": 1523
    }
  }],
  "fix": {
    "summary": "Optimize endpoint to respond within 500ms at p95",
    "guidance": "Consider caching, query optimization, or horizontal scaling"
  }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="CLI Usage">
        <CodeBlock title="bash">{`# Run basic load test
aiciv run https://example.com --plugins=k6

# With custom VUs and duration
aiciv run https://example.com --plugins=k6 --k6-vus=50 --k6-duration=5m

# Stress test (requires approval)
aiciv run https://staging.example.com --plugins=k6-stress --attack-mode`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
