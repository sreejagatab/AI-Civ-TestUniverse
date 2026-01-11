'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Terminal } from '@/components/ui/Terminal';
import {
  GitBranch, Code, Bug, BookOpen, Zap, TestTube,
  CheckCircle, AlertCircle, FileCode, Github
} from 'lucide-react';

const contributionTypes = [
  {
    title: 'Bug Reports',
    description: 'Found a bug? Open an issue with steps to reproduce.',
    icon: Bug,
    difficulty: 'Easy',
    link: 'https://github.com/sreejagatab/AI-Civ-TestUniverse/issues/new?template=bug_report.md',
  },
  {
    title: 'Feature Requests',
    description: 'Have an idea? We\'d love to hear it.',
    icon: Zap,
    difficulty: 'Easy',
    link: 'https://github.com/sreejagatab/AI-Civ-TestUniverse/issues/new?template=feature_request.md',
  },
  {
    title: 'Documentation',
    description: 'Help improve our docs, fix typos, add examples.',
    icon: BookOpen,
    difficulty: 'Easy',
    link: 'https://github.com/sreejagatab/AI-Civ-TestUniverse/tree/main/docs',
  },
  {
    title: 'New Plugins',
    description: 'Add adapters for new testing tools.',
    icon: FileCode,
    difficulty: 'Medium',
    link: '/AI-Civ-TestUniverse/docs/plugins/writing-plugins',
  },
  {
    title: 'Core Features',
    description: 'Work on the kernel, agents, or engine.',
    icon: Code,
    difficulty: 'Hard',
    link: 'https://github.com/sreejagatab/AI-Civ-TestUniverse/issues?q=is%3Aopen+label%3A%22good+first+issue%22',
  },
  {
    title: 'Tests',
    description: 'Improve test coverage and reliability.',
    icon: TestTube,
    difficulty: 'Medium',
    link: 'https://github.com/sreejagatab/AI-Civ-TestUniverse/tree/main/tests',
  },
];

const setupCommands = `# 1. Fork the repository on GitHub
# Then clone your fork:
git clone https://github.com/YOUR-USERNAME/AI-Civ-TestUniverse.git
cd AI-Civ-TestUniverse

# 2. Add upstream remote
git remote add upstream https://github.com/sreejagatab/AI-Civ-TestUniverse.git

# 3. Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate

# 4. Install in development mode
pip install -e ".[dev]"

# 5. Run tests to verify setup
pytest`;

const workflowCommands = `# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes...

# Run tests
pytest

# Run linting
ruff check .
mypy .

# Commit with a descriptive message
git commit -m "feat: add support for new feature"

# Push to your fork
git push origin feature/your-feature-name

# Open a Pull Request on GitHub`;

const commitTypes = [
  { type: 'feat', description: 'New feature' },
  { type: 'fix', description: 'Bug fix' },
  { type: 'docs', description: 'Documentation changes' },
  { type: 'style', description: 'Code style (formatting, no logic change)' },
  { type: 'refactor', description: 'Code refactoring' },
  { type: 'test', description: 'Adding or updating tests' },
  { type: 'chore', description: 'Build process, dependencies, etc.' },
];

const prChecklist = [
  'Code follows the project style guidelines',
  'Tests pass locally (pytest)',
  'New code has appropriate test coverage',
  'Documentation is updated if needed',
  'Commit messages follow conventional commits',
  'PR description explains the changes',
];

export default function ContributingPage() {
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
            <Badge variant="primary" className="mb-6">Contributing</Badge>
            <h1 className="heading-1 text-white mb-6">
              Contribution Guide
            </h1>
            <p className="lead max-w-3xl mx-auto">
              Thank you for your interest in contributing to TestUniverse!
              This guide will help you get started.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ways to Contribute */}
      <Section title="Ways to Contribute" subtitle="Choose your path">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contributionTypes.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : undefined}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge
                    variant={
                      item.difficulty === 'Easy' ? 'accent' :
                      item.difficulty === 'Medium' ? 'warning' : 'error'
                    }
                    className="mt-2"
                  >
                    {item.difficulty}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Development Setup */}
      <Section dark title="Development Setup" subtitle="Get your environment ready">
        <div className="max-w-3xl mx-auto">
          <Terminal title="bash" animate={false}>
            {setupCommands}
          </Terminal>
        </div>
      </Section>

      {/* Workflow */}
      <Section title="Development Workflow" subtitle="From idea to pull request">
        <div className="max-w-3xl mx-auto">
          <Terminal title="bash" animate={false}>
            {workflowCommands}
          </Terminal>
        </div>
      </Section>

      {/* Commit Messages */}
      <Section dark title="Commit Messages" subtitle="We use conventional commits">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="py-6">
              <div className="space-y-3">
                {commitTypes.map((item) => (
                  <div key={item.type} className="flex items-center gap-4">
                    <code className="px-3 py-1 bg-slate-800 rounded text-primary-400 font-mono text-sm min-w-[100px]">
                      {item.type}:
                    </code>
                    <span className="text-slate-300">{item.description}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-400 mb-2">Example:</p>
                <code className="text-accent-400">feat: add support for GraphQL introspection testing</code>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* PR Checklist */}
      <Section title="Pull Request Checklist">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="py-6">
              <ul className="space-y-3">
                {prChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Code Style */}
      <Section dark title="Code Style">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Python</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>&#8226; Follow PEP 8 guidelines</li>
                  <li>&#8226; Use type hints</li>
                  <li>&#8226; Run <code className="text-primary-400">ruff</code> for linting</li>
                  <li>&#8226; Run <code className="text-primary-400">mypy</code> for type checking</li>
                  <li>&#8226; Max line length: 100 characters</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>&#8226; Use pytest for testing</li>
                  <li>&#8226; Aim for 80%+ coverage</li>
                  <li>&#8226; Test edge cases</li>
                  <li>&#8226; Use fixtures for setup</li>
                  <li>&#8226; Mock external dependencies</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Getting Help */}
      <Section title="Getting Help">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="py-8">
                <AlertCircle className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">
                  Need Help?
                </h3>
                <p className="text-slate-400 mb-6">
                  If you have questions or need help with your contribution,
                  don't hesitate to reach out!
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="https://github.com/sreejagatab/AI-Civ-TestUniverse/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Ask in Discussions
                  </a>
                  <a
                    href="https://github.com/sreejagatab/AI-Civ-TestUniverse/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    Open an Issue
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
