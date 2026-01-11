'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Check, Clock, Calendar, Target, Shield, X, ArrowRight,
  Brain, Plug, Globe, Code, Gauge, GitBranch, FileText, Filter,
  FileOutput, Smartphone, Terminal, Server, Activity, Github
} from 'lucide-react';

const completedItems = [
  { title: 'Constitutional AI Framework', description: '10 agents with clear boundaries and governance', icon: Brain },
  { title: 'Plugin System', description: 'Sandboxed execution, universal schema, 14+ built-in plugins', icon: Plug },
  { title: 'Web Testing', description: 'Playwright, Lighthouse, Axe, ZAP, Security Headers', icon: Globe },
  { title: 'API Testing', description: 'Newman, OpenAPI validator, GraphQL tester', icon: Code },
  { title: 'Performance Testing', description: 'Lighthouse CWV, k6 load testing', icon: Gauge },
  { title: 'CI/CD Integration', description: 'GitHub Actions, GitLab CI, Jenkins, Azure Pipelines', icon: GitBranch },
  { title: 'Evidence System', description: 'Artifact storage, evidence bundles, retention policies', icon: FileText },
  { title: 'Triage System', description: 'Deduplication, severity scoring, confidence adjustment', icon: Filter },
  { title: 'Report Generation', description: 'HTML, JSON, JUnit, SARIF, Markdown, PR comments', icon: FileOutput },
  { title: 'Mobile Testing', description: 'Appium adapter, Device Farm integration', icon: Smartphone },
  { title: 'Desktop & CLI Testing', description: 'CLI smoke runner, Desktop automation', icon: Terminal },
  { title: 'Infrastructure Testing', description: 'Trivy, Checkov, kube-bench', icon: Server },
  { title: 'Observability Testing', description: 'Synthetic monitoring, SLO evaluation, Chaos-lite', icon: Activity },
];

const inProgressItems = [
  {
    title: 'E2E Demo Suite',
    description: 'Public, reproducible demos proving the system works',
    eta: 'Q1 2025',
    details: ['5 demo targets (vulnerable, marketing, API, GraphQL, auth)', 'Golden baseline regression tests', 'CI running nightly'],
  },
  {
    title: 'CLI Polish',
    description: 'Product-ready command-line experience',
    eta: 'Q1 2025',
    details: ['`aiciv init` wizard', 'Progress bars and ETA', '`aiciv doctor` diagnostics'],
  },
];

const plannedItems = [
  {
    title: 'Visual Regression Testing',
    description: 'Pixel-perfect screenshot comparison',
    eta: 'Q2 2025',
    details: ['Percy/Chromatic integration', 'Baseline management', 'Diff visualization'],
  },
  {
    title: 'AI-Powered Triage',
    description: 'Intelligent finding categorization',
    eta: 'Q2 2025',
    details: ['Auto-categorization of findings', 'False positive detection', 'Priority recommendations'],
  },
  {
    title: 'Multi-Cloud Security',
    description: 'AWS, Azure, GCP security posture',
    eta: 'Q3 2025',
    details: ['Cloud-specific security checks', 'IAM analysis', 'Resource compliance'],
  },
];

const neverAutomate = [
  {
    title: 'Unauthorized Scanning',
    description: 'We will never scan systems without explicit authorization. The Governor enforces this with veto power.',
    icon: Shield,
  },
  {
    title: 'Destructive Actions Without Approval',
    description: 'Active security testing (fuzzing, injection attempts) always requires 3-step approval process.',
    icon: X,
  },
  {
    title: 'Storing Actual Secrets',
    description: 'Secrets are ALWAYS redacted. We detect them, we don\'t store them. Evidence shows "[REDACTED]", never the actual value.',
    icon: Shield,
  },
  {
    title: 'Bypassing Rate Limits',
    description: 'Rate limits are enforced, not suggested. We respect target systems and their capacity.',
    icon: Target,
  },
  {
    title: 'Silent Failures',
    description: 'Every action is logged. Every decision is auditable. If something fails, you\'ll know why.',
    icon: FileText,
  },
  {
    title: 'Magic AI Decisions',
    description: 'We orchestrate tools, not replace them. Every finding comes from a real tool with real evidence. No hallucinated vulnerabilities.',
    icon: Brain,
  },
];

const philosophy = [
  {
    quote: 'Coverage is a lie. Confidence is the product.',
    explanation: '100% code coverage means nothing if you can\'t reproduce a single finding. We measure success by confidence: can you trust this result?',
  },
  {
    quote: 'Governance is not optional.',
    explanation: 'In a world of autonomous AI, constraints aren\'t limitations—they\'re features. The Governor\'s veto power isn\'t a bug, it\'s the whole point.',
  },
  {
    quote: 'Evidence for every claim.',
    explanation: 'No finding without proof. Screenshots, HAR files, reproduction steps. If you can\'t reproduce it, it didn\'t happen.',
  },
  {
    quote: 'Orchestrate, don\'t reinvent.',
    explanation: 'Lighthouse, ZAP, Axe, k6—these tools are excellent. We make them work together, not replace them.',
  },
];

export default function RoadmapPage() {
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
            <Badge variant="primary" className="mb-6">Roadmap</Badge>
            <h1 className="heading-1 text-white mb-6">
              Roadmap & Vision
            </h1>
            <p className="lead max-w-3xl mx-auto">
              Where we are, where we're going, and what we'll never do.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What's Done */}
      <Section title="What's Done" subtitle="Core features that are production-ready">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-accent-500/30">
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-accent-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <Check className="w-4 h-4 text-accent-500" />
                      </div>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* What's In Progress */}
      <Section dark title="In Progress" subtitle="Currently being developed">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {inProgressItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-amber-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="warning" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      In Progress
                    </Badge>
                    <Badge variant="info">{item.eta}</Badge>
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* What's Planned */}
      <Section title="What's Planned" subtitle="On the roadmap for future releases">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plannedItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-primary-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="primary" className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Planned
                    </Badge>
                    <Badge variant="info">{item.eta}</Badge>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* What We'll Never Automate */}
      <Section
        dark
        title="What We'll Never Automate"
        subtitle="Some things shouldn't be automated. This is a trust signal."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {neverAutomate.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-red-500/30 bg-red-500/5">
                <CardContent className="py-6">
                  <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Philosophy */}
      <Section title="Our Philosophy" subtitle="The principles that guide every decision">
        <div className="max-w-4xl mx-auto space-y-6">
          {philosophy.map((item, index) => (
            <motion.div
              key={item.quote}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-primary-500/30">
                <CardContent className="py-6">
                  <blockquote className="text-xl font-bold text-primary-400 mb-3">
                    "{item.quote}"
                  </blockquote>
                  <p className="text-slate-400">{item.explanation}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 text-white mb-6">
              Ready to test with confidence?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs/quickstart" className="btn-primary text-lg px-8 py-3">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://github.com/sreejagatab/AI-Civ-TestUniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-8 py-3"
              >
                <Github className="w-5 h-5 mr-2" /> View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
