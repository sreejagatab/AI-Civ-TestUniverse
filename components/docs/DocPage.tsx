'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Terminal } from '@/components/ui/Terminal';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface DocPageProps {
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}

export function DocPage({ title, description, badge, children, prev, next }: DocPageProps) {
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/docs" className="text-sm text-slate-400 hover:text-primary-400 transition-colors">
              ← Back to Docs
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            {badge && <Badge variant="primary" className="mb-4">{badge}</Badge>}
            <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
            <p className="text-xl text-slate-400">{description}</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none">
            {children}
          </div>

          {/* Navigation */}
          {(prev || next) && (
            <div className="flex justify-between mt-12 pt-8 border-t border-slate-800">
              {prev ? (
                <Link href={prev.href} className="group flex items-center gap-2 text-slate-400 hover:text-primary-400 transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm">{prev.title}</span>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={next.href} className="group flex items-center gap-2 text-slate-400 hover:text-primary-400 transition-colors">
                  <span className="text-sm">{next.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : <div />}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

interface DocSectionProps {
  title: string;
  children: ReactNode;
}

export function DocSection({ title, children }: DocSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      {children}
    </section>
  );
}

interface CodeBlockProps {
  title?: string;
  children: string;
}

export function CodeBlock({ title, children }: CodeBlockProps) {
  return (
    <div className="my-6">
      <Terminal title={title || 'Code'} animate={false}>
        {children}
      </Terminal>
    </div>
  );
}

interface InfoBoxProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: ReactNode;
}

export function InfoBox({ type = 'info', title, children }: InfoBoxProps) {
  const colors = {
    info: 'bg-primary-500/10 border-primary-500/30 text-primary-400',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    success: 'bg-accent-500/10 border-accent-500/30 text-accent-400',
  };

  return (
    <div className={`my-6 p-4 rounded-lg border ${colors[type]}`}>
      {title && <h4 className="font-semibold mb-2">{title}</h4>}
      <div className="text-slate-300 text-sm">{children}</div>
    </div>
  );
}

interface ParamTableProps {
  params: Array<{
    name: string;
    type: string;
    required?: boolean;
    description: string;
    default?: string;
  }>;
}

export function ParamTable({ params }: ParamTableProps) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left py-3 px-4 text-slate-300 font-semibold">Parameter</th>
            <th className="text-left py-3 px-4 text-slate-300 font-semibold">Type</th>
            <th className="text-left py-3 px-4 text-slate-300 font-semibold">Description</th>
            <th className="text-left py-3 px-4 text-slate-300 font-semibold">Default</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param) => (
            <tr key={param.name} className="border-b border-slate-800">
              <td className="py-3 px-4">
                <code className="text-primary-400">{param.name}</code>
                {param.required && <Badge variant="error" className="ml-2 text-xs">Required</Badge>}
              </td>
              <td className="py-3 px-4 text-slate-400">{param.type}</td>
              <td className="py-3 px-4 text-slate-300">{param.description}</td>
              <td className="py-3 px-4 text-slate-400">{param.default || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
