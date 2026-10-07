import React from 'react';
import { Info, ShieldCheck, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AlertCardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'neutral' | 'success';
  className?: string;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  title,
  children,
  variant = 'info',
  className,
}) => {
  const borderAccent = 
    variant === 'success' ? 'border-l-4 border-l-sage' :
    variant === 'info' ? 'border-l-4 border-l-teal' :
    'border-l-4 border-l-outline';

  const iconBg = 
    variant === 'success' ? 'bg-sage/15 text-sage' :
    variant === 'info' ? 'bg-teal/15 text-teal' :
    'bg-surface-secondary text-muted-foreground';

  const IconComponent = variant === 'success' ? ShieldCheck : variant === 'info' ? Info : HelpCircle;

  return (
    <div
      role="region"
      aria-label={title || 'Notice'}
      className={cn(
        'rounded-lg border border-border bg-surface p-5 flex items-start gap-3.5 shadow-sm text-foreground',
        borderAccent,
        className
      )}
    >
      <div className={cn('w-8 h-8 rounded flex items-center justify-center shrink-0 mt-0.5', iconBg)}>
        <IconComponent className="h-4 w-4" />
      </div>
      <div className="space-y-1">
        {title && <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">{title}</h4>}
        <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};
