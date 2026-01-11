import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function Section({ id, title, subtitle, children, className, dark = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'section',
        dark && 'bg-slate-950',
        className
      )}
    >
      <div className="container-custom mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="heading-2 text-white mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="lead max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
