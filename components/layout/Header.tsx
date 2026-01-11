'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Github, Zap } from 'lucide-react';

const navigation = [
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Architecture', href: '/architecture' },
  { name: 'Coverage', href: '/coverage' },
  { name: 'Results', href: '/results' },
  { name: 'Docs', href: '/docs' },
  { name: 'Open Source', href: '/open-source' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Pricing', href: '/pricing' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-700/50">
      <nav className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                TestUniverse
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <a
              href="https://github.com/sreejagatab/AI-Civ-TestUniverse"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost p-2"
            >
              <Github className="w-5 h-5" />
            </a>
            <Link href="/docs/quickstart" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="btn-ghost p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/50">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-2 border-slate-700/50" />
              <a
                href="https://github.com/sreejagatab/AI-Civ-TestUniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <Link
                href="/docs/quickstart"
                className="btn-primary mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
