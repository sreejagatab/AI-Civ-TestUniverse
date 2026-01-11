# CI/CD Setup Guide

Integrate AI-Civ TestUniverse into your continuous integration pipeline.

## Quick Links

- [GitHub Actions](#github-actions)
- [GitLab CI](#gitlab-ci)
- [Jenkins](#jenkins)
- [Azure Pipelines](#azure-pipelines)
- [CircleCI](#circleci)
- [Exit Codes](#exit-codes)
- [Best Practices](#best-practices)

---

## GitHub Actions

### Basic Setup

Create `.github/workflows/testuniverse.yml`:

```yaml
name: TestUniverse Security & Quality

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run TestUniverse
        run: |
          docker run --rm \
            -v ${{ github.workspace }}/reports:/reports \
            ghcr.io/ai-civ/testuniverse:latest \
            --pack mvp-webapp \
            --target ${{ vars.STAGING_URL }} \
            --output /reports

      - name: Upload SARIF to GitHub Security
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: reports/results.sarif

      - name: Upload Reports
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: testuniverse-reports
          path: reports/
          retention-days: 14
```

### With Environment Deployment

```yaml
name: Deploy & Test

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: staging
    outputs:
      url: ${{ steps.deploy.outputs.url }}

    steps:
      - uses: actions/checkout@v4
      - name: Deploy to staging
        id: deploy
        run: |
          # Your deployment steps
          echo "url=https://staging.your-app.com" >> $GITHUB_OUTPUT

  test:
    needs: deploy
    runs-on: ubuntu-latest

    steps:
      - name: Wait for deployment
        run: sleep 30

      - name: Run Security Scan
        run: |
          docker run --rm \
            -v $(pwd)/reports:/reports \
            ghcr.io/ai-civ/testuniverse:latest \
            --pack mvp-security \
            --target ${{ needs.deploy.outputs.url }} \
            --output /reports

      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: reports/results.sarif

      - name: Check Quality Gate
        run: |
          if [ -f reports/quality-gate.json ]; then
            PASSED=$(jq -r '.passed' reports/quality-gate.json)
            if [ "$PASSED" != "true" ]; then
              echo "Quality gate failed!"
              exit 1
            fi
          fi
```

### PR Comment with Results

```yaml
- name: Comment PR with Results
  if: github.event_name == 'pull_request'
  uses: actions/github-script@v7
  with:
    script: |
      const fs = require('fs');
      const summary = JSON.parse(fs.readFileSync('reports/summary.json', 'utf8'));

      const body = `## TestUniverse Results

      | Severity | Count |
      |----------|-------|
      | Critical | ${summary.critical} |
      | High | ${summary.high} |
      | Medium | ${summary.medium} |
      | Low | ${summary.low} |

      **Quality Gate**: ${summary.quality_gate_passed ? '✅ Passed' : '❌ Failed'}

      [View Full Report](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID})
      `;

      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: body
      });
```

---

## GitLab CI

### Basic Setup

Create `.gitlab-ci.yml`:

```yaml
stages:
  - test
  - report

variables:
  STAGING_URL: "https://staging.your-app.com"

testuniverse:
  stage: test
  image: docker:24
  services:
    - docker:24-dind
  variables:
    DOCKER_TLS_CERTDIR: "/certs"

  script:
    - mkdir -p reports
    - |
      docker run --rm \
        -v $(pwd)/reports:/reports \
        ghcr.io/ai-civ/testuniverse:latest \
        --pack mvp-webapp \
        --target $STAGING_URL \
        --output /reports

  artifacts:
    when: always
    paths:
      - reports/
    reports:
      junit: reports/junit.xml
      sast: reports/results.sarif
    expire_in: 2 weeks

  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == "main"
    - if: $CI_PIPELINE_SOURCE == "schedule"
```

### With Dynamic Environments

```yaml
stages:
  - deploy
  - test

deploy_review:
  stage: deploy
  script:
    - ./deploy-review-app.sh
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    url: https://$CI_COMMIT_REF_SLUG.review.your-app.com
    on_stop: stop_review
  rules:
    - if: $CI_MERGE_REQUEST_ID

test_review:
  stage: test
  needs: [deploy_review]
  image: docker:24
  services:
    - docker:24-dind

  script:
    - |
      docker run --rm \
        -v $(pwd)/reports:/reports \
        ghcr.io/ai-civ/testuniverse:latest \
        --pack mvp-webapp \
        --target https://$CI_COMMIT_REF_SLUG.review.your-app.com \
        --output /reports

  artifacts:
    when: always
    paths:
      - reports/
    reports:
      junit: reports/junit.xml
    expire_in: 1 week

  rules:
    - if: $CI_MERGE_REQUEST_ID

stop_review:
  stage: deploy
  script:
    - ./stop-review-app.sh
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    action: stop
  when: manual
  rules:
    - if: $CI_MERGE_REQUEST_ID
```

### Security Scanning for GitLab Security Dashboard

```yaml
testuniverse_security:
  stage: test
  image: docker:24
  services:
    - docker:24-dind

  script:
    - mkdir -p reports
    - |
      docker run --rm \
        -v $(pwd)/reports:/reports \
        -v $(pwd):/src:ro \
        ghcr.io/ai-civ/testuniverse:latest \
        --pack mvp-security \
        --target $STAGING_URL \
        --source /src \
        --output /reports

  artifacts:
    when: always
    paths:
      - reports/
    reports:
      sast: reports/gl-sast-report.json
      dependency_scanning: reports/gl-dependency-scanning-report.json
      secret_detection: reports/gl-secret-detection-report.json
```

---

## Jenkins

### Jenkinsfile (Declarative)

```groovy
pipeline {
    agent any

    environment {
        STAGING_URL = 'https://staging.your-app.com'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('TestUniverse Scan') {
            steps {
                sh '''
                    mkdir -p reports

                    docker run --rm \
                        -v ${WORKSPACE}/reports:/reports \
                        ghcr.io/ai-civ/testuniverse:latest \
                        --pack mvp-webapp \
                        --target ${STAGING_URL} \
                        --output /reports
                '''
            }
        }

        stage('Publish Results') {
            steps {
                // Publish JUnit results
                junit 'reports/junit.xml'

                // Publish HTML report
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'reports',
                    reportFiles: 'report.html',
                    reportName: 'TestUniverse Report'
                ])

                // Archive artifacts
                archiveArtifacts artifacts: 'reports/**/*', fingerprint: true
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    def summary = readJSON file: 'reports/summary.json'
                    if (summary.critical > 0 || summary.high > 0) {
                        error "Quality gate failed: ${summary.critical} critical, ${summary.high} high findings"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            slackSend(
                color: 'danger',
                message: "TestUniverse scan failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
            )
        }
    }
}
```

### Jenkinsfile (Scripted)

```groovy
node {
    def stagingUrl = 'https://staging.your-app.com'

    stage('Checkout') {
        checkout scm
    }

    stage('TestUniverse Scan') {
        try {
            sh """
                mkdir -p reports
                docker run --rm \
                    -v \${WORKSPACE}/reports:/reports \
                    ghcr.io/ai-civ/testuniverse:latest \
                    --pack mvp-security \
                    --target ${stagingUrl} \
                    --output /reports
            """
        } catch (err) {
            currentBuild.result = 'UNSTABLE'
        }
    }

    stage('Publish') {
        junit allowEmptyResults: true, testResults: 'reports/junit.xml'
        archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true

        publishHTML([
            reportDir: 'reports',
            reportFiles: 'report.html',
            reportName: 'Security Report'
        ])
    }

    stage('Gate') {
        def summary = readJSON file: 'reports/summary.json'
        if (summary.quality_gate_passed == false) {
            error "Quality gate failed"
        }
    }
}
```

---

## Azure Pipelines

### azure-pipelines.yml

```yaml
trigger:
  branches:
    include:
      - main
      - develop

pr:
  branches:
    include:
      - main

schedules:
  - cron: '0 2 * * *'
    displayName: 'Nightly scan'
    branches:
      include:
        - main

variables:
  stagingUrl: 'https://staging.your-app.com'

stages:
  - stage: Test
    displayName: 'Security & Quality Testing'
    jobs:
      - job: TestUniverse
        displayName: 'Run TestUniverse'
        pool:
          vmImage: 'ubuntu-latest'

        steps:
          - task: Docker@2
            displayName: 'Run TestUniverse Scan'
            inputs:
              command: run
              arguments: |
                --rm
                -v $(Build.SourcesDirectory)/reports:/reports
                ghcr.io/ai-civ/testuniverse:latest
                --pack mvp-webapp
                --target $(stagingUrl)
                --output /reports
            continueOnError: true

          - task: PublishTestResults@2
            displayName: 'Publish Test Results'
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: '**/junit.xml'
              searchFolder: '$(Build.SourcesDirectory)/reports'
              mergeTestResults: true
              failTaskOnFailedTests: false

          - task: PublishBuildArtifacts@1
            displayName: 'Publish Reports'
            inputs:
              pathToPublish: '$(Build.SourcesDirectory)/reports'
              artifactName: 'testuniverse-reports'

          - task: PublishCodeCoverageResults@1
            displayName: 'Publish SARIF'
            inputs:
              codeCoverageTool: 'Cobertura'
              summaryFileLocation: '$(Build.SourcesDirectory)/reports/results.sarif'
            condition: always()

          - script: |
              if [ -f reports/summary.json ]; then
                CRITICAL=$(jq -r '.critical' reports/summary.json)
                HIGH=$(jq -r '.high' reports/summary.json)
                if [ "$CRITICAL" -gt 0 ] || [ "$HIGH" -gt 0 ]; then
                  echo "##vso[task.complete result=Failed;]Quality gate failed"
                  exit 1
                fi
              fi
            displayName: 'Check Quality Gate'
```

---

## CircleCI

### .circleci/config.yml

```yaml
version: 2.1

orbs:
  docker: circleci/docker@2.4

jobs:
  testuniverse:
    docker:
      - image: cimg/base:current
    resource_class: medium

    steps:
      - checkout
      - setup_remote_docker:
          version: 20.10.24

      - run:
          name: Run TestUniverse
          command: |
            mkdir -p reports
            docker run --rm \
              -v $(pwd)/reports:/reports \
              ghcr.io/ai-civ/testuniverse:latest \
              --pack mvp-webapp \
              --target ${STAGING_URL} \
              --output /reports

      - store_test_results:
          path: reports

      - store_artifacts:
          path: reports
          destination: testuniverse-reports

      - run:
          name: Check Quality Gate
          command: |
            if [ -f reports/summary.json ]; then
              PASSED=$(jq -r '.quality_gate_passed' reports/summary.json)
              if [ "$PASSED" != "true" ]; then
                echo "Quality gate failed"
                exit 1
              fi
            fi

workflows:
  version: 2
  test:
    jobs:
      - testuniverse:
          context: staging
          filters:
            branches:
              only:
                - main
                - develop

  nightly:
    triggers:
      - schedule:
          cron: "0 2 * * *"
          filters:
            branches:
              only: main
    jobs:
      - testuniverse:
          context: staging
```

---

## Exit Codes

Understanding exit codes helps you configure CI gates correctly:

| Exit Code | Meaning | Action |
|-----------|---------|--------|
| `0` | All checks passed | Deploy allowed |
| `1` | Findings exceed quality gate thresholds | Review required |
| `2` | Critical security issues found | Block deployment |
| `3` | Configuration error | Fix config and retry |
| `124` | Timeout exceeded | Increase timeout or reduce scope |
| `125` | Docker error | Check Docker setup |

### Handling Exit Codes

**GitHub Actions:**
```yaml
- name: Run TestUniverse
  id: test
  run: |
    docker run ... || echo "exit_code=$?" >> $GITHUB_OUTPUT
  continue-on-error: true

- name: Handle Results
  if: steps.test.outputs.exit_code == '2'
  run: |
    echo "::error::Critical security issues found!"
    exit 1
```

**GitLab CI:**
```yaml
script:
  - docker run ... || EXIT_CODE=$?
  - |
    if [ "$EXIT_CODE" = "2" ]; then
      echo "Critical security issues - blocking pipeline"
      exit 1
    elif [ "$EXIT_CODE" = "1" ]; then
      echo "Quality gate warnings - review required"
    fi
allow_failure: true
```

---

## Best Practices

### 1. Use Environment Variables for Secrets

```yaml
# GitHub Actions
env:
  AUTH_TOKEN: ${{ secrets.API_AUTH_TOKEN }}

# GitLab CI
variables:
  AUTH_TOKEN: $API_AUTH_TOKEN  # From CI/CD settings
```

### 2. Cache Docker Images

```yaml
# GitHub Actions
- name: Pull TestUniverse Image
  run: docker pull ghcr.io/ai-civ/testuniverse:latest

# GitLab CI
before_script:
  - docker pull ghcr.io/ai-civ/testuniverse:latest || true
```

### 3. Run on Schedule for Production

```yaml
# Nightly security scan of production
schedule:
  - cron: '0 3 * * *'  # 3 AM daily
```

### 4. Different Packs for Different Stages

```yaml
# PR: Fast pack
- if: github.event_name == 'pull_request'
  run: --pack mvp-api --timeout 300

# Main: Thorough pack
- if: github.ref == 'refs/heads/main'
  run: --pack mvp-security --timeout 900
```

### 5. Fail Early, Fix Fast

```yaml
quality_gate:
  # Strict for production
  critical: 0
  high: 0

  # Lenient for development
  # critical: 0
  # high: 5
```

### 6. Store Reports for Compliance

```yaml
artifacts:
  retention-days: 90  # Keep for audit
```

---

## Troubleshooting

### Docker-in-Docker Issues

```yaml
# GitLab: Use services
services:
  - docker:24-dind

# GitHub: Use host Docker
- uses: docker/setup-buildx-action@v3
```

### Network Access Issues

```yaml
# If testing internal services
docker run --network host ...
```

### Memory Issues

```yaml
# Increase memory limit
docker run -m 4g ...
```

---

## Next Steps

- [Full Pack Documentation](./packs/)
- [Custom Quality Gates](./quality-gates.md)
- [Authentication Guide](./authentication.md)
- [API Reference](./api-reference.md)
