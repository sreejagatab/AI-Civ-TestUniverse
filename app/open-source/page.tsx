'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Terminal } from '@/components/ui/Terminal';
import {
  Github, GitBranch, Code, Users, FileCode, Bug, BookOpen, Zap,
  ArrowRight, Check
} from 'lucide-react';

const repos = [
  {
    name: 'AI-Civ-TestUniverse',
    description: 'Main repository: kernel, plugins, CLI, API, documentation',
    url: 'https://github.com/sreejagatab/AI-Civ-TestUniverse',
    language: 'Python',
    topics: ['testing', 'ai', 'security', 'automation'],
  },
];

const contributionAreas = [
  {
    title: 'New Plugins',
    description: 'Add adapters for new testing tools',
    difficulty: 'Medium',
    icon: Zap,
  },
  {
    title: 'Bug Fixes',
    description: 'Help squash bugs and improve stability',
    difficulty: 'Easy',
    icon: Bug,
  },
  {
    title: 'Documentation',
    description: 'Improve docs, add examples, fix typos',
    difficulty: 'Easy',
    icon: BookOpen,
  },
  {
    title: 'Core Features',
    description: 'Work on kernel, agents, or engine',
    difficulty: 'Hard',
    icon: Code,
  },
];

const setupSteps = `# 1. Fork & Clone
git clone https://github.com/YOUR-USERNAME/AI-Civ-TestUniverse.git
cd AI-Civ-TestUniverse

# 2. Set Up Development Environment
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -e ".[dev]"

# 3. Run Tests
pytest
pytest --cov  # With coverage

# 4. Create a Branch
git checkout -b feature/your-feature

# 5. Make Changes and Submit PR`;

const directoryStructure = `AI-Civ-TestUniverse/
├── kernel/                 # Core framework
│   ├── models/            # Data models (Target, Policy, Plan, Finding)
│   ├── plugin_sdk/        # Plugin interface & validators
│   ├── registry/          # Plugin discovery & packs
│   ├── engine/            # DAG execution engine
│   ├── evidence/          # Artifact storage
│   ├── triage/            # Dedupe, scoring, flake control
│   ├── reports/           # Report generation
│   ├── cli/               # Command-line interface
│   ├── integrations/      # CI/CD (GitHub, GitLab)
│   └── agents/            # Governor, Planner, Sentinel, etc.
├── plugins/               # Built-in plugins (14+)
│   ├── recon/            # Reconnaissance
│   ├── lighthouse/       # Performance & SEO
│   ├── axe/              # Accessibility
│   ├── zap/              # Security (DAST)
│   ├── security/         # Headers, secrets, deps
│   ├── api/              # Newman, OpenAPI, GraphQL
│   ├── k6/               # Load testing
│   ├── mobile/           # Appium, Device Farm
│   ├── desktop/          # Desktop automation
│   ├── cli/              # CLI testing
│   ├── infra/            # Trivy, Checkov, kube-bench
│   └── observability/    # Synthetic, SLO, Chaos
├── packs/                # MVP packs
├── schemas/              # JSON schemas
├── tests/                # Test suite
├── docs/                 # Documentation
└── examples/             # CI/CD examples`;

export default function OpenSourcePage() {
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
            <Badge variant="primary" className="mb-6">Open Source</Badge>
            <h1 className="heading-1 text-white mb-6">
              Built in the Open
            </h1>
            <p className="lead max-w-3xl mx-auto">
              TestUniverse is open source under MIT license.
              Contribute, extend, and build with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Repository */}
      <Section title="Repository">
        <div className="max-w-2xl mx-auto">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Github className="w-8 h-8 text-white" />
                    <div>
                      <CardTitle className="group-hover:text-primary-400 transition-colors">
                        {repo.name}
                      </CardTitle>
                      <CardDescription>{repo.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="info">{repo.language}</Badge>
                    {repo.topics.map((topic) => (
                      <Badge key={topic} variant="primary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Repository Structure */}
      <Section dark title="Repository Structure">
        <div className="max-w-3xl mx-auto">
          <Terminal title="Directory Structure" animate={false}>
            {directoryStructure}
          </Terminal>
        </div>
      </Section>

      {/* Contributing */}
      <Section title="Contributing" subtitle="Get started in 5 steps">
        <div className="max-w-3xl mx-auto">
          <Terminal title="bash" animate={false}>
            {setupSteps}
          </Terminal>
        </div>
      </Section>

      {/* Contribution Areas */}
      <Section
        dark
        title="Ways to Contribute"
        subtitle="Pick an area that matches your interests"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contributionAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center mb-4">
                    <area.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <CardTitle className="text-lg">{area.title}</CardTitle>
                  <Badge
                    variant={
                      area.difficulty === 'Easy' ? 'accent' :
                      area.difficulty === 'Medium' ? 'warning' :
                      'error'
                    }
                    className="mt-2"
                  >
                    {area.difficulty}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">{area.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* License */}
      <Section title="License">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold text-white mb-4">MIT License</h3>
                <p className="text-slate-400 mb-6">
                  You are free to use, modify, and distribute TestUniverse
                  for any purpose, commercial or personal.
                </p>
                <ul className="space-y-2 text-left max-w-xs mx-auto">
                  {['Use commercially', 'Modify', 'Distribute', 'Use privately'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-accent-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://github.com/sreejagatab/AI-Civ-TestUniverse/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline mt-6"
                >
                  View Full License
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
