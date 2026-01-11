import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'warning' | 'error' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        {
          'bg-primary-500/20 text-primary-400': variant === 'primary',
          'bg-accent-500/20 text-accent-400': variant === 'accent',
          'bg-amber-500/20 text-amber-400': variant === 'warning',
          'bg-red-500/20 text-red-400': variant === 'error',
          'bg-slate-500/20 text-slate-400': variant === 'info',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
