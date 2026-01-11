'use client';

import { DocPage, DocSection, CodeBlock, InfoBox, ParamTable } from '@/components/docs/DocPage';

export default function AxePage() {
  return (
    <DocPage
      title="Axe Plugin"
      description="Accessibility testing with axe-core"
      badge="Plugins"
      prev={{ title: 'ZAP', href: '/docs/plugins/zap' }}
      next={{ title: 'k6', href: '/docs/plugins/k6' }}
    >
      <DocSection title="Overview">
        <p className="text-slate-300 mb-4">
          The Axe plugin integrates axe-core for automated accessibility testing,
          checking WCAG 2.1 compliance at Level A, AA, and AAA.
        </p>
        <ParamTable params={[
          { name: 'Plugin ID', type: '-', description: 'axe' },
          { name: 'Tool', type: '-', description: 'axe-core' },
          { name: 'Family', type: '-', description: 'accessibility' },
          { name: 'Target Types', type: '-', description: 'web' },
        ]} />
      </DocSection>

      <DocSection title="WCAG Coverage">
        <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
          <li><strong className="text-white">Level A</strong> - Basic accessibility requirements</li>
          <li><strong className="text-white">Level AA</strong> - Standard compliance (most common requirement)</li>
          <li><strong className="text-white">Level AAA</strong> - Enhanced accessibility</li>
        </ul>
        <InfoBox type="info" title="Default">
          By default, Axe tests for Level A and AA compliance.
        </InfoBox>
      </DocSection>

      <DocSection title="Configuration">
        <CodeBlock title="target.yaml">{`plan:
  plugins:
    - axe

  plugin_config:
    axe:
      # WCAG levels to check
      wcag_levels:
        - wcag2a
        - wcag2aa
        # - wcag2aaa  # Optional

      # Standards to check
      standards:
        - wcag21
        - section508

      # Rules to include/exclude
      rules:
        include:
          - color-contrast
          - image-alt
          - label
        exclude:
          - bypass  # Skip bypass rules

      # Elements to exclude from testing
      exclude_selectors:
        - ".third-party-widget"
        - "#legacy-component"

      # Pages to test
      urls:
        - /
        - /products
        - /checkout
        - /contact`}</CodeBlock>
      </DocSection>

      <DocSection title="Common Issues Detected">
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li>Missing alt text on images</li>
          <li>Insufficient color contrast</li>
          <li>Missing form labels</li>
          <li>Invalid ARIA attributes</li>
          <li>Missing skip links</li>
          <li>Incorrect heading hierarchy</li>
          <li>Missing keyboard focus indicators</li>
          <li>Inaccessible interactive elements</li>
        </ul>
      </DocSection>

      <DocSection title="Example Finding">
        <CodeBlock title="Color Contrast Finding">{`{
  "title": "Color contrast insufficient",
  "severity": "medium",
  "confidence": 0.95,
  "family": "accessibility",
  "category": "color-contrast",
  "tool": {
    "plugin_id": "axe",
    "rule_id": "color-contrast"
  },
  "location": {
    "url": "https://example.com/checkout",
    "selector": "button.secondary-action",
    "element": "<button class=\\"secondary-action\\">Cancel</button>"
  },
  "evidence": [{
    "type": "json",
    "content": {
      "foreground": "#999999",
      "background": "#ffffff",
      "contrast_ratio": 2.85,
      "required_ratio": 4.5
    }
  }],
  "fix": {
    "summary": "Increase color contrast to at least 4.5:1",
    "guidance": "Change text color from #999999 to #595959 or darker"
  },
  "metadata": {
    "wcag": "1.4.3",
    "wcag_level": "AA"
  }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="CLI Usage">
        <CodeBlock title="bash">{`# Run Axe only
aiciv run https://example.com --plugins=axe

# With specific WCAG level
aiciv run https://example.com --plugins=axe --axe-wcag=wcag2aa

# Test specific pages
aiciv run https://example.com --plugins=axe --axe-urls=/,/checkout,/contact`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
