'use client';

import { DocPage, DocSection, CodeBlock, InfoBox } from '@/components/docs/DocPage';

export default function SchemasPage() {
  return (
    <DocPage
      title="Schemas"
      description="JSON schemas for TestUniverse data structures"
      badge="API Reference"
      prev={{ title: 'REST API', href: '/docs/api/rest' }}
      next={{ title: 'Quickstart', href: '/docs/quickstart' }}
    >
      <DocSection title="Finding Schema">
        <CodeBlock title="finding.schema.json">{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["finding_id", "title", "severity", "family", "tool"],
  "properties": {
    "schema_version": {
      "type": "string",
      "const": "1.0.0"
    },
    "finding_id": {
      "type": "string",
      "pattern": "^find_[a-z0-9]+$"
    },
    "run_id": {
      "type": "string",
      "pattern": "^run_[a-z0-9]+$"
    },
    "title": {
      "type": "string",
      "maxLength": 200
    },
    "description": {
      "type": "string"
    },
    "severity": {
      "type": "string",
      "enum": ["critical", "high", "medium", "low", "info"]
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    },
    "family": {
      "type": "string",
      "enum": ["security", "performance", "accessibility", "api", "functional"]
    },
    "category": {
      "type": "string"
    },
    "tool": {
      "type": "object",
      "required": ["plugin_id"],
      "properties": {
        "plugin_id": { "type": "string" },
        "tool_name": { "type": "string" },
        "tool_version": { "type": "string" },
        "rule_id": { "type": "string" }
      }
    },
    "location": {
      "type": "object",
      "properties": {
        "url": { "type": "string", "format": "uri" },
        "method": { "type": "string" },
        "parameter": { "type": "string" },
        "line": { "type": "integer" },
        "column": { "type": "integer" }
      }
    },
    "evidence": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": { "type": "string" },
          "artifact_ref": { "type": "string" },
          "content": {},
          "description": { "type": "string" }
        }
      }
    },
    "fix": {
      "type": "object",
      "properties": {
        "summary": { "type": "string" },
        "guidance": { "type": "string" },
        "references": {
          "type": "array",
          "items": { "type": "string", "format": "uri" }
        }
      }
    }
  }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Target Schema">
        <CodeBlock title="target.schema.json">{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["id", "type", "url"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$"
    },
    "type": {
      "type": "string",
      "enum": ["web", "api", "repo", "mobile", "cli", "infra"]
    },
    "url": {
      "type": "string",
      "format": "uri"
    },
    "name": {
      "type": "string"
    },
    "auth": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["bearer", "basic", "cookie", "oauth2", "custom"]
        }
      }
    },
    "scope": {
      "type": "object",
      "properties": {
        "include": {
          "type": "array",
          "items": { "type": "string" }
        },
        "exclude": {
          "type": "array",
          "items": { "type": "string" }
        },
        "max_depth": { "type": "integer" },
        "same_origin": { "type": "boolean" }
      }
    }
  }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Policy Schema">
        <CodeBlock title="policy.schema.json">{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "gate": {
      "type": "object",
      "properties": {
        "critical": { "type": "integer", "minimum": 0 },
        "high": { "type": "integer", "minimum": 0 },
        "medium": { "type": "integer", "minimum": 0 },
        "low": { "type": "integer", "minimum": 0 }
      }
    },
    "families": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["security", "performance", "accessibility", "api", "functional"]
      }
    },
    "confidence_threshold": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    },
    "severity_threshold": {
      "type": "string",
      "enum": ["critical", "high", "medium", "low", "info"]
    },
    "timebox_seconds": {
      "type": "integer",
      "minimum": 60,
      "maximum": 86400
    },
    "rate_limit": {
      "type": "object",
      "properties": {
        "requests_per_second": { "type": "integer" },
        "burst": { "type": "integer" },
        "max_concurrent": { "type": "integer" }
      }
    }
  }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Report Schema">
        <CodeBlock title="report.schema.json">{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["run_id", "summary", "findings"],
  "properties": {
    "schema_version": { "type": "string" },
    "run_id": { "type": "string" },
    "target": { "$ref": "#/definitions/target" },
    "summary": {
      "type": "object",
      "properties": {
        "total": { "type": "integer" },
        "by_severity": {
          "type": "object",
          "properties": {
            "critical": { "type": "integer" },
            "high": { "type": "integer" },
            "medium": { "type": "integer" },
            "low": { "type": "integer" }
          }
        },
        "by_family": { "type": "object" },
        "duration_seconds": { "type": "number" }
      }
    },
    "gate": {
      "type": "object",
      "properties": {
        "passed": { "type": "boolean" },
        "thresholds": { "type": "object" },
        "violations": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "findings": {
      "type": "array",
      "items": { "$ref": "#/definitions/finding" }
    },
    "metadata": {
      "type": "object",
      "properties": {
        "started_at": { "type": "string", "format": "date-time" },
        "completed_at": { "type": "string", "format": "date-time" },
        "plugins_run": { "type": "array", "items": { "type": "string" } }
      }
    }
  }
}`}</CodeBlock>
      </DocSection>

      <DocSection title="Downloading Schemas">
        <CodeBlock title="bash">{`# Download all schemas
curl -O https://raw.githubusercontent.com/sreejagatab/AI-Civ-TestUniverse/main/schemas/finding.schema.json
curl -O https://raw.githubusercontent.com/sreejagatab/AI-Civ-TestUniverse/main/schemas/target.schema.json
curl -O https://raw.githubusercontent.com/sreejagatab/AI-Civ-TestUniverse/main/schemas/policy.schema.json
curl -O https://raw.githubusercontent.com/sreejagatab/AI-Civ-TestUniverse/main/schemas/report.schema.json`}</CodeBlock>
        <InfoBox type="info" title="Validation">
          Use these schemas to validate your configuration files and API responses.
        </InfoBox>
      </DocSection>
    </DocPage>
  );
}
