'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, AlertTriangle, Scale, Shield, Ban, RefreshCw } from 'lucide-react';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using TestUniverse, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.`,
  },
  {
    title: '2. Use License',
    content: `TestUniverse is licensed under the MIT License. Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.`,
  },
  {
    title: '3. Authorized Use Only',
    content: `You may only use TestUniverse to test systems and applications for which you have explicit authorization. Unauthorized testing of systems you do not own or have permission to test is strictly prohibited and may violate applicable laws including the Computer Fraud and Abuse Act (CFAA) and similar legislation.`,
  },
  {
    title: '4. User Responsibilities',
    content: `You are responsible for:
• Obtaining proper authorization before testing any system
• Ensuring your use complies with all applicable laws and regulations
• Protecting any credentials or sensitive data used with the service
• Not using the service for any illegal or harmful purposes
• Following the governance rules defined in the Constitutional framework`,
  },
  {
    title: '5. Prohibited Uses',
    content: `You may not use TestUniverse to:
• Test systems without proper authorization
• Launch denial of service attacks
• Exploit vulnerabilities for malicious purposes
• Violate any applicable laws or regulations
• Harm, harass, or discriminate against others
• Distribute malware or malicious code
• Circumvent the Governor's safety controls`,
  },
  {
    title: '6. Disclaimer of Warranties',
    content: `THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY.`,
  },
  {
    title: '7. Limitation of Liability',
    content: `In no event shall TestUniverse, its developers, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.`,
  },
  {
    title: '8. Indemnification',
    content: `You agree to indemnify, defend, and hold harmless TestUniverse and its developers, contributors, and affiliates from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of the service or your violation of these Terms.`,
  },
  {
    title: '9. Changes to Terms',
    content: `We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.`,
  },
  {
    title: '10. Governing Law',
    content: `These Terms shall be governed and construed in accordance with applicable laws, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`,
  },
];

const keyPoints = [
  {
    icon: Shield,
    title: 'Authorization Required',
    description: 'Only test systems you have explicit permission to test',
  },
  {
    icon: Ban,
    title: 'No Malicious Use',
    description: 'Never use for attacks, exploitation, or illegal activities',
  },
  {
    icon: Scale,
    title: 'MIT Licensed',
    description: 'Free to use, modify, and distribute under MIT License',
  },
  {
    icon: AlertTriangle,
    title: 'No Warranty',
    description: 'Software provided as-is without warranties',
  },
];

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="lead max-w-3xl mx-auto">
              Please read these terms carefully before using TestUniverse.
            </p>
            <p className="text-slate-500 mt-4">
              Last updated: January 11, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Points */}
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {keyPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
                    <point.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{point.title}</h3>
                  <p className="text-sm text-slate-400">{point.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Full Terms */}
      <Section dark title="Full Terms">
        <div className="max-w-3xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="py-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {section.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="py-8">
                <FileText className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">
                  Questions About These Terms?
                </h3>
                <p className="text-slate-400 mb-6">
                  If you have any questions about these Terms of Service,
                  please reach out to us.
                </p>
                <a
                  href="https://github.com/sreejagatab/AI-Civ-TestUniverse/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Contact Us
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
