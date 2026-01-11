'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Building,
  Shield,
  Map,
  Hammer,
  Play,
  BookOpen,
  FlaskConical,
  DollarSign,
  MessageSquare,
  Eye,
  Lock,
  Target,
  Gauge,
  AlertOctagon,
  Box,
  FileJson,
  Camera
} from 'lucide-react';

const passes = [
  {
    number: 1,
    name: 'RECON',
    duration: '5-10 min',
    description: 'Fingerprint the target. Discover routes, detect stack, identify auth requirements, find API endpoints.',
    outputs: ['47 routes', 'Next.js detected', 'JWT auth', 'GraphQL endpoint'],
    color: 'blue',
  },
  {
    number: 2,
    name: 'PLANNING',
    duration: '< 1 min',
    description: 'Planner agent selects test families, chooses plugins, allocates budget based on target fingerprint.',
    outputs: ['webapp-standard pack', '6 plugins selected', '30 min budget'],
    color: 'purple',
  },
  {
    number: 3,
    name: 'EXECUTION',
    duration: '10-30 min',
    description: 'Run plugins in parallel (DAG-ordered). Capture artifacts. Sentinel monitors for overload. Economist tracks budget.',
    outputs: ['Lighthouse', 'Axe', 'ZAP baseline', 'Security headers'],
    color: 'amber',
  },
  {
    number: 4,
    name: 'TRIAGE',
    duration: '< 1 min',
    description: 'Deduplicate findings. Score severity. Adjust confidence. Filter flaky results. Compare to baseline.',
    outputs: ['23 raw → 12 unique', '2 HIGH, 4 MEDIUM', '94% confidence'],
    color: 'emerald',
  },
  {
    number: 5,
    name: 'VERIFY',
    duration: 'Optional',
    description: 'Rerun to confirm findings are reproducible. Flaky findings downgraded. Deterministic findings boosted.',
    outputs: ['11/12 confirmed', '1 marked intermittent'],
    color: 'green',
  },
];

const agents = [
  {
    name: 'Architect',
    icon: Building,
    role: 'Purpose & Vision',
    responsibility: 'Defines quality priorities. Security vs UX vs uptime. Sets the "why" before capability.',
    color: 'slate',
  },
  {
    name: 'Governor',
    icon: Shield,
    role: 'Law & Enforcement',
    responsibility: 'Validates authorization. Enforces scope. Controls rate limits. Has VETO POWER over all other agents.',
    color: 'red',
    highlight: true,
  },
  {
    name: 'Planner',
    icon: Map,
    role: 'Strategy',
    responsibility: 'Converts "test this" into structured plan. Selects families, plugins, and execution order.',
    color: 'purple',
  },
  {
    name: 'Builder',
    icon: Hammer,
    role: 'Engineering',
    responsibility: 'Generates test code. Creates fix PRs. Implements approved changes only.',
    color: 'blue',
  },
  {
    name: 'Operator',
    icon: Play,
    role: 'Execution',
    responsibility: 'Runs plugins in Docker sandboxes. Manages containers, captures output.',
    color: 'green',
  },
  {
    name: 'Scholar',
    icon: BookOpen,
    role: 'Memory',
    responsibility: 'Stores finding history. Tracks suppressions. Detects recurring patterns. Your compounding advantage.',
    color: 'amber',
  },
  {
    name: 'Scientist',
    icon: FlaskConical,
    role: 'Discovery',
    responsibility: 'Experiments with heuristics in sandbox. Tests new detection patterns safely.',
    color: 'cyan',
  },
  {
    name: 'Economist',
    icon: DollarSign,
    role: 'Resources',
    responsibility: 'Allocates budget. Calculates ROI per plugin. Stops when confidence threshold reached.',
    color: 'emerald',
  },
  {
    name: 'Diplomat',
    icon: MessageSquare,
    role: 'Communication',
    responsibility: 'Generates reports. Creates tickets. Translates jargon to business impact.',
    color: 'pink',
  },
  {
    name: 'Sentinel',
    icon: Eye,
    role: 'Monitoring',
    responsibility: 'Watches for overload. Tracks flakiness. Halts on scope violations. Emergency stop.',
    color: 'orange',
  },
];

const safetyRules = [
  {
    icon: Lock,
    title: 'Authorization Required',
    description: 'Every scan requires proof of authorization. Owner contact, written permission, time window.',
    enforcement: 'Governor validates before any plugin runs',
  },
  {
    icon: Target,
    title: 'Scope Allowlist',
    description: 'Only test what\'s explicitly allowed. No accidental third-party scanning.',
    enforcement: 'ScopeEnforcer blocks out-of-scope requests',
  },
  {
    icon: Gauge,
    title: 'Rate Limits',
    description: 'Default: 2 req/s, 3 concurrent, 2000 max. Auto-throttle on 429 responses.',
    enforcement: 'RateLimiter with token bucket algorithm',
  },
  {
    icon: AlertOctagon,
    title: 'Attack Mode Gating',
    description: 'Active security testing (fuzzing, injection) requires 3-step approval process.',
    enforcement: 'AttackModeGate with audit trail',
    highlight: true,
  },
];

