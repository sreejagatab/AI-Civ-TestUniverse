import Link from 'next/link';
import { Github, Twitter, Zap } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Architecture', href: '/architecture' },
    { name: 'Coverage', href: '/coverage' },
    { name: 'Results', href: '/results' },
    { name: 'Pricing', href: '/pricing' },
  ],
  developers: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Quick Start', href: '/docs/quickstart' },
    { name: 'CLI Reference', href: '/docs/api/cli' },
    { name: 'API Reference', href: '/docs/api/rest' },
    { name: 'Schemas', href: '/docs/api/schemas' },
  ],
  community: [
    { name: 'Community', href: '/community' },
    { name: 'GitHub', href: 'https://github.com/sreejagatab/AI-Civ-TestUniverse' },
    { name: 'Issues', href: 'https://github.com/sreejagatab/AI-Civ-TestUniverse/issues' },
    { name: 'Discussions', href: 'https://github.com/sreejagatab/AI-Civ-TestUniverse/discussions' },
    { name: 'Contributing', href: '/contributing' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'License', href: '/license' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">TestUniverse</span>
            </Link>
            <p className="mt-4 text-sm text-slate-400">
              Constitutional AI Multi-Agent Testing Framework
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://github.com/sreejagatab/AI-Civ-TestUniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Product
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Developers
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.developers.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Community
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} AI-Civ TestUniverse. MIT License.
            </p>
            <p className="text-sm text-slate-500">
              Built with the AI Civilization constitutional framework.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
