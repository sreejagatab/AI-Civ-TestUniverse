'use client';

import { DocPage, DocSection, CodeBlock, ParamTable } from '@/components/docs/DocPage';

export default function CLIPage() {
  return (
    <DocPage
      title="CLI Reference"
      description="Command-line interface reference"
      badge="API Reference"
      prev={{ title: 'Quality Gates', href: '/docs/ci-cd/quality-gates' }}
      next={{ title: 'REST API', href: '/docs/api/rest' }}
    >
      <DocSection title="Global Options">
        <ParamTable params={[
          { name: '--version', type: 'flag', description: 'Show version and exit' },
          { name: '--help', type: 'flag', description: 'Show help message' },
          { name: '--verbose, -v', type: 'flag', description: 'Increase verbosity (use -vv for debug)' },
          { name: '--quiet, -q', type: 'flag', description: 'Suppress non-error output' },
          { name: '--config', type: 'path', description: 'Path to config file', default: './aiciv.yaml' },
        ]} />
      </DocSection>

      <DocSection title="aiciv run">
        <p className="text-slate-300 mb-4">Run a scan against a target.</p>
        <CodeBlock title="Usage">{`aiciv run <target> [options]

# Examples
aiciv run https://example.com
aiciv run https://example.com --pack=mvp-webapp
aiciv run target.yaml --mode=ci --gate="critical=0,high=3"`}</CodeBlock>

        <h4 className="text-lg font-semibold text-white mt-6 mb-3">Options</h4>
        <ParamTable params={[
          { name: '--mode', type: 'string', description: 'Scan mode: ci, deep, quick, security', default: 'ci' },
          { name: '--pack', type: 'string', description: 'Plugin pack to use', default: 'mvp-webapp' },
          { name: '--plugins', type: 'string', description: 'Comma-separated plugin list' },
          { name: '--gate', type: 'string', description: 'Quality gate thresholds' },
          { name: '--timebox', type: 'int', description: 'Maximum scan duration (seconds)', default: '600' },
          { name: '--output, -o', type: 'path', description: 'Output directory', default: './results' },
          { name: '--format', type: 'string', description: 'Output formats: html,json,sarif,junit', default: 'html,json' },
          { name: '--attack-mode', type: 'flag', description: 'Enable active security testing' },
          { name: '--baseline', type: 'path', description: 'Compare against baseline file' },
          { name: '--new-only', type: 'flag', description: 'Only report new findings' },
        ]} />
      </DocSection>

      <DocSection title="aiciv plugins">
        <CodeBlock title="Usage">{`# List available plugins
aiciv plugins list

# Show plugin details
aiciv plugins info <plugin-id>

# Check plugin dependencies
aiciv plugins check

# Validate custom plugin
aiciv plugins validate ./my-plugin`}</CodeBlock>
      </DocSection>

      <DocSection title="aiciv results">
        <CodeBlock title="Usage">{`# List recent runs
aiciv results list

# Show run summary
aiciv results show <run-id>

# Filter findings
aiciv results findings <run-id> --severity=critical,high

# Export results
aiciv results export <run-id> --format=csv`}</CodeBlock>
      </DocSection>

      <DocSection title="aiciv report">
        <CodeBlock title="Usage">{`# Open HTML report
aiciv report open <run-id>

# Generate report from results
aiciv report generate <run-id> --format=html,pdf

# Compare two runs
aiciv report diff <run-id-1> <run-id-2>`}</CodeBlock>
      </DocSection>

      <DocSection title="aiciv logs">
        <CodeBlock title="Usage">{`# View logs for a run
aiciv logs <run-id>

# Filter by level
aiciv logs <run-id> --level=WARN

# Follow logs in real-time
aiciv logs --follow

# Export audit log
aiciv logs <run-id> --format=json > audit.json`}</CodeBlock>
      </DocSection>

      <DocSection title="aiciv doctor">
        <CodeBlock title="Usage">{`# Run diagnostics
aiciv doctor

# Check specific component
aiciv doctor --check=plugins
aiciv doctor --check=docker
aiciv doctor --check=network`}</CodeBlock>
      </DocSection>

      <DocSection title="Environment Variables">
        <ParamTable params={[
          { name: 'TESTUNIVERSE_AUTH_PROOF', type: 'string', description: 'Authorization proof token' },
          { name: 'TESTUNIVERSE_ATTACK_TOKEN', type: 'string', description: 'Pre-signed attack mode token' },
          { name: 'TESTUNIVERSE_LOG_LEVEL', type: 'string', description: 'Log level: DEBUG, INFO, WARN, ERROR', default: 'INFO' },
          { name: 'TESTUNIVERSE_CONFIG', type: 'path', description: 'Default config file path' },
          { name: 'TESTUNIVERSE_OUTPUT_DIR', type: 'path', description: 'Default output directory' },
        ]} />
      </DocSection>
    </DocPage>
  );
}
