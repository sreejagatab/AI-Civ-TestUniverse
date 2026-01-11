'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Rocket, BookOpen, Shield, Plug, Terminal, Code, Settings,
  GitBranch, FileJson, Users, ArrowRight
} from 'lucide-react';

const docsSections = [
  {
    title: 'Getting Started',
    icon: Rocket,
    description: 'Installation, quickstart, and your first scan',
    links: [
      { name: 'Quickstart (5 min)', href: '/docs/quickstart' },
      { name: 'Installation', href: '/docs/installation' },
      { name: 'First Scan', href: '/docs/first-scan' },
      { name: 'Understanding Results', href: '/docs/understanding-results' },
    ],
  },
  {
    title: 'Core Concepts',
    icon: BookOpen,
    description: 'Targets, policies, plans, and findings explained',
    links: [
      { name: 'Targets', href: '/docs/concepts/targets' },
      { name: 'Policies', href: '/docs/concepts/policies' },
      { name: 'Plans', href: '/docs/concepts/plans' },
      { name: 'Findings', href: '/docs/concepts/findings' },
      { name: 'Evidence', href: '/docs/concepts/evidence' },
    ],
  },
  {
    title: 'Governance',
    icon: Shield,
    description: 'Authorization, scope control, and audit logs',
    links: [
      { name: 'Authorization', href: '/docs/governance/authorization' },
      { name: 'Scope Control', href: '/docs/governance/scope-control' },
      { name: 'Rate Limits', href: '/docs/governance/rate-limits' },
      { name: 'Attack Mode', href: '/docs/governance/attack-mode' },
      { name: 'Audit Logs', href: '/docs/governance/audit-logs' },
    ],
  },
  {
    title: 'Plugins',
    icon: Plug,
    description: 'Available plugins and how to use them',
    links: [
      { name: 'Overview', href: '/docs/plugins/overview' },
      { name: 'Lighthouse', href: '/docs/plugins/lighthouse' },
      { name: 'ZAP', href: '/docs/plugins/zap' },
      { name: 'Axe', href: '/docs/plugins/axe' },
      { name: 'k6', href: '/docs/plugins/k6' },
      { name: 'Writing Plugins', href: '/docs/plugins/writing-plugins' },
    ],
  },
  {
    title: 'CI/CD',
    icon: GitBranch,
    description: 'Integration with GitHub, GitLab, Jenkins, and more',
    links: [
      { name: 'GitHub Actions', href: '/docs/ci-cd/github-actions' },
      { name: 'GitLab CI', href: '/docs/ci-cd/gitlab-ci' },
      { name: 'Jenkins', href: '/docs/ci-cd/jenkins' },
      { name: 'Exit Codes', href: '/docs/ci-cd/exit-codes' },
      { name: 'Quality Gates', href: '/docs/ci-cd/quality-gates' },
    ],
  },
  {
    title: 'API Reference',
    icon: Code,
    description: 'CLI commands, REST API, and schemas',
    links: [
      { name: 'CLI Reference', href: '/docs/api/cli' },
      { name: 'REST API', href: '/docs/api/rest' },
      { name: 'Schemas', href: '/docs/api/schemas' },
    ],
  },
];

const roleGuides = [
  {
    role: 'Developer',
    description: 'Run scans locally, understand findings',
    links: ['/docs/quickstart', '/docs/concepts/findings', '/docs/ci-cd/exit-codes'],
    color: 'primary',
  },
  {
    role: 'Security Engineer',
    description: 'Configure security scans, review findings',
    links: ['/docs/plugins/zap', '/docs/governance/attack-mode', '/docs/governance/audit-logs'],
    color: 'red',
  },
  {
    role: 'DevOps Engineer',
    description: 'CI/CD integration, quality gates',
    links: ['/docs/ci-cd/github-actions', '/docs/ci-cd/quality-gates', '/docs/ci-cd/exit-codes'],
    color: 'amber',
  },
  {
    role: 'Plugin Author',
    description: 'Extend TestUniverse with new tools',
    links: ['/docs/plugins/writing-plugins', '/docs/api/schemas'],
    color: 'accent',
  },
];

export default function DocsPage() {
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
            <Badge variant="primary" className="mb-6">Documentation</Badge>
            <h1 className="heading-1 text-white mb-6">
              Learn TestUniverse
            </h1>
            <p className="lead max-w-3xl mx-auto">
              Everything you need to get started, from basic concepts to
              advanced configurations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docsSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center mb-4">
                    <section.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-1"
                        >
                          <ArrowRight className="w-3 h-3" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* By Role */}
      <Section
        dark
        title="Documentation by Role"
        subtitle="Find the docs most relevant to your work"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleGuides.map((guide, index) => (
            <motion.div
              key={guide.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    guide.color === 'primary' ? 'bg-primary-500/20' :
                    guide.color === 'red' ? 'bg-red-500/20' :
                    guide.color === 'amber' ? 'bg-amber-500/20' :
                    'bg-accent-500/20'
                  }`}>
                    <Users className={`w-6 h-6 ${
                      guide.color === 'primary' ? 'text-primary-400' :
                      guide.color === 'red' ? 'text-red-400' :
                      guide.color === 'amber' ? 'text-amber-400' :
                      'text-accent-400'
                    }`} />
                  </div>
                  <CardTitle className="text-lg">{guide.role}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {guide.links.map((href) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="text-sm text-slate-400 hover:text-primary-400 transition-colors"
                        >
                          {href.split('/').pop()?.replace(/-/g, ' ')}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Quickstart CTA */}
      <Section>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 text-white mb-6">
              Ready to dive in?
            </h2>
            <Link href="/docs/quickstart" className="btn-primary text-lg px-8 py-3">
              Start with Quickstart <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
