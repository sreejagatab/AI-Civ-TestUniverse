'use client';

import { DocPage, DocSection, CodeBlock, InfoBox, ParamTable } from '@/components/docs/DocPage';

export default function LighthousePage() {
  return (
    <DocPage
      title="Lighthouse Plugin"
      description="Performance, SEO, and best practices testing"
      badge="Plugins"
      prev={{ title: 'Plugins Overview', href: '/docs/plugins/overview' }}
      next={{ title: 'ZAP', href: '/docs/plugins/zap' }}
    >
      <DocSection title="Overview">
        <p className="text-slate-300 mb-4">
          The Lighthouse plugin integrates Google Lighthouse for performance,
          accessibility, SEO, and best practices auditing.
        </p>
        <ParamTable params={[
          { name: 'Plugin ID', type: '-', description: 'lighthouse' },
          { name: 'Tool', type: '-', description: 'Google Lighthouse' },
          { name: 'Families', type: '-', description: 'performance, accessibility, seo' },
          { name: 'Target Types', type: '-', description: 'web' },
        ]} />
      </DocSection>

      <DocSection title="Configuration">
        <CodeBlock title="target.yaml">{`plan:
  plugins:
    - lighthouse

  plugin_config:
    lighthouse:
      # Categories to audit
      categories:
        - performance
        - accessibility
        - best-practices
        - seo

      # Device emulation
      preset: mobile  # or 'desktop'

      # Throttling
      throttling:
        cpu_slowdown: 4
        download_throughput: 1.6  # Mbps
        upload_throughput: 0.75   # Mbps
        latency: 150              # ms

      # Pages to audit (if multiple)
      urls:
        - /
        - /products
        - /checkout`}</CodeBlock>
      </DocSection>

      <DocSection title="Metrics Collected">
        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Core Web Vitals</h4>
        <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
          <li><strong className="text-white">LCP</strong> - Largest Contentful Paint</li>
          <li><strong className="text-white">INP</strong> - Interaction to Next Paint</li>
          <li><strong className="text-white">CLS</strong> - Cumulative Layout Shift</li>
        </ul>

        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Additional Metrics</h4>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li>First Contentful Paint (FCP)</li>
          <li>Time to First Byte (TTFB)</li>
          <li>Speed Index</li>
          <li>Total Blocking Time (TBT)</li>
        </ul>
      </DocSection>

      <DocSection title="Example Output">
        <CodeBlock title="Finding Example">{`{
  "title": "Largest Contentful Paint exceeds threshold",
  "severity": "medium",
  "confidence": 0.95,
  "family": "performance",
  "category": "core-web-vitals",
  "tool": {
    "plugin_id": "lighthouse",
    "rule_id": "largest-contentful-paint"
  },
  "location": {
    "url": "https://example.com/"
  },
  "evidence": [{
    "type": "json",
    "content": {
      "value": 4200,
      "unit": "ms",
      "threshold": 2500
    }
  }],
  "fix": {
    "summary": "Reduce LCP to under 2.5 seconds",
    "guidance": "Optimize images, reduce server response time, eliminate render-blocking resources"
  }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="CLI Usage">
        <CodeBlock title="bash">{`# Run Lighthouse only
aiciv run https://example.com --plugins=lighthouse

# With custom categories
aiciv run https://example.com --plugins=lighthouse --lighthouse-categories=performance,seo

# Desktop mode
aiciv run https://example.com --plugins=lighthouse --lighthouse-preset=desktop`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
