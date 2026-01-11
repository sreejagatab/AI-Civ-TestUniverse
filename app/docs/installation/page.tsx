'use client';

import { DocPage, DocSection, CodeBlock, InfoBox } from '@/components/docs/DocPage';

export default function InstallationPage() {
  return (
    <DocPage
      title="Installation"
      description="Install TestUniverse on your system"
      badge="Getting Started"
      prev={{ title: 'Quickstart', href: '/docs/quickstart' }}
      next={{ title: 'First Scan', href: '/docs/first-scan' }}
    >
      <DocSection title="Requirements">
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li>Python 3.10 or higher</li>
          <li>Docker 20.0+ (for sandboxed plugin execution)</li>
          <li>Node.js 18+ (for Lighthouse, Axe plugins)</li>
          <li>Java 11+ (for ZAP plugin)</li>
        </ul>
      </DocSection>

      <DocSection title="Install via pip">
        <CodeBlock title="bash">{`# Install the latest stable version
pip install testuniverse

# Or install with all optional dependencies
pip install testuniverse[all]

# Verify installation
aiciv --version`}</CodeBlock>
      </DocSection>

      <DocSection title="Install via Docker">
        <CodeBlock title="bash">{`# Pull the official image
docker pull ghcr.io/sreejagatab/aiciv:latest

# Run a scan
docker run --rm -v $(pwd):/workspace ghcr.io/sreejagatab/aiciv:latest \\
  run https://example.com --pack=mvp-webapp`}</CodeBlock>
      </DocSection>

      <DocSection title="Install from Source">
        <CodeBlock title="bash">{`# Clone the repository
git clone https://github.com/sreejagatab/AI-Civ-TestUniverse.git
cd AI-Civ-TestUniverse

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate

# Install in development mode
pip install -e ".[dev]"

# Run tests to verify
pytest`}</CodeBlock>
      </DocSection>

      <DocSection title="Plugin Dependencies">
        <p className="text-slate-300 mb-4">
          Some plugins require additional tools to be installed:
        </p>
        <CodeBlock title="bash">{`# Lighthouse (Performance & SEO)
npm install -g lighthouse

# Axe (Accessibility)
npm install -g @axe-core/cli

# ZAP (Security - DAST)
# Download from https://www.zaproxy.org/download/

# k6 (Load Testing)
# Download from https://k6.io/docs/getting-started/installation/

# Trivy (Container Security)
# Download from https://aquasecurity.github.io/trivy/`}</CodeBlock>

        <InfoBox type="info" title="Auto-detection">
          TestUniverse automatically detects available tools and adjusts the
          available plugins accordingly. Missing tools will be reported during
          plugin selection.
        </InfoBox>
      </DocSection>

      <DocSection title="Verify Installation">
        <CodeBlock title="bash">{`# Check version and available plugins
aiciv --version
aiciv plugins list

# Run diagnostics
aiciv doctor`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