const confidenceFactors = [
  { name: 'Deterministic Reproduction', impact: '+15%', description: 'Finding reproduced 3/3 times identically' },
  { name: 'Evidence Quality', impact: '+10%', description: 'Screenshot + HAR + reproduction steps attached' },
  { name: 'Historical Pattern', impact: '+5%', description: 'Seen in 5 previous runs on this target' },
  { name: 'Flaky History', impact: '-30%', description: 'Failed to reproduce in 2/5 runs' },
];

const colorMap: Record<string, string> = {
  blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
  purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
  amber: 'from-amber-500/20 to-amber-600/20 border-amber-500/30',
  emerald: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
  green: 'from-green-500/20 to-green-600/20 border-green-500/30',
  slate: 'bg-slate-700/50',
  red: 'bg-red-500/20',
  cyan: 'bg-cyan-500/20',
  pink: 'bg-pink-500/20',
  orange: 'bg-orange-500/20',
};

export default function HowItWorksPage() {
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
            <Badge variant="primary" className="mb-6">How It Works</Badge>
            <h1 className="heading-1 text-white mb-6">
              Multi-Pass Testing Strategy
            </h1>
            <p className="lead max-w-3xl mx-auto">
              TestUniverse doesn't just run tests. It thinks about what to test,
              validates findings, and learns from history.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Multi-Pass Timeline */}
      <Section dark>
        <div className="space-y-6">
          {passes.map((pass, index) => (
            <motion.div
              key={pass.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`card bg-gradient-to-r ${colorMap[pass.color]} border`}>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold text-white">
                      {pass.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{pass.name}</h3>
                      <p className="text-sm text-slate-400">{pass.duration}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-300">{pass.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pass.outputs.map((output) => (
                      <Badge key={output} variant="info">{output}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* The 10 Agents */}
      <Section
        id="agents"
        title="The 10 Agents"
        subtitle="Inspired by separation of powers. Each agent has one job, clear boundaries, and cannot exceed its authority."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card
                hover
                className={`h-full ${agent.highlight ? 'ring-2 ring-red-500/50' : ''}`}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${colorMap[agent.color]} flex items-center justify-center mb-3`}>
                    <agent.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <Badge variant={agent.highlight ? 'error' : 'primary'} className="mt-2">
                    {agent.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">{agent.responsibility}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Plugin System */}
      <Section
        dark
        title="Plugin System"
        subtitle="We don't reinvent tools. We wrap the best ones and normalize their output."
      >
        <div className="grid md:grid-cols-4 gap-6 text-center mb-12">
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

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'Playwright', purpose: 'E2E functional tests, video recording, trace capture', artifacts: ['trace.zip', 'screenshot.png', 'video.webm'] },
            { name: 'Lighthouse', purpose: 'Core Web Vitals, SEO, accessibility, best practices', artifacts: ['report.html', 'report.json'] },
            { name: 'OWASP ZAP', purpose: 'DAST security scanning, OWASP Top 10', artifacts: ['alerts.json', 'report.html', 'har.har'] },
            { name: 'axe-core', purpose: 'WCAG accessibility violations with selectors', artifacts: ['violations.json'] },
          ].map((plugin, index) => (
            <motion.div
              key={plugin.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{plugin.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400 mb-4">{plugin.purpose}</p>
                  <div className="flex flex-wrap gap-1">
                    {plugin.artifacts.map((artifact) => (
                      <Badge key={artifact} variant="info" className="text-xs">
                        {artifact}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Confidence Scoring */}
      <Section
        title="Confidence Scoring"
        subtitle="Not all findings are equal. We score confidence based on reproducibility, evidence quality, and historical patterns."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {confidenceFactors.map((factor, index) => (
            <motion.div
              key={factor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{factor.name}</CardTitle>
                    <Badge variant={factor.impact.startsWith('+') ? 'accent' : 'error'}>
                      {factor.impact}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">{factor.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Safety Boundaries */}
      <Section
        id="attack-mode"
        dark
        title="Safety Boundaries"
        subtitle="We take safety seriously. These aren't suggestions—they're enforced."
      >
        <div className="grid md:grid-cols-2 gap-6">
          {safetyRules.map((rule, index) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                hover
                className={`h-full ${rule.highlight ? 'ring-2 ring-red-500/50' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg ${rule.highlight ? 'bg-red-500/20' : 'bg-primary-500/20'} flex items-center justify-center`}>
                      <rule.icon className={`w-6 h-6 ${rule.highlight ? 'text-red-400' : 'text-primary-400'}`} />
                    </div>
                    <div>
                      <CardTitle>{rule.title}</CardTitle>
                      <CardDescription>{rule.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500">
                    <strong className="text-slate-400">Enforcement:</strong> {rule.enforcement}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Attack Mode Requirements */}
        <motion.div
          className="mt-12 card bg-red-500/10 border border-red-500/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Attack Mode Requires:</h3>
          <ol className="space-y-3 mb-4">
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">1</span>
              <span className="text-slate-300">policy.attack_mode_enabled = true in configuration</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">2</span>
              <span className="text-slate-300">Valid GovernorApproval token (not expired)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">3</span>
              <span className="text-slate-300">Explicit AttackScope with allowed hosts (no wildcards)</span>
            </li>
          </ol>
          <p className="text-sm text-slate-500">
            All attack mode requests are logged immutably. Audit trail available for compliance.
          </p>
        </motion.div>
      </Section>
    </div>
  );
}
