'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Terminal } from '@/components/ui/Terminal';
import { Check, ArrowRight, Clock, AlertTriangle } from 'lucide-react';

const installCommands = `# Install via pip
pip install aiciv

# Or with Docker
docker pull ghcr.io/sreejagatab/aiciv:latest

# Verify installation
aiciv --version`;

const firstScan = `# Create a basic target configuration
cat > target.yaml << 'EOF'
target:
  id: my-webapp
  type: web
  url: https://staging.example.com

policy:
  severity_threshold: high

plan:
  pack: mvp-webapp
EOF

# Run your first scan
aiciv run target.yaml

# Or use the quick command
aiciv run https://staging.example.com --pack=mvp-webapp`;

const exampleOutput = `$ aiciv run https://staging.example.com --pack=mvp-webapp

🎯 Target: https://staging.example.com
📋 Pack: mvp-webapp (7 plugins)

Phase 1: RECON
  ✓ Fingerprinting complete
  ✓ Detected: React SPA, Node.js backend, PostgreSQL

Phase 2: PLANNING
  ✓ Selected plugins: lighthouse, axe, zap-baseline, security-headers
  ✓ Estimated duration: 5-8 minutes

Phase 3: EXECUTION
  [████████████████████████████████████████] 100%
  ✓ lighthouse: 45 findings
  ✓ axe: 12 findings
  ✓ zap-baseline: 8 findings
  ✓ security-headers: 3 findings

Phase 4: TRIAGE
  ✓ Normalized: 68 → 52 unique findings
  ✓ Deduplicated: 16 duplicates removed
  ✓ Scored: severity and confidence assigned

Phase 5: REPORT
  ✓ Generated: report.html, report.json, report.sarif

═══════════════════════════════════════════════
SUMMARY
═══════════════════════════════════════════════
  CRITICAL: 0
  HIGH:     2
  MEDIUM:   15
  LOW:      35

  Quality Gate: PASS (threshold: critical=0, high=5)
  Duration: 4m 32s

Reports:
  → report.html (human-readable)
  → report.json (machine-readable)
  → report.sarif (GitHub Security)`;

const steps = [
  {
    number: 1,
    title: 'Install',
    description: 'Install via pip or Docker',
    duration: '< 1 min',
  },
  {
    number: 2,
    title: 'Configure',
    description: 'Create target.yaml or use CLI flags',
    duration: '< 1 min',
  },
  {
    number: 3,
    title: 'Run',
    description: 'Execute your first scan',
    duration: '~5 min',
  },
  {
    number: 4,
    title: 'Review',
    description: 'Analyze findings and evidence',
    duration: 'varies',
  },
];

export default function QuickstartPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-12 px-4">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-4">Documentation</Badge>
            <h1 className="heading-1 text-white mb-4">
              Quickstart Guide
            </h1>
            <p className="lead max-w-2xl">
              Get your first scan running in under 5 minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Overview */}
      <Section>
        <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center">
                <CardContent className="py-6">
                  <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-primary-400">{step.number}</span>
                  </div>
                  <h3 className="font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-400 mb-2">{step.description}</p>
                  <Badge variant="info" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {step.duration}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Step 1: Install */}
      <Section dark title="Step 1: Install TestUniverse">
        <div className="max-w-3xl mx-auto">
          <Terminal title="bash" animate={false}>
            {installCommands}
          </Terminal>
          <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-400 mb-1">Prerequisites</h4>
                <p className="text-sm text-slate-300">
                  Requires Python 3.10+ or Docker 20+. Some plugins require additional
                  tools (e.g., Node.js for Lighthouse, Java for ZAP).
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Step 2: Configure */}
      <Section title="Step 2: Configure Your Target">
        <div className="max-w-3xl mx-auto">
          <Terminal title="bash" animate={false}>
            {firstScan}
          </Terminal>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="py-4">
                <h4 className="font-semibold text-white mb-2">MVP Packs</h4>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-500" />
                    mvp-webapp
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-500" />
                    mvp-api
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-500" />
                    mvp-security
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-4">
                <h4 className="font-semibold text-white mb-2">Target Types</h4>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-500" />
                    web (URLs)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-500" />
                    api (REST/GraphQL)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-500" />
                    repo (Git repos)
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-4">
                <h4 className="font-semibold text-white mb-2">Output Formats</h4>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-500" />
                    HTML report
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-500" />
                    JSON/SARIF
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-500" />
                    JUnit XML
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Step 3: Run */}
      <Section dark title="Step 3: Run Your First Scan">
        <div className="max-w-4xl mx-auto">
          <Terminal title="Terminal" animate={false}>
            {exampleOutput}
          </Terminal>
        </div>
      </Section>

      {/* Step 4: Review */}
      <Section title="Step 4: Review Results">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="py-6">
              <h3 className="text-lg font-bold text-white mb-4">Understanding Your Report</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-red-400">C</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Critical</h4>
                    <p className="text-sm text-slate-400">
                      Exploitable vulnerabilities requiring immediate action
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-orange-400">H</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">High</h4>
                    <p className="text-sm text-slate-400">
                      Serious issues that should be addressed soon
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-amber-400">M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Medium</h4>
                    <p className="text-sm text-slate-400">
                      Issues to fix in your normal development cycle
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-green-400">L</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Low</h4>
                    <p className="text-sm text-slate-400">
                      Best practices and minor improvements
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Next Steps */}
      <Section dark title="Next Steps">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link href="/docs/concepts/targets">
            <Card hover className="h-full">
              <CardContent className="py-6">
                <h3 className="font-bold text-white mb-2">Learn Core Concepts</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Understand targets, policies, plans, and findings
                </p>
                <span className="text-primary-400 text-sm flex items-center gap-1">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/ci-cd/github-actions">
            <Card hover className="h-full">
              <CardContent className="py-6">
                <h3 className="font-bold text-white mb-2">CI/CD Integration</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Add TestUniverse to your GitHub Actions pipeline
                </p>
                <span className="text-primary-400 text-sm flex items-center gap-1">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/plugins/writing-plugins">
            <Card hover className="h-full">
              <CardContent className="py-6">
                <h3 className="font-bold text-white mb-2">Write a Plugin</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Extend TestUniverse with your own testing tools
                </p>
                <span className="text-primary-400 text-sm flex items-center gap-1">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </Section>
    </div>
  );
}
