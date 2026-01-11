'use client';

import { DocPage, DocSection, CodeBlock, InfoBox, ParamTable } from '@/components/docs/DocPage';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function PluginsOverviewPage() {
  return (
    <DocPage
      title="Plugins Overview"
      description="Extending TestUniverse with testing tools"
      badge="Plugins"
      prev={{ title: 'Audit Logs', href: '/docs/governance/audit-logs' }}
      next={{ title: 'Lighthouse', href: '/docs/plugins/lighthouse' }}
    >
      <DocSection title="What are Plugins?">
        <p className="text-slate-300 mb-4">
          Plugins are adapters that integrate external testing tools into TestUniverse.
          Each plugin wraps a tool (like Lighthouse, ZAP, or Axe) and normalizes its
          output to the universal Finding schema.
        </p>
      </DocSection>

      <DocSection title="Available Plugins">
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-bold text-white">Lighthouse</h4>
                <Badge variant="accent">Performance</Badge>
              </div>
              <p className="text-sm text-slate-400">Core Web Vitals, SEO, best practices</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-bold text-white">Axe</h4>
                <Badge variant="accent">Accessibility</Badge>
              </div>
              <p className="text-sm text-slate-400">WCAG 2.1 compliance testing</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-bold text-white">ZAP</h4>
                <Badge variant="error">Security</Badge>
              </div>
              <p className="text-sm text-slate-400">OWASP ZAP security scanning</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-bold text-white">k6</h4>
                <Badge variant="warning">Performance</Badge>
              </div>
              <p className="text-sm text-slate-400">Load and stress testing</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-bold text-white">Newman</h4>
                <Badge variant="primary">API</Badge>
              </div>
              <p className="text-sm text-slate-400">Postman collection runner</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-bold text-white">Trivy</h4>
                <Badge variant="error">Security</Badge>
              </div>
              <p className="text-sm text-slate-400">Container vulnerability scanning</p>
            </CardContent>
          </Card>
        </div>
      </DocSection>

      <DocSection title="Plugin Architecture">
        <CodeBlock title="Plugin Lifecycle">{`┌─────────────────┐
│    CONFIGURE    │  → Generate execution spec
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     EXECUTE     │  → Run in Docker sandbox
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   NORMALIZE     │  → Convert to Finding schema
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    VALIDATE     │  → Schema validation
└─────────────────┘`}</CodeBlock>
      </DocSection>

      <DocSection title="Plugin Interface">
        <CodeBlock title="PluginInterface">{`class PluginInterface(ABC):
    @abstractmethod
    def meta(self) -> PluginMeta:
        """Plugin metadata"""
        pass

    @abstractmethod
    def capabilities(self) -> PluginCapabilities:
        """What the plugin can test"""
        pass

    @abstractmethod
    def configure(self, target, policy, plan) -> ExecutionSpec:
        """Generate execution configuration"""
        pass

    @abstractmethod
    def execute(self, spec: ExecutionSpec) -> ExecutionResult:
        """Run the plugin"""
        pass

    @abstractmethod
    def normalize(self, result, artifacts) -> List[Finding]:
        """Convert output to findings"""
        pass`}</CodeBlock>
      </DocSection>

      <DocSection title="Listing Plugins">
        <CodeBlock title="bash">{`# List all available plugins
aiciv plugins list

# Show plugin details
aiciv plugins info lighthouse

# Check plugin dependencies
aiciv plugins check`}</CodeBlock>
      </DocSection>
    </DocPage>
  );
}
