'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Check, X, Github, Zap, Building, Shield, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Open Source',
    price: 'Free',
    description: 'Everything you need for individual developers and small teams.',
    features: [
      { text: 'All 14+ testing plugins', included: true },
      { text: '10 AI agents', included: true },
      { text: 'Universal Finding Schema', included: true },
      { text: 'CLI & Local execution', included: true },
      { text: 'HTML, JSON, SARIF reports', included: true },
      { text: 'GitHub Actions integration', included: true },
      { text: 'Community support', included: true },
      { text: 'Self-hosted only', included: true },
      { text: 'Cloud dashboard', included: false },
      { text: 'Team collaboration', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Started Free',
    ctaLink: '/docs/quickstart',
    variant: 'outline',
    popular: false,
  },
  {
    name: 'Team',
    price: '$49',
    period: '/month per seat',
    description: 'For teams that need collaboration and centralized management.',
    features: [
      { text: 'Everything in Open Source', included: true },
      { text: 'Cloud dashboard', included: true },
      { text: 'Team collaboration', included: true },
      { text: 'Centralized findings database', included: true },
      { text: 'Trend analysis & baselines', included: true },
      { text: 'Slack/Teams notifications', included: true },
      { text: 'Jira integration', included: true },
      { text: 'Email support (24h SLA)', included: true },
      { text: 'SSO (SAML/OIDC)', included: false },
      { text: 'Custom plugins', included: false },
      { text: 'Dedicated support', included: false },
    ],
    cta: 'Start 14-Day Trial',
    ctaLink: '/contact?plan=team',
    variant: 'primary',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organizations requiring compliance, scale, and dedicated support.',
    features: [
      { text: 'Everything in Team', included: true },
      { text: 'SSO (SAML/OIDC)', included: true },
      { text: 'Custom plugins development', included: true },
      { text: 'On-premise deployment', included: true },
      { text: 'Air-gapped environments', included: true },
      { text: 'Compliance reports (SOC2, ISO)', included: true },
      { text: 'Advanced audit logging', included: true },
      { text: 'Dedicated success manager', included: true },
      { text: 'SLA guarantee (99.9%)', included: true },
      { text: 'Custom training', included: true },
      { text: '24/7 priority support', included: true },
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact?plan=enterprise',
    variant: 'outline',
    popular: false,
  },
];

const faqs = [
  {
    question: 'Is TestUniverse really free?',
    answer: 'Yes! The core framework is 100% open source under MIT license. You can use it for any project, commercial or personal, without paying anything. The paid plans add cloud features, collaboration, and support.',
  },
  {
    question: 'What\'s included in the open source version?',
    answer: 'Everything: all 14+ plugins (Lighthouse, ZAP, Axe, k6, etc.), all 10 AI agents, full CLI, CI/CD integrations, all report formats. You self-host it and run it locally or in your own infrastructure.',
  },
  {
    question: 'Can I use it in production?',
    answer: 'Absolutely. The open source version is production-ready. Many teams run it in their CI/CD pipelines. The paid plans just add convenience features like cloud dashboard and team collaboration.',
  },
  {
    question: 'What\'s the difference between Team and Enterprise?',
    answer: 'Team is our cloud-hosted solution with collaboration features. Enterprise adds SSO, on-premise deployment, compliance features, custom plugins, and dedicated support.',
  },
  {
    question: 'Do you offer discounts for startups or non-profits?',
    answer: 'Yes! We offer 50% off for startups (< 2 years old, < $5M funding) and 75% off for registered non-profits. Contact us for details.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Yes, you can upgrade or downgrade at any time. If you upgrade mid-cycle, we prorate the difference. If you downgrade, the change takes effect at your next billing cycle.',
  },
];

const comparison = [
  { feature: 'Testing Plugins', opensource: '14+', team: '14+', enterprise: '14+ Custom' },
  { feature: 'AI Agents', opensource: '10', team: '10', enterprise: '10' },
  { feature: 'Report Formats', opensource: 'All', team: 'All', enterprise: 'All + Custom' },
  { feature: 'CI/CD Integration', opensource: 'Yes', team: 'Yes', enterprise: 'Yes' },
  { feature: 'Cloud Dashboard', opensource: '-', team: 'Yes', enterprise: 'Yes' },
  { feature: 'Team Seats', opensource: '-', team: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Finding History', opensource: 'Local', team: '1 Year', enterprise: 'Unlimited' },
  { feature: 'Support', opensource: 'Community', team: 'Email (24h)', enterprise: '24/7 Priority' },
  { feature: 'SSO', opensource: '-', team: '-', enterprise: 'Yes' },
  { feature: 'On-Premise', opensource: 'Self-host', team: '-', enterprise: 'Yes' },
];

export default function PricingPage() {
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
            <Badge variant="primary" className="mb-6">Pricing</Badge>
            <h1 className="heading-1 text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="lead max-w-3xl mx-auto">
              Start free with our open source framework. Upgrade when you need
              cloud features, team collaboration, or enterprise support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <Section>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="accent" className="px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card
                className={`h-full flex flex-col ${
                  plan.popular
                    ? 'ring-2 ring-accent-500 border-accent-500/50'
                    : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    {plan.name === 'Open Source' && <Github className="w-6 h-6 text-slate-400" />}
                    {plan.name === 'Team' && <Zap className="w-6 h-6 text-accent-400" />}
                    {plan.name === 'Enterprise' && <Building className="w-6 h-6 text-primary-400" />}
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-slate-400 ml-1">{plan.period}</span>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-slate-300' : 'text-slate-500'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      href={plan.ctaLink}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-200 ${
                        plan.variant === 'primary'
                          ? 'bg-accent-500 text-white hover:bg-accent-600 shadow-lg shadow-accent-500/25'
                          : 'border border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500'
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Comparison Table */}
      <Section dark title="Feature Comparison" subtitle="See exactly what's included in each plan.">
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Feature</th>
                <th className="text-center py-4 px-4 text-slate-400 font-medium">Open Source</th>
                <th className="text-center py-4 px-4 text-accent-400 font-medium">Team</th>
                <th className="text-center py-4 px-4 text-primary-400 font-medium">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, index) => (
                <motion.tr
                  key={row.feature}
                  className="border-b border-slate-800"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <td className="py-4 px-4 text-slate-300">{row.feature}</td>
                  <td className="text-center py-4 px-4 text-slate-400">{row.opensource}</td>
                  <td className="text-center py-4 px-4 text-slate-300">{row.team}</td>
                  <td className="text-center py-4 px-4 text-slate-300">{row.enterprise}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* FAQ */}
      <Section title="Frequently Asked Questions">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{faq.answer}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
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
              Ready to get started?
            </h2>
            <p className="lead max-w-2xl mx-auto mb-10">
              Join thousands of developers who test with confidence.
              Start free, upgrade when you're ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs/quickstart" className="btn-primary text-lg px-8 py-3">
                Start Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-outline text-lg px-8 py-3">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
