'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface TerminalProps {
  title?: string;
  children: string;
  animate?: boolean;
  className?: string;
}

export function Terminal({ title = 'Terminal', children, animate = true, className }: TerminalProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!animate) {
      setDisplayedText(children);
      return;
    }

    if (currentIndex < children.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + children[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [animate, children, currentIndex]);

  return (
    <div className={cn('terminal overflow-hidden', className)}>
      {/* Header */}
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="ml-2 text-xs text-slate-500">{title}</span>
      </div>

      {/* Body */}
      <div className="terminal-body">
        <pre className="text-slate-300 whitespace-pre-wrap">
          <code>{animate ? displayedText : children}</code>
          {animate && currentIndex < children.length && (
            <span className="inline-block w-2 h-4 bg-primary-500 animate-pulse ml-0.5" />
          )}
        </pre>
      </div>
    </div>
  );
}
