import React from 'react';
import { cn } from '../../lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface ProgressIndicatorProps {
  completedCount: number;
  totalCount: number;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  completedCount,
  totalCount,
  label = 'Training Progress',
  className,
  showIcon = true,
}) => {
  const percentage = Math.min(100, Math.round((completedCount / Math.max(1, totalCount)) * 100));

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          {showIcon && <CheckCircle2 className="h-3.5 w-3.5 text-teal" />}
          {label}
        </span>
        <span className="font-mono text-foreground font-semibold">
          {completedCount} / {totalCount} ({percentage}%)
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-secondary">
        <div
          className="h-full bg-teal transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {percentage === 100 && (
        <div className="flex items-center gap-1.5 text-xs text-sage font-medium pt-1">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Curriculum Complete! Ready for Assessment.</span>
        </div>
      )}
    </div>
  );
};
