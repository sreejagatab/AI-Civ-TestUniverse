'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Wrench,
  AlertTriangle,
  Shield,
  Target,
  Box,
  FileJson,
  Lock,
  Camera,
  Github,
  Zap,
  Check,
  Play
} from 'lucide-react';
import { Terminal } from '@/components/ui/Terminal';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const terminalContent = `$ aiciv run https://example.com --pack=webapp-standard

✓ Recon complete (47 routes discovered)
✓ Lighthouse: 3 performance findings
✓ Axe: 7 accessibility violations
✓ ZAP: 2 security issues (1 HIGH)
✓ Dedupe: 12 → 9 unique findings
✓ Report generated: report.html

Quality Gate: PASSED (0 critical, 1 high)
Exit code: 0`;

const problems = [
  {
    icon: Wrench,
    title: 'Tools ≠ Testing',
    description: 'You have 15 tools. None of them talk to each other. You\'re drowning in JSON outputs nobody reads.',
  },
  {
    icon: AlertTriangle,
    title: 'Noise Everywhere',
    description: 'False positives, duplicate findings, flaky tests. Your team ignores 80% of alerts.',
  },
  {
    icon: Shield,
    title: 'No Governance',
    description: 'Who approved this scan? What\'s the scope? Where\'s the evidence? Auditors ask, you scramble.',
  },
  {
    icon: Target,
    title: 'Coverage ≠ Confidence',
    description: '100% code coverage means nothing if you can\'t reproduce a single finding.',
  },
];

const solutions = [
  {
    number: '01',
    title: 'Orchestrates, Doesn\'t Replace',
    description: 'We wrap Playwright, Lighthouse, ZAP, Axe, k6, and more. Best-in-class tools, unified interface.',
    plugins: ['Playwright', 'Lighthouse', 'ZAP', 'Axe', 'k6', 'Newman'],
  },
  {
    number: '02',
    title: 'Governance Built-In',
    description: 'Every scan requires authorization proof, scope allowlist, and rate limits. The Governor agent has veto power.',
  },
  {
    number: '03',
    title: 'Evidence for Every Claim',
    description: 'No finding without proof. Screenshots, HAR files, reproduction steps, and video traces attached.',
  },
  {
    number: '04',
    title: 'Confidence, Not Coverage',
    description: 'Dedupe, flake detection, severity scoring, and verification reruns. Only real issues surface.',
  },
];

const differentiators = [
  {
    title: 'Constitutional AI',
    description: '5 immutable rules that cannot be bypassed. Governance > Autonomy. Always.',
    link: '/architecture#constitution',
  },
  {
    title: '10 Specialized Agents',
    description: 'Planner, Governor, Sentinel, Scholar, Economist... Each with clear responsibility and boundaries.',
    link: '/how-it-works#agents',
  },
  {
    title: 'Universal Finding Schema',
    description: 'Every tool\'s output normalized to one schema. Compare ZAP to Lighthouse to Axe. Finally.',
    link: '/architecture#finding-schema',
  },
  {
    title: 'Attack Mode Gating',
    description: 'Active security scanning requires 3-step approval. Audit trail for every destructive action.',
    link: '/how-it-works#attack-mode',
  },
];

const stats = [
  { value: '14+', label: 'Testing Plugins' },
  { value: '10', label: 'AI Agents' },
  { value: '<5min', label: 'First Report' },
  { value: '335+', label: 'Source Files' },
];

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent" />

        <div className="container-custom mx-auto px-4 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="primary" className="mb-6">
                Open Source Testing Framework
              </Badge>
            </motion.div>

            <motion.h1
              className="heading-1 text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Universal Software Testing
            </motion.h1>

            <motion.h2
              className="text-3xl md:text-4xl font-bold gradient-text mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Evidence. Governance. Confidence.
            </motion.h2>

            <motion.p
              className="lead max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              AI-powered test orchestration that wraps your favorite tools,
              eliminates noise, and proves every finding.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/architecture" className="btn-primary">
                View Architecture <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/results" className="btn-outline">
                See Real Results
              </Link>
              <Link href="/docs/quickstart" className="btn-ghost">
                <Play className="w-4 h-4" /> Run the Demo
              </Link>
            </motion.div>
          </div>

          {/* Terminal Animation */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Terminal title="bash" animate={true}>
              {terminalContent}
            </Terminal>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-950 border-y border-slate-800">
        <div className="container-custom mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <Section
        title="The Problem with Testing Today"
        subtitle="Sound familiar? You're not alone."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                    <problem.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <CardTitle>{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{problem.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Solution Section */}
      <Section
        title="What TestUniverse Does Differently"
        subtitle="Not another tool. An orchestration layer."
        dark
      >
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <span className="text-4xl font-bold text-primary-500/30">
                      {solution.number}
                    </span>
                    <div>
                      <CardTitle>{solution.title}</CardTitle>
                      <CardDescription>{solution.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {solution.plugins && (
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {solution.plugins.map((plugin) => (
                        <Badge key={plugin} variant="info">
                          {plugin}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Why Engineers Trust Section */}
      <Section
        title="Why Engineers Trust TestUniverse"
        subtitle="Built for security-conscious teams."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={item.link}>
                <Card hover className="h-full group">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary-400 transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400">{item.description}</p>
                    <div className="mt-4 flex items-center text-primary-400 text-sm font-medium">
                      Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Philosophy Points */}
      <Section dark>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Box, text: 'Every plugin runs in an isolated Docker container' },
            { icon: FileJson, text: 'Every output normalizes to Universal Finding schema' },
            { icon: Lock, text: 'Every execution approved by Governor first' },
            { icon: Camera, text: 'Every finding includes evidence artifacts' },
          ].map((item, index) => (
            <motion.div
              key={item.text}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 rounded-full bg-primary-500/20 flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-primary-400" />
              </div>
              <p className="text-sm text-slate-300">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 via-transparent to-transparent" />

        <div className="container-custom mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 text-white mb-6">
              Ready to test with confidence?
            </h2>
            <p className="lead max-w-2xl mx-auto mb-10">
              Get your first security report in under 5 minutes.
              No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs/quickstart" className="btn-primary text-lg px-8 py-3">
                Get Started (5 min) <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://github.com/sreejagatab/AI-Civ-TestUniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-8 py-3"
              >
                <Github className="w-5 h-5" /> View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
