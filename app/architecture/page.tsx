'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Terminal } from '@/components/ui/Terminal';

const exitCodes = [
  { code: 0, name: 'PASS', description: 'Quality gate passed', color: 'accent' },
  { code: 1, name: 'GATE_FAIL', description: 'Findings exceeded threshold', color: 'error' },
  { code: 2, name: 'AUTH_BLOCKED', description: 'Authorization denied', color: 'error' },
  { code: 3, name: 'INTERNAL_ERROR', description: 'Unexpected error', color: 'error' },
  { code: 4, name: 'TIMEOUT', description: 'Timebox exceeded', color: 'warning' },
  { code: 5, name: 'TARGET_UNREACHABLE', description: 'Cannot connect', color: 'error' },
];

const constitutionRules = [
  {
    number: 1,
    title: 'Purpose > Intelligence',
    description: 'Clear quality goals before capability. Know WHY you\'re testing before HOW.',
  },
  {
    number: 2,
    title: 'Governance > Autonomy',
    description: 'Authorization and scope enforcement always. Governor has absolute veto power.',
  },
  {
    number: 3,
    title: 'Boundaries > Capability',
    description: 'Rate limits and safety constraints enforced. Can\'t bypass. Can\'t disable.',
  },
  {
    number: 4,
    title: 'Memory > Speed',
    description: 'Audit trails and evidence required. Every action logged immutably.',
  },
  {
    number: 5,
    title: 'Structure > Cleverness',
    description: 'Plugin architecture over ad-hoc testing. Reproducible, not magical.',
  },
];

const findingSchema = `{
  "schema_version": "1.0.0",
  "finding_id": "find_abc123",
  "run_id": "run_xyz789",
  "target_id": "my-webapp",
  "title": "Missing HttpOnly flag on session cookie",
  "family": "security",
  "category": "cookie-security",
  "severity": "high",
  "confidence": 0.92,
  "tool": {
    "plugin_id": "zap-baseline",
    "tool_name": "OWASP ZAP",
    "rule_id": "10010"
  },
  "location": {
    "url": "https://example.com/login",
    "method": "POST",
    "parameter": "Set-Cookie"
  },
  "evidence": [{
    "type": "har",
    "artifact_ref": "artifacts/network.har",
    "description": "HTTP response showing cookie without HttpOnly"
  }],
  "fix": {
    "summary": "Add HttpOnly flag to session cookie",
    "guidance": "Configure session middleware to set HttpOnly=true",
    "references": ["https://owasp.org/..."]
  }
}`;

const pipelinePhases = [
  { name: 'INIT', description: 'Load configs, validate inputs' },
  { name: 'RECON', description: 'Fingerprint target' },
  { name: 'SELECT', description: 'Choose plugins based on fingerprint' },
  { name: 'CONFIGURE', description: 'Generate execution specs' },
  { name: 'EXECUTE', description: 'Run plugins (parallel where possible)' },
  { name: 'NORMALIZE', description: 'Convert outputs to Finding schema' },
  { name: 'DEDUPE', description: 'Remove duplicates' },
  { name: 'SCORE', description: 'Calculate severity and confidence' },
  { name: 'REPORT', description: 'Generate outputs' },
];

export default function ArchitecturePage() {
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
            <Badge variant="primary" className="mb-6">Architecture</Badge>
            <h1 className="heading-1 text-white mb-6">
              System Architecture
            </h1>
            <p className="lead max-w-3xl mx-auto">
              Built for extensibility, safety, and scale.
              Every component has clear boundaries and responsibilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <Section dark title="High-Level Architecture">
        <div className="card max-w-4xl mx-auto">
          <pre className="text-sm text-slate-300 overflow-x-auto">
{`┌─────────────────────────────────────────────────────────────┐
│                      INPUT LAYER                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Target    │  │   Policy    │  │    Plan     │          │
│  │   Config    │  │   Config    │  │   Config    │          │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
└─────────┼────────────────┼────────────────┼─────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                    GOVERNANCE LAYER                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  GOVERNOR AGENT                      │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │    │
│  │  │  Auth    │ │  Scope   │ │   Rate   │            │    │
│  │  │ Validate │ │ Enforce  │ │  Limit   │            │    │
│  │  └──────────┘ └──────────┘ └──────────┘            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    PLANNING LAYER                            │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐    │
│  │    Planner    │  │  Fingerprint  │  │    Budget     │    │
│  │     Agent     │  │   Analyzer    │  │   Scheduler   │    │
│  └───────────────┘  └───────────────┘  └───────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   EXECUTION LAYER                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 EXECUTION ENGINE                       │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  │  │
│  │  │  Task   │  │  Worker │  │  Docker │  │ Artifact│  │  │
│  │  │  Queue  │  │   Pool  │  │ Sandbox │  │ Collect │  │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    PLUGIN LAYER                              │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│  │ Recon  │ │Lighthse│ │  Axe   │ │  ZAP   │ │   k6   │    │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘    │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│  │Security│ │  API   │ │ Mobile │ │Desktop │ │ Infra  │    │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    TRIAGE LAYER                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Dedupe  │  │ Severity │  │Confidence│  │  Flake   │    │
│  │  Engine  │  │  Scorer  │  │ Adjuster │  │ Classify │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    OUTPUT LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Report    │  │   Evidence   │  │ Notifications│      │
│  │  Generator   │  │    Bundle    │  │    Sender    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘`}
          </pre>
        </div>
      </Section>

      {/* Execution Pipeline */}
      <Section title="Execution Pipeline (DAG)" subtitle="Tests execute as a directed acyclic graph. Dependencies respected. Parallelism maximized.">
        <div className="flex flex-wrap justify-center gap-2">
          {pipelinePhases.map((phase, index) => (
            <motion.div
              key={phase.name}
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="card py-3 px-4">
                <div className="text-primary-400 font-mono text-sm mb-1">{phase.name}</div>
                <div className="text-xs text-slate-400">{phase.description}</div>
              </div>
              {index < pipelinePhases.length - 1 && (
                <div className="text-slate-600 mx-2">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Universal Finding Schema */}
      <Section
        id="finding-schema"
        dark
        title="Universal Finding Schema"
        subtitle="Every plugin outputs the same schema. Compare ZAP to Lighthouse to Axe. Finally, apples to apples."
      >
        <div className="max-w-3xl mx-auto">
          <Terminal title="finding.json" animate={false}>
            {findingSchema}
          </Terminal>
        </div>
      </Section>

      {/* Exit Codes */}
      <Section title="CI/CD Exit Codes" subtitle="Deterministic exit codes for pipeline integration.">
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {exitCodes.map((ec, index) => (
            <motion.div
              key={ec.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full">
                <CardContent className="pt-6">
                  <div className={`text-3xl font-mono font-bold mb-2 ${
                    ec.color === 'accent' ? 'text-accent-400' :
                    ec.color === 'warning' ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                    {ec.code}
                  </div>
                  <div className="text-sm font-medium text-white mb-1">{ec.name}</div>
                  <div className="text-xs text-slate-400">{ec.description}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Constitution */}
      <Section
        id="constitution"
        dark
        title="The Constitution"
        subtitle="5 immutable rules that cannot be bypassed, modified, or overridden. These are not configurable. They are enforced."
      >
        <div className="max-w-4xl mx-auto space-y-4">
          {constitutionRules.map((rule, index) => (
            <motion.div
              key={rule.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-primary-500/30">
                <CardContent className="py-6">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-2xl font-bold text-primary-400 shrink-0">
                      {rule.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{rule.title}</h3>
                      <p className="text-slate-400">{rule.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
