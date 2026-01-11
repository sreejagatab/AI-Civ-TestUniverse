'use client';

import { DocPage, DocSection, CodeBlock, InfoBox } from '@/components/docs/DocPage';

export default function GitLabCIPage() {
  return (
    <DocPage
      title="GitLab CI"
      description="Integrate TestUniverse with GitLab CI/CD"
      badge="CI/CD"
      prev={{ title: 'GitHub Actions', href: '/docs/ci-cd/github-actions' }}
      next={{ title: 'Jenkins', href: '/docs/ci-cd/jenkins' }}
    >
      <DocSection title="Quick Start">
        <CodeBlock title=".gitlab-ci.yml">{`stages:
  - test
  - security

variables:
  TESTUNIVERSE_LOG_LEVEL: INFO

testuniverse:
  stage: security
  image: python:3.11-slim
  before_script:
    - pip install testuniverse
  script:
    - |
      aiciv run \$CI_PROJECT_URL \\
        --mode=ci \\
        --pack=mvp-webapp \\
        --gate="critical=0,high=3" \\
        --output=./results \\
        --format=junit,json
  artifacts:
    when: always
    paths:
      - results/
    reports:
      junit: results/report.junit.xml
    expire_in: 30 days
  rules:
    - if: \$CI_PIPELINE_SOURCE == "merge_request_event"
    - if: \$CI_COMMIT_BRANCH == "main"`}</CodeBlock>
      </DocSection>

      <DocSection title="Merge Request Gate">
        <CodeBlock title="MR Security Gate">{`security-gate:
  stage: security
  image: python:3.11-slim
  before_script:
    - pip install testuniverse
  script:
    - |
      aiciv run \$CI_MERGE_REQUEST_SOURCE_PROJECT_URL \\
        --mode=ci \\
        --pack=mvp-webapp \\
        --gate="critical=0,high=3" \\
        --output=./results
  artifacts:
    when: always
    paths:
      - results/
    reports:
      junit: results/report.junit.xml
  rules:
    - if: \$CI_PIPELINE_SOURCE == "merge_request_event"
  allow_failure: false  # Block MR if gate fails`}</CodeBlock>
      </DocSection>

      <DocSection title="Nightly Deep Scan">
        <CodeBlock title="Scheduled Pipeline">{`nightly-security:
  stage: security
  image: python:3.11-slim
  before_script:
    - pip install testuniverse
  script:
    - |
      aiciv run https://staging.example.com \\
        --mode=deep \\
        --pack=mvp-security \\
        --timebox=3600 \\
        --output=./results
  artifacts:
    when: always
    paths:
      - results/
    expire_in: 90 days
  rules:
    - if: \$CI_PIPELINE_SOURCE == "schedule"

# Create schedule in GitLab UI:
# Settings > CI/CD > Schedules
# Cron: 0 2 * * * (2 AM daily)`}</CodeBlock>
      </DocSection>

      <DocSection title="GitLab Security Dashboard">
        <CodeBlock title="SAST Report Format">{`testuniverse-sast:
  stage: security
  image: python:3.11-slim
  before_script:
    - pip install testuniverse
  script:
    - |
      aiciv run \$CI_PROJECT_URL \\
        --mode=ci \\
        --format=gitlab-sast \\
        --output=./results
  artifacts:
    reports:
      sast: results/gl-sast-report.json
  rules:
    - if: \$CI_PIPELINE_SOURCE == "merge_request_event"`}</CodeBlock>
        <InfoBox type="info" title="GitLab Ultimate">
          SAST report integration requires GitLab Ultimate or the Security Dashboard feature.
        </InfoBox>
      </DocSection>

      <DocSection title="Variables">
        <p className="text-slate-300 mb-4">
          Configure these in Settings → CI/CD → Variables:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li><code className="text-primary-400">TESTUNIVERSE_AUTH_PROOF</code> - Authorization token (masked)</li>
          <li><code className="text-primary-400">ATTACK_MODE_TOKEN</code> - Attack mode token (masked, protected)</li>
        </ul>
      </DocSection>
    </DocPage>
  );
}
