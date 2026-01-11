'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, Eye, Database, Lock, Mail, Globe } from 'lucide-react';

const sections = [
  {
    title: 'Information We Collect',
    icon: Database,
    content: [
      {
        subtitle: 'Information You Provide',
        text: 'When you use TestUniverse, you may provide configuration files, target URLs, and authorization credentials. We process this information solely to execute your requested tests.',
      },
      {
        subtitle: 'Automatically Collected Information',
        text: 'We may collect usage metrics, error logs, and performance data to improve the service. This data is anonymized and aggregated.',
      },
      {
        subtitle: 'Test Results and Findings',
        text: 'Test results, findings, and evidence are stored temporarily during test execution. You control the retention and export of these results.',
      },
    ],
  },
  {
    title: 'How We Use Your Information',
    icon: Eye,
    content: [
      {
        subtitle: 'Service Delivery',
        text: 'We use the information you provide to execute tests, generate reports, and deliver results as requested.',
      },
      {
        subtitle: 'Service Improvement',
        text: 'Anonymized usage data helps us improve performance, fix bugs, and develop new features.',
      },
      {
        subtitle: 'Communication',
        text: 'We may use your contact information to send important service updates or respond to your inquiries.',
      },
    ],
  },
  {
    title: 'Data Security',
    icon: Lock,
    content: [
      {
        subtitle: 'Encryption',
        text: 'All data in transit is encrypted using TLS 1.3. Sensitive data at rest is encrypted using AES-256.',
      },
      {
        subtitle: 'Access Controls',
        text: 'We implement strict access controls and authentication to protect your data from unauthorized access.',
      },
      {
        subtitle: 'Security Practices',
        text: 'We follow industry best practices for security, including regular audits, penetration testing, and vulnerability assessments.',
      },
    ],
  },
  {
    title: 'Data Retention',
    icon: Database,
    content: [
      {
        subtitle: 'Test Results',
        text: 'Test results are retained for 30 days by default. You can configure shorter retention periods or export and delete data at any time.',
      },
      {
        subtitle: 'Account Data',
        text: 'Account information is retained as long as your account is active. You can request deletion at any time.',
      },
      {
        subtitle: 'Logs',
        text: 'System logs are retained for 90 days for troubleshooting and security purposes.',
      },
    ],
  },
  {
    title: 'Your Rights',
    icon: Shield,
    content: [
      {
        subtitle: 'Access',
        text: 'You have the right to access the personal data we hold about you.',
      },
      {
        subtitle: 'Correction',
        text: 'You can request correction of any inaccurate personal data.',
      },
      {
        subtitle: 'Deletion',
        text: 'You can request deletion of your personal data, subject to legal retention requirements.',
      },
      {
        subtitle: 'Export',
        text: 'You can export your data in standard formats at any time.',
      },
    ],
  },
];

export default function PrivacyPage() {
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
            <Badge variant="primary" className="mb-6">Legal</Badge>
            <h1 className="heading-1 text-white mb-6">
              Privacy Policy
            </h1>
            <p className="lead max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect,
              use, and protect your information.
            </p>
            <p className="text-slate-500 mt-4">
              Last updated: January 11, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="py-8">
              <p className="text-slate-300 leading-relaxed">
                TestUniverse (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
                This Privacy Policy describes how we collect, use, and share information when you use
                our AI-powered testing framework and related services.
              </p>
              <p className="text-slate-300 leading-relaxed mt-4">
                By using TestUniverse, you agree to the collection and use of information in accordance
                with this policy. If you do not agree with our policies, please do not use our services.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Policy Sections */}
      {sections.map((section, index) => (
        <Section
          key={section.title}
          dark={index % 2 === 1}
          title={section.title}
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                <section.icon className="w-5 h-5 text-primary-400" />
              </div>
            </div>
            <div className="space-y-6">
              {section.content.map((item) => (
                <Card key={item.subtitle}>
                  <CardContent className="py-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {item.subtitle}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      ))}

      {/* Contact */}
      <Section title="Contact Us">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="py-8">
                <Mail className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">
                  Questions About Privacy?
                </h3>
                <p className="text-slate-400 mb-6">
                  If you have any questions about this Privacy Policy or our data practices,
                  please contact us.
                </p>
                <a
                  href="https://github.com/sreejagatab/AI-Civ-TestUniverse/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Contact Us on GitHub
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
