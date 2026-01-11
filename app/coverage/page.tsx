'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Play, Shield, Gauge, Eye, Code, Monitor, Database, Activity,
  Server, Terminal, Smartphone, Check, Clock
} from 'lucide-react';

const coverageData = [
  {
    family: 'Functional',
    icon: Play,
    coverage: ['User journeys', 'Form submissions', 'Authentication flows', 'Navigation', 'Error handling'],
    plugins: [
      { name: 'Playwright', status: 'implemented' },
      { name: 'Cypress', status: 'planned' },
    ],
    evidence: ['Video recordings', 'Playwright traces', 'Screenshots on failure', 'Console logs'],
  },
  {
    family: 'Security',
    icon: Shield,
    coverage: ['OWASP Top 10', 'Security headers', 'Cookie security', 'TLS configuration', 'Secrets exposure', 'Dependency vulnerabilities'],
    plugins: [
      { name: 'ZAP Baseline', status: 'implemented' },
      { name: 'ZAP Full', status: 'implemented', requiresApproval: true },
      { name: 'Security Headers', status: 'implemented' },
      { name: 'Secrets Scanner', status: 'implemented' },
      { name: 'Dependency Check', status: 'implemented' },
    ],
    evidence: ['HAR files', 'ZAP reports (HTML/JSON)', 'Request/response pairs', 'SBOM (CycloneDX)'],
  },
  {
    family: 'Performance',
    icon: Gauge,
    coverage: ['Core Web Vitals (LCP, CLS, INP)', 'Time to First Byte', 'Speed Index', 'Load testing', 'Stress testing'],
    plugins: [
      { name: 'Lighthouse', status: 'implemented' },
      { name: 'k6', status: 'implemented' },
      { name: 'k6 Stress', status: 'implemented', requiresApproval: true },
    ],
    evidence: ['Lighthouse reports (HTML/JSON)', 'k6 metrics', 'Latency distributions', 'Throughput graphs'],
  },
  {
    family: 'Accessibility',
    icon: Eye,
    coverage: ['WCAG 2.1 Level A/AA/AAA', 'Color contrast', 'Keyboard navigation', 'Screen reader labels', 'Focus management', 'Heading structure'],
    plugins: [
      { name: 'Axe', status: 'implemented' },
      { name: 'Lighthouse A11y', status: 'implemented' },
    ],
    evidence: ['Element selectors', 'WCAG criterion mapping', 'Fix recommendations', 'Compliance percentages'],
  },
  {
    family: 'API',
    icon: Code,
    coverage: ['REST contract validation', 'OpenAPI schema compliance', 'GraphQL schema validation', 'Response schema matching', 'Authentication testing'],
    plugins: [
      { name: 'Newman', status: 'implemented' },
      { name: 'OpenAPI Validator', status: 'implemented' },
      { name: 'GraphQL Tester', status: 'implemented' },
    ],
    evidence: ['JUnit XML', 'Schema diff reports', 'Request/response logs'],
  },
  {
    family: 'Mobile',
    icon: Smartphone,
    coverage: ['Android/iOS testing', 'Mobile performance', 'Mobile accessibility', 'Device farm testing'],
    plugins: [
      { name: 'Appium', status: 'implemented' },
      { name: 'Device Farm', status: 'implemented' },
    ],
    evidence: ['Device screenshots', 'Video recordings', 'Performance traces'],
  },
  {
    family: 'Desktop/CLI',
    icon: Terminal,
    coverage: ['CLI smoke tests', 'Desktop UI automation', 'Installer validation', 'Interactive shell testing'],
    plugins: [
      { name: 'CLI Runner', status: 'implemented' },
      { name: 'Desktop Adapter', status: 'implemented' },
    ],
    evidence: ['Exit codes', 'Screenshots', 'Logs', 'PTY recordings'],
  },
  {
    family: 'Infrastructure',
    icon: Server,
    coverage: ['Container security', 'IaC scanning', 'Kubernetes compliance', 'Cloud security posture'],
    plugins: [
      { name: 'Trivy', status: 'implemented' },
      { name: 'Checkov', status: 'implemented' },
      { name: 'kube-bench', status: 'implemented' },
    ],
    evidence: ['CVE reports', 'CIS benchmark results', 'SBOM'],
  },
  {
    family: 'Observability',
    icon: Activity,
    coverage: ['Synthetic monitoring', 'SLO evaluation', 'Log anomaly detection', 'Chaos testing (guarded)'],
    plugins: [
      { name: 'Synthetic Monitor', status: 'implemented' },
      { name: 'SLO Evaluator', status: 'implemented' },
      { name: 'Chaos-lite', status: 'implemented', requiresApproval: true },
    ],
    evidence: ['Health check results', 'SLO burn rate', 'Error patterns'],
  },
];

export default function CoveragePage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="container-custom mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-6">Test Coverage</Badge>
            <h1 className="heading-1 text-white mb-6">
              Comprehensive Test Coverage
            </h1>
            <p className="lead max-w-3xl mx-auto">
              What TestUniverse can test, and the evidence it produces.
              Every finding backed by proof.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coverage Grid */}
      <Section>
        <div className="space-y-8">
          {coverageData.map((item, index) => (
            <motion.div
              key={item.family}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-4 gap-6 p-6">
                  {/* Family Header */}
                  <div className="md:col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.family}</h3>
                    </div>
                    {/* Coverage */}
                    <ul className="space-y-1">
                      {item.coverage.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-sm text-slate-400">
                          <Check className="w-4 h-4 text-accent-500" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Plugins */}
                  <div className="md:col-span-1">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">Plugins</h4>
                    <div className="space-y-2">
                      {item.plugins.map((plugin) => (
                        <div key={plugin.name} className="flex items-center gap-2">
                          <Badge
                            variant={plugin.status === 'implemented' ? 'accent' : 'warning'}
                            className="text-xs"
                          >
                            {plugin.status === 'implemented' ? (
                              <Check className="w-3 h-3 mr-1" />
                            ) : (
                              <Clock className="w-3 h-3 mr-1" />
                            )}
                            {plugin.name}
                          </Badge>
                          {plugin.requiresApproval && (
                            <Badge variant="error" className="text-xs">
                              Approval
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evidence */}
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">Evidence Produced</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.evidence.map((e) => (
                        <Badge key={e} variant="info" className="text-xs">
                          {e}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Note */}
      <Section dark>
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-slate-300">
              "All implemented plugins produce evidence.
              All findings link to reproducible artifacts.
              <strong className="text-white"> No claim without proof.</strong>"
            </p>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
