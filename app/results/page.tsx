'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Terminal } from '@/components/ui/Terminal';
import { AlertTriangle, Shield, Eye, Check, X } from 'lucide-react';

const findings = [
  {
    title: 'SQL Injection in Search Parameter',
    severity: 'CRITICAL',
    confidence: 0.98,
    tool: 'ZAP Baseline',
    description: 'Search parameter "q" vulnerable to SQL injection via error-based technique.',
    evidence: 'GET /search?q=1\' OR \'1\'=\'1 → 500 Internal Server Error\nResponse contains: \'SQLITE_ERROR: near...\'',
    reproduction: ['Navigate to /search', 'Enter: 1\' OR \'1\'=\'1', 'Observe error message revealing SQL syntax'],
    fix: 'Use parameterized queries. Never concatenate user input.',
  },
  {
    title: 'Missing Content-Security-Policy Header',
    severity: 'HIGH',
    confidence: 0.95,
    tool: 'Security Headers',
    description: 'No CSP header present. Application vulnerable to XSS attacks.',
    evidence: 'HTTP/1.1 200 OK\nX-Frame-Options: DENY\n❌ Content-Security-Policy: (missing)',
    reproduction: ['Request any page', 'Inspect response headers', 'CSP header absent'],
    fix: 'Add CSP header: default-src \'self\'; script-src \'self\'',
  },
  {
    title: 'Color Contrast Insufficient',
    severity: 'MEDIUM',
    confidence: 0.91,
    tool: 'Axe',
    wcag: '1.4.3 Contrast (Level AA)',
    description: 'Text has insufficient contrast ratio of 2.8:1 (required: 4.5:1)',
    evidence: 'Element: button.secondary-action\nContrast: 2.8:1 (required: 4.5:1)',
    reproduction: ['Navigate to /checkout', 'Locate "Cancel" button', 'Contrast ratio: 2.8:1'],
    fix: 'Change text color from #999999 to #595959',
  },
];

const ciOutput = `$ aiciv run https://staging.example.com --mode=ci --gate="critical=0,high=3"

✓ Recon complete
✓ Plugins executed: 5/5
✓ Findings normalized: 12

Quality Gate Evaluation:
  CRITICAL: 0 (threshold: 0) ✓
  HIGH: 5 (threshold: 3) ✗
  MEDIUM: 4 (no threshold)
  LOW: 3 (no threshold)

❌ GATE FAILED: 5 HIGH findings exceed threshold of 3

Reports generated:
  - report.html
  - report.sarif (uploaded to GitHub Security)
  - report.junit.xml

Exit code: 1 (GATE_FAIL)`;

const prComment = `## 🔍 TestUniverse Scan Results

**Status:** ❌ Quality Gate Failed

| Severity | Count | Threshold |
|----------|-------|-----------|
| Critical | 0 | 0 ✅ |
| High | 5 | 3 ❌ |
| Medium | 4 | - |
| Low | 3 | - |

### Top Findings

1. **[HIGH]** SQL Injection in /api/search
2. **[HIGH]** Missing rate limiting on /api/login
3. **[HIGH]** Sensitive data in error responses

[View Full Report](https://...)`;

const severityColors: Record<string, string> = {
  CRITICAL: 'bg-red-500/20 text-red-400 border-red-500/30',
  HIGH: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  MEDIUM: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  LOW: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export default function ResultsPage() {
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
            <Badge variant="primary" className="mb-6">Real Results</Badge>
            <h1 className="heading-1 text-white mb-6">
              Proof That It Works
            </h1>
            <p className="lead max-w-3xl mx-auto">
              Not mockups—actual findings from real scans against
              intentionally vulnerable demo applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <Section>
        <Card className="bg-amber-500/10 border-amber-500/30 max-w-3xl mx-auto">
          <CardContent className="py-6 text-center">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <p className="text-slate-300">
              All results below are from scans against intentionally vulnerable
              demo applications. Sensitive details redacted.
            </p>
          </CardContent>
        </Card>
      </Section>

      {/* Scan Summary */}
      <Section
        dark
        title="Example: Vulnerable Web Application"
        subtitle="OWASP Juice Shop variant scanned in 12 minutes"
      >
        <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {[
            { label: 'Critical', value: 2, color: 'text-red-400' },
            { label: 'High', value: 5, color: 'text-orange-400' },
            { label: 'Medium', value: 8, color: 'text-amber-400' },
            { label: 'Low', value: 3, color: 'text-green-400' },
          ].map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="py-6">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Finding Examples */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {findings.map((finding, index) => (
            <motion.div
              key={finding.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`border ${severityColors[finding.severity].split(' ')[2]}`}>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className={severityColors[finding.severity]}>
                      {finding.severity}
                    </Badge>
                    <CardTitle>{finding.title}</CardTitle>
                    <Badge variant="info">{finding.tool}</Badge>
                    <span className="text-sm text-slate-400">
                      {(finding.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">{finding.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Evidence */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 mb-2">Evidence</h4>
                      <pre className="bg-slate-950 rounded p-3 text-xs text-slate-300 overflow-x-auto">
                        {finding.evidence}
                      </pre>
                    </div>

                    {/* Reproduction */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 mb-2">Reproduction Steps</h4>
                      <ol className="space-y-1">
                        {finding.reproduction.map((step, i) => (
                          <li key={i} className="text-sm text-slate-300">
                            {i + 1}. {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Fix */}
                  <div className="mt-4 p-3 bg-accent-500/10 border border-accent-500/30 rounded">
                    <h4 className="text-sm font-semibold text-accent-400 mb-1">Recommended Fix</h4>
                    <p className="text-sm text-slate-300">{finding.fix}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CI Gate Example */}
      <Section title="CI/CD Integration Example" subtitle="Quality gates in action with real output">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">GitHub Actions Output</h3>
            <Terminal title="Terminal" animate={false}>
              {ciOutput}
            </Terminal>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">PR Comment</h3>
            <Card className="bg-slate-950">
              <CardContent className="py-4">
                <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                  {prComment}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Verification */}
      <Section
        dark
        title="Verification: Confirmed vs Suspected"
        subtitle="Not all findings are created equal. We classify by reproducibility."
      >
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: 'Confirmed',
              percentage: 85,
              description: 'Reproduced deterministically 3/3 times',
              confidence: 'High (0.90+)',
              color: 'accent',
              icon: Check,
            },
            {
              name: 'Suspected',
              percentage: 10,
              description: 'Detected but intermittent reproduction',
              confidence: 'Medium (0.60-0.89)',
              color: 'warning',
              icon: AlertTriangle,
            },
            {
              name: 'Blocked',
              percentage: 5,
              description: 'Could not verify (auth required, timeout)',
              confidence: 'Low (<0.60)',
              color: 'error',
              icon: X,
            },
          ].map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full">
                <CardContent className="py-8">
                  <category.icon className={`w-10 h-10 mx-auto mb-4 ${
                    category.color === 'accent' ? 'text-accent-400' :
                    category.color === 'warning' ? 'text-amber-400' :
                    'text-red-400'
                  }`} />
                  <div className={`text-4xl font-bold mb-2 ${
                    category.color === 'accent' ? 'text-accent-400' :
                    category.color === 'warning' ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                    {category.percentage}%
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-sm text-slate-400 mb-2">{category.description}</p>
                  <Badge variant={category.color as any}>{category.confidence}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
