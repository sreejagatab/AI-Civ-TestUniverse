'use client';

import { DocPage, DocSection, CodeBlock, InfoBox } from '@/components/docs/DocPage';

export default function WritingPluginsPage() {
  return (
    <DocPage
      title="Writing Plugins"
      description="Create custom plugins for TestUniverse"
      badge="Plugins"
      prev={{ title: 'k6', href: '/docs/plugins/k6' }}
      next={{ title: 'GitHub Actions', href: '/docs/ci-cd/github-actions' }}
    >
      <DocSection title="Plugin Structure">
        <CodeBlock title="Directory Layout">{`plugins/
└── my-plugin/
    ├── plugin.yaml          # Plugin manifest
    ├── __init__.py
    ├── plugin.py            # Main plugin class
    ├── normalizer.py        # Output normalizer
    ├── tests/
    │   ├── test_plugin.py
    │   └── fixtures/
    │       └── sample_output.json
    └── README.md`}</CodeBlock>
      </DocSection>

      <DocSection title="Plugin Manifest">
        <CodeBlock title="plugin.yaml">{`id: plugin.my-tool
name: My Tool
version: 1.0.0
author: Your Name

# Tool requirements
tool:
  name: mytool
  version: ">=2.0"
  install: "pip install mytool"

# Capabilities
capabilities:
  target_types:
    - web
    - api
  families:
    - security
  evidence_types:
    - json
    - html

# Resource requirements
resources:
  memory_mb: 512
  timeout_seconds: 300

# Dependencies
dependencies:
  - recon  # Depends on recon plugin`}</CodeBlock>
      </DocSection>

      <DocSection title="Plugin Implementation">
        <CodeBlock title="plugin.py">{`from testuniverse.plugin_sdk import (
    PluginInterface,
    PluginMeta,
    PluginCapabilities,
    ExecutionSpec,
    ExecutionResult,
    Finding,
    TargetType,
    TestFamily,
    ResourceLimits,
)
from typing import List


class MyToolPlugin(PluginInterface):
    """Custom plugin for MyTool."""

    def meta(self) -> PluginMeta:
        return PluginMeta(
            id="plugin.my-tool",
            name="My Tool",
            version="1.0.0",
            author="Your Name",
            tool_name="mytool",
            tool_version=">=2.0",
        )

    def capabilities(self) -> PluginCapabilities:
        return PluginCapabilities(
            target_types=[TargetType.WEB],
            families=[TestFamily.SECURITY],
            evidence_types=["json", "html"],
        )

    def configure(self, target, policy, plan) -> ExecutionSpec:
        """Generate execution configuration."""
        return ExecutionSpec(
            image="mytool/mytool:latest",
            command=[
                "mytool",
                "scan",
                target.url,
                "--format=json",
                f"--timeout={policy.timebox_seconds}",
            ],
            timeout_seconds=policy.timebox_seconds,
            resource_limits=ResourceLimits(memory_mb=512),
            environment={
                "MYTOOL_API_KEY": "$MYTOOL_API_KEY",
            },
            output_files=["report.json", "report.html"],
        )

    def execute(self, spec: ExecutionSpec) -> ExecutionResult:
        """Execute the plugin (handled by engine)."""
        # The engine handles actual execution
        # This method is for custom execution if needed
        pass

    def normalize(self, result: ExecutionResult, artifacts: dict) -> List[Finding]:
        """Convert tool output to findings."""
        findings = []

        report = artifacts.get("report.json", {})
        for issue in report.get("issues", []):
            findings.append(Finding(
                title=issue["title"],
                description=issue.get("description", ""),
                severity=self._map_severity(issue["severity"]),
                confidence=issue.get("confidence", 0.8),
                family=TestFamily.SECURITY,
                category=issue.get("category", "unknown"),
                tool={
                    "plugin_id": self.meta().id,
                    "rule_id": issue.get("rule_id"),
                },
                location={
                    "url": issue.get("url"),
                    "parameter": issue.get("parameter"),
                },
                evidence=[{
                    "type": "json",
                    "content": issue,
                }],
                fix={
                    "summary": issue.get("fix", ""),
                    "references": issue.get("references", []),
                },
            ))

        return findings

    def _map_severity(self, tool_severity: str) -> str:
        mapping = {
            "critical": "critical",
            "high": "high",
            "medium": "medium",
            "low": "low",
            "info": "info",
        }
        return mapping.get(tool_severity.lower(), "medium")`}</CodeBlock>
      </DocSection>

      <DocSection title="Testing Your Plugin">
        <CodeBlock title="test_plugin.py">{`import pytest
from my_plugin import MyToolPlugin


def test_meta():
    plugin = MyToolPlugin()
    meta = plugin.meta()
    assert meta.id == "plugin.my-tool"


def test_normalize():
    plugin = MyToolPlugin()

    mock_result = ExecutionResult(exit_code=0)
    mock_artifacts = {
        "report.json": {
            "issues": [{
                "title": "Test Issue",
                "severity": "high",
                "url": "https://example.com",
            }]
        }
    }

    findings = plugin.normalize(mock_result, mock_artifacts)
    assert len(findings) == 1
    assert findings[0].severity == "high"`}</CodeBlock>
      </DocSection>

      <DocSection title="Publishing">
        <CodeBlock title="bash">{`# Validate plugin
aiciv plugins validate ./my-plugin

# Test locally
aiciv run https://example.com --plugin-dir=./my-plugin

# Submit PR to plugins repository
# Include sample output and tests`}</CodeBlock>
        <InfoBox type="info" title="Plugin Registry">
          Plugins can be published to the community registry for others to use.
          See the contribution guidelines for requirements.
        </InfoBox>
      </DocSection>
    </DocPage>
  );
}
