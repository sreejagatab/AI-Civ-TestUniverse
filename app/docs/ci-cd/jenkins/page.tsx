'use client';

import { DocPage, DocSection, CodeBlock, InfoBox } from '@/components/docs/DocPage';

export default function JenkinsPage() {
  return (
    <DocPage
      title="Jenkins"
      description="Integrate TestUniverse with Jenkins"
      badge="CI/CD"
      prev={{ title: 'GitLab CI', href: '/docs/ci-cd/gitlab-ci' }}
      next={{ title: 'Exit Codes', href: '/docs/ci-cd/exit-codes' }}
    >
      <DocSection title="Declarative Pipeline">
        <CodeBlock title="Jenkinsfile">{`pipeline {
    agent any

    environment {
        TESTUNIVERSE_AUTH_PROOF = credentials('testuniverse-auth-proof')
    }

    stages {
        stage('Setup') {
            steps {
                sh 'pip install testuniverse'
            }
        }

        stage('Security Scan') {
            steps {
                sh '''
                    aiciv run \${GIT_URL} \\
                        --mode=ci \\
                        --pack=mvp-webapp \\
                        --gate="critical=0,high=3" \\
                        --output=./results \\
                        --format=junit,html
                '''
            }
            post {
                always {
                    junit 'results/report.junit.xml'
                    archiveArtifacts artifacts: 'results/**/*', fingerprint: true
                    publishHTML(target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'results',
                        reportFiles: 'report.html',
                        reportName: 'TestUniverse Report'
                    ])
                }
            }
        }
    }

    post {
        failure {
            slackSend(
                channel: '#security-alerts',
                message: "Security scan failed: \${env.JOB_NAME} #\${env.BUILD_NUMBER}"
            )
        }
    }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Scripted Pipeline">
        <CodeBlock title="Scripted Jenkinsfile">{`node {
    stage('Checkout') {
        checkout scm
    }

    stage('Setup') {
        sh 'pip install testuniverse'
    }

    stage('Security Scan') {
        withCredentials([
            string(credentialsId: 'testuniverse-auth-proof', variable: 'TESTUNIVERSE_AUTH_PROOF')
        ]) {
            def exitCode = sh(
                script: '''
                    aiciv run \${GIT_URL} \\
                        --mode=ci \\
                        --gate="critical=0,high=3" \\
                        --output=./results
                ''',
                returnStatus: true
            )

            junit 'results/report.junit.xml'
            archiveArtifacts artifacts: 'results/**/*'

            if (exitCode == 1) {
                currentBuild.result = 'UNSTABLE'
                echo 'Quality gate failed!'
            } else if (exitCode > 1) {
                error "Scan failed with exit code: \${exitCode}"
            }
        }
    }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Docker Agent">
        <CodeBlock title="Docker-based Pipeline">{`pipeline {
    agent {
        docker {
            image 'ghcr.io/sreejagatab/aiciv:latest'
        }
    }

    stages {
        stage('Security Scan') {
            steps {
                sh '''
                    aiciv run \${GIT_URL} \\
                        --mode=ci \\
                        --pack=mvp-webapp \\
                        --output=./results
                '''
            }
        }
    }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Credentials Setup">
        <ol className="list-decimal list-inside text-slate-300 space-y-2">
          <li>Go to Jenkins → Manage Jenkins → Credentials</li>
          <li>Add a new "Secret text" credential</li>
          <li>ID: <code className="text-primary-400">testuniverse-auth-proof</code></li>
          <li>Secret: Your authorization proof token</li>
        </ol>
        <InfoBox type="warning" title="Security">
          Use Jenkins credentials binding. Never hardcode tokens in Jenkinsfiles.
        </InfoBox>
      </DocSection>
    </DocPage>
  );
}
