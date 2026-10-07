import React from 'react';
import { cn } from '../../lib/utils';

interface TipCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const TipCard: React.FC<TipCardProps> = ({
  title = 'Security Analyst Recommendation',
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-outline-variant/60 bg-surface-container p-space-md border-l-4 border-l-secondary flex items-start gap-3.5 shadow-xs text-on-surface',
        className
      )}
    >
      <div className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
        <span className="material-symbols-outlined text-[18px]">lightbulb</span>
      </div>
      <div className="space-y-1">
        <h4 className="font-label-sm text-label-sm font-bold uppercase text-secondary tracking-wider">
          {title}
        </h4>
        <div className="text-on-surface font-body-sm text-body-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};
