'use client';

import { DocPage, DocSection, CodeBlock, InfoBox } from '@/components/docs/DocPage';

export default function GitHubActionsPage() {
  return (
    <DocPage
      title="GitHub Actions"
      description="Integrate TestUniverse with GitHub Actions"
      badge="CI/CD"
      prev={{ title: 'Writing Plugins', href: '/docs/plugins/writing-plugins' }}
      next={{ title: 'GitLab CI', href: '/docs/ci-cd/gitlab-ci' }}
    >
      <DocSection title="Quick Start">
        <p className="text-slate-300 mb-4">
          Add TestUniverse to your GitHub Actions workflow:
        </p>
        <CodeBlock title=".github/workflows/testuniverse.yml">{`name: TestUniverse Security & Quality

on:
  pull_request:
  push:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write
      pull-requests: write

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install TestUniverse
        run: pip install testuniverse

      - name: Run Security Scan
        id: scan
        run: |
          aiciv run \${{ github.server_url }}/\${{ github.repository }} \\
            --mode=ci \\
            --pack=mvp-webapp \\
            --gate="critical=0,high=3" \\
            --output=./results \\
            --format=sarif,junit
        env:
          TESTUNIVERSE_AUTH_PROOF: \${{ secrets.TEST_AUTH_PROOF }}

      - name: Upload SARIF to GitHub Security
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: ./results/report.sarif.json

      - name: Upload Test Results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: testuniverse-results
          path: ./results/`}</CodeBlock>
      </DocSection>

      <DocSection title="PR Gate Configuration">
        <CodeBlock title="PR Quality Gate">{`- name: Run PR Gate
  run: |
    aiciv run \${{ github.event.pull_request.head.repo.html_url }} \\
      --mode=ci \\
      --gate="critical=0,high=3" \\
      --timebox=600
  continue-on-error: true
  id: testuniverse

- name: Post PR Comment
  uses: actions/github-script@v7
  if: github.event_name == 'pull_request'
  with:
    script: |
      const fs = require('fs');
      let comment = '## TestUniverse Scan Results\\n\\n';

      try {
        const results = JSON.parse(fs.readFileSync('./results/report.json'));
        const counts = results.summary?.by_severity || {};
        comment += \`| Severity | Count |\\n|----------|-------|\\n\`;
        comment += \`| Critical | \${counts.critical || 0} |\\n\`;
        comment += \`| High | \${counts.high || 0} |\\n\`;
        comment += \`| Medium | \${counts.medium || 0} |\\n\`;
      } catch (e) {
        comment += 'Could not parse results.';
      }

      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: comment
      });

- name: Check Quality Gate
  if: steps.testuniverse.outcome == 'failure'
  run: exit 1`}</CodeBlock>
      </DocSection>

      <DocSection title="Nightly Deep Scan">
        <CodeBlock title="Scheduled Scan">{`name: Nightly Security Scan

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily

jobs:
  deep-scan:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install TestUniverse
        run: pip install testuniverse

      - name: Run Deep Scan
        run: |
          aiciv run https://staging.example.com \\
            --mode=deep \\
            --pack=mvp-security \\
            --timebox=3600 \\
            --output=./results
        env:
          TESTUNIVERSE_AUTH_PROOF: \${{ secrets.TEST_AUTH_PROOF }}

      - name: Upload Results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: nightly-scan-results
          path: ./results/
          retention-days: 90

      - name: Notify on Failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          channel-id: \${{ secrets.SLACK_CHANNEL }}
          slack-message: "Nightly security scan failed!"
        env:
          SLACK_BOT_TOKEN: \${{ secrets.SLACK_TOKEN }}`}</CodeBlock>
      </DocSection>

      <DocSection title="Required Secrets">
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li><code className="text-primary-400">TEST_AUTH_PROOF</code> - Authorization proof token</li>
          <li><code className="text-primary-400">ATTACK_MODE_TOKEN</code> - (Optional) Pre-signed attack mode token</li>
          <li><code className="text-primary-400">SLACK_TOKEN</code> - (Optional) Slack bot token for notifications</li>
        </ul>
        <InfoBox type="info" title="GitHub Security Tab">
          SARIF results appear in your repository's Security tab under Code Scanning.
        </InfoBox>
      </DocSection>
    </DocPage>
  );
}
