import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'sage' | 'teal' | 'copper' | 'ochre' | 'brick' | 'success' | 'warning';
}

function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-teal/15 text-teal border border-teal/30',
    teal: 'bg-teal/15 text-teal border border-teal/30',
    secondary: 'bg-surface-secondary text-muted-foreground border border-border',
    outline: 'text-muted-foreground border border-border bg-transparent',
    sage: 'bg-sage/15 text-sage border border-sage/30',
    success: 'bg-sage/15 text-sage border border-sage/30',
    copper: 'bg-copper/15 text-copper border border-copper/30',
    ochre: 'bg-ochre/15 text-ochre border border-ochre/30',
    warning: 'bg-ochre/15 text-ochre border border-ochre/30',
    brick: 'bg-brick/15 text-brick border border-brick/30',
    destructive: 'bg-brick/15 text-brick border border-brick/30',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold tracking-wide transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
