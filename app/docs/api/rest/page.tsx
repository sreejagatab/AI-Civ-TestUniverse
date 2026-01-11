'use client';

import { DocPage, DocSection, CodeBlock, ParamTable, InfoBox } from '@/components/docs/DocPage';

export default function RESTAPIPage() {
  return (
    <DocPage
      title="REST API"
      description="HTTP API for programmatic access"
      badge="API Reference"
      prev={{ title: 'CLI Reference', href: '/docs/api/cli' }}
      next={{ title: 'Schemas', href: '/docs/api/schemas' }}
    >
      <DocSection title="Overview">
        <p className="text-slate-300 mb-4">
          The TestUniverse REST API allows programmatic access to scan management,
          results retrieval, and configuration.
        </p>
        <InfoBox type="info" title="Base URL">
          For self-hosted: <code>http://localhost:8080/api/v1</code><br/>
          For cloud: <code>https://api.testuniverse.dev/v1</code>
        </InfoBox>
      </DocSection>

      <DocSection title="Authentication">
        <CodeBlock title="Bearer Token">{`curl -X POST https://api.testuniverse.dev/v1/scans \\
  -H "Authorization: Bearer \$API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"target": "https://example.com"}'`}</CodeBlock>
      </DocSection>

      <DocSection title="Scans">
        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Create Scan</h4>
        <CodeBlock title="POST /scans">{`POST /api/v1/scans
Content-Type: application/json

{
  "target": {
    "url": "https://example.com",
    "type": "web"
  },
  "policy": {
    "gate": {
      "critical": 0,
      "high": 3
    }
  },
  "plan": {
    "pack": "mvp-webapp",
    "timebox_seconds": 600
  }
}

Response: 201 Created
{
  "run_id": "run_abc123",
  "status": "queued",
  "created_at": "2024-01-15T10:30:00Z"
}`}</CodeBlock>

        <h4 className="text-lg font-semibold text-white mt-6 mb-3">Get Scan Status</h4>
        <CodeBlock title="GET /scans/:id">{`GET /api/v1/scans/run_abc123

Response: 200 OK
{
  "run_id": "run_abc123",
  "status": "running",
  "progress": {
    "phase": "EXECUTION",
    "percent": 65,
    "current_plugin": "zap-baseline"
  },
  "started_at": "2024-01-15T10:30:05Z"
}`}</CodeBlock>

        <h4 className="text-lg font-semibold text-white mt-6 mb-3">List Scans</h4>
        <CodeBlock title="GET /scans">{`GET /api/v1/scans?status=completed&limit=10

Response: 200 OK
{
  "scans": [
    {
      "run_id": "run_abc123",
      "target": "https://example.com",
      "status": "completed",
      "gate_passed": true,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 42,
  "page": 1
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Findings">
        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Get Findings</h4>
        <CodeBlock title="GET /scans/:id/findings">{`GET /api/v1/scans/run_abc123/findings?severity=critical,high

Response: 200 OK
{
  "findings": [
    {
      "finding_id": "find_xyz789",
      "title": "SQL Injection in Search",
      "severity": "critical",
      "confidence": 0.98,
      "family": "security",
      "location": {
        "url": "https://example.com/search",
        "parameter": "q"
      }
    }
  ],
  "total": 5
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Reports">
        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Get Report</h4>
        <CodeBlock title="GET /scans/:id/report">{`# JSON Report
GET /api/v1/scans/run_abc123/report?format=json

# HTML Report
GET /api/v1/scans/run_abc123/report?format=html

# SARIF Report
GET /api/v1/scans/run_abc123/report?format=sarif`}</CodeBlock>
      </DocSection>

      <DocSection title="Webhooks">
        <CodeBlock title="POST /webhooks">{`POST /api/v1/webhooks
Content-Type: application/json

{
  "url": "https://your-server.com/webhook",
  "events": ["scan.completed", "scan.failed"],
  "secret": "webhook-secret"
}

# Webhook Payload
{
  "event": "scan.completed",
  "run_id": "run_abc123",
  "timestamp": "2024-01-15T10:35:00Z",
  "data": {
    "gate_passed": true,
    "findings_count": 12
  }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Error Responses">
        <CodeBlock title="Error Format">{`{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired API token",
    "details": {}
  }
}

Common Error Codes:
- 400 BAD_REQUEST - Invalid request body
- 401 UNAUTHORIZED - Invalid authentication
- 403 FORBIDDEN - Insufficient permissions
- 404 NOT_FOUND - Resource not found
- 429 RATE_LIMITED - Too many requests
- 500 INTERNAL_ERROR - Server error`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
