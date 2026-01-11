'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Scale, Check, X, Github } from 'lucide-react';

const permissions = [
  'Commercial use',
  'Modification',
  'Distribution',
  'Private use',
];

const conditions = [
  'License and copyright notice',
];

const limitations = [
  'Liability',
  'Warranty',
];

const mitLicense = `MIT License

Copyright (c) 2026 AI-Civ-TestUniverse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export default function LicensePage() {
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
              MIT License
            </h1>
            <p className="lead max-w-3xl mx-auto">
              TestUniverse is open source software licensed under the MIT License,
              one of the most permissive licenses available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* License Summary */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Permissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-accent-500" />
                  </div>
                  <h3 className="font-semibold text-white">Permissions</h3>
                </div>
                <ul className="space-y-2">
                  {permissions.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-accent-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <Scale className="w-4 h-4 text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-white">Conditions</h3>
                </div>
                <ul className="space-y-2">
                  {conditions.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                      <Scale className="w-4 h-4 text-primary-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Limitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="w-4 h-4 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white">Limitations</h3>
                </div>
                <ul className="space-y-2">
                  {limitations.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                      <X className="w-4 h-4 text-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Full License Text */}
      <Section dark title="Full License Text">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="py-6">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
                {mitLicense}
              </pre>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* What This Means */}
      <Section title="What This Means">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="py-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    You Can Use It Anywhere
                  </h3>
                  <p className="text-slate-400">
                    Use TestUniverse in personal projects, commercial applications,
                    enterprise software, or anywhere else. There are no restrictions
                    on how you use the software.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="py-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    You Can Modify It
                  </h3>
                  <p className="text-slate-400">
                    Fork the repository, make changes, customize it for your needs.
                    You can create derivative works and distribute them under your
                    own terms (as long as you include the original license).
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="py-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Just Include the License
                  </h3>
                  <p className="text-slate-400">
                    The only requirement is that you include the original copyright
                    and license notice in any copy of the software or substantial
                    portions of it.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
            <h2 className="heading-2 text-white mb-6">View on GitHub</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              The full license file is available in our GitHub repository.
            </p>
            <a
              href="https://github.com/sreejagatab/AI-Civ-TestUniverse/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Github className="w-5 h-5 mr-2" />
              View LICENSE File
            </a>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
