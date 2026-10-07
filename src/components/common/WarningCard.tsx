import React from 'react';
import { cn } from '../../lib/utils';

interface WarningCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const WarningCard: React.FC<WarningCardProps> = ({
  title = 'Critical Warning Sign',
  children,
  className,
}) => {
  return (
    <div
      role="alert"
      className={cn(
        'rounded-lg border border-outline-variant/60 bg-surface-container p-space-md border-l-4 border-l-error flex items-start gap-3.5 shadow-xs text-on-surface',
        className
      )}
    >
      <div className="w-8 h-8 rounded bg-error-container text-on-error-container flex items-center justify-center shrink-0 mt-0.5">
        <span className="material-symbols-outlined text-[18px]">warning</span>
      </div>
      <div className="space-y-1">
        <h4 className="font-label-sm text-label-sm font-bold uppercase text-error tracking-wider">
          {title}
        </h4>
        <div className="text-on-surface font-body-sm text-body-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};
