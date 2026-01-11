'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Github, MessageCircle, Bug, BookOpen, Users, Heart,
  ExternalLink, Star, GitPullRequest, Code
} from 'lucide-react';

const communityLinks = [
  {
    title: 'GitHub Repository',
    description: 'Star us, fork the repo, and explore the source code',
    url: 'https://github.com/sreejagatab/AI-Civ-TestUniverse',
    icon: Github,
    action: 'View Repository',
    stats: 'Source Code',
  },
  {
    title: 'GitHub Issues',
    description: 'Report bugs, request features, and track progress',
    url: 'https://github.com/sreejagatab/AI-Civ-TestUniverse/issues',
    icon: Bug,
    action: 'Browse Issues',
    stats: 'Bug Reports',
  },
  {
    title: 'GitHub Discussions',
    description: 'Ask questions, share ideas, and connect with the community',
    url: 'https://github.com/sreejagatab/AI-Civ-TestUniverse/discussions',
    icon: MessageCircle,
    action: 'Join Discussions',
    stats: 'Q&A',
  },
  {
    title: 'Pull Requests',
    description: 'Contribute code, review PRs, and help improve TestUniverse',
    url: 'https://github.com/sreejagatab/AI-Civ-TestUniverse/pulls',
    icon: GitPullRequest,
    action: 'View PRs',
    stats: 'Contributions',
  },
];

const waysToHelp = [
  {
    title: 'Star the Repo',
    description: 'Show your support by starring us on GitHub',
    icon: Star,
  },
  {
    title: 'Report Issues',
    description: 'Help us improve by reporting bugs and issues',
    icon: Bug,
  },
  {
    title: 'Contribute Code',
    description: 'Submit pull requests to add features or fix bugs',
    icon: Code,
  },
  {
    title: 'Improve Docs',
    description: 'Help make our documentation better',
    icon: BookOpen,
  },
  {
    title: 'Share Knowledge',
    description: 'Answer questions in discussions',
    icon: MessageCircle,
  },
  {
    title: 'Spread the Word',
    description: 'Tell others about TestUniverse',
    icon: Heart,
  },
];

export default function CommunityPage() {
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
            <Badge variant="primary" className="mb-6">Community</Badge>
            <h1 className="heading-1 text-white mb-6">
              Join Our Community
            </h1>
            <p className="lead max-w-3xl mx-auto">
              Connect with developers, contribute to the project, and help shape
              the future of AI-powered testing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Community Links */}
      <Section title="Get Involved" subtitle="Connect with us on GitHub">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {communityLinks.map((link, index) => (
            <motion.a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full group">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center shrink-0">
                      <link.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="group-hover:text-primary-400 transition-colors">
                          {link.title}
                        </CardTitle>
                        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-primary-400 transition-colors" />
                      </div>
                      <CardDescription>{link.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="info">{link.stats}</Badge>
                    <span className="text-sm text-primary-400 group-hover:text-primary-300">
                      {link.action} &rarr;
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Ways to Help */}
      <Section dark title="Ways to Contribute" subtitle="Every contribution matters">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {waysToHelp.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Code of Conduct */}
      <Section title="Code of Conduct">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="py-8">
                <Users className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">
                  Be Respectful and Inclusive
                </h3>
                <p className="text-slate-400 mb-6">
                  We are committed to providing a welcoming and inclusive environment
                  for everyone. Please be respectful in all interactions and help us
                  maintain a positive community.
                </p>
                <ul className="text-left space-y-2 text-slate-300 max-w-md mx-auto">
                  <li className="flex items-center gap-2">
                    <span className="text-accent-500">&#10003;</span>
                    Be welcoming to newcomers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent-500">&#10003;</span>
                    Use inclusive language
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent-500">&#10003;</span>
                    Be patient with questions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent-500">&#10003;</span>
                    Focus on constructive feedback
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
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
            <h2 className="heading-2 text-white mb-6">Ready to Get Started?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Check out our contributing guide to learn how to set up your
              development environment and make your first contribution.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/AI-Civ-TestUniverse/contributing" className="btn-primary">
                Contributing Guide
              </a>
              <a
                href="https://github.com/sreejagatab/AI-Civ-TestUniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
