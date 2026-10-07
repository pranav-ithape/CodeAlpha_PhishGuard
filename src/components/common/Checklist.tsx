import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface ChecklistProps {
  items: string[];
  title?: string;
  className?: string;
  allowToggle?: boolean;
}

export const Checklist: React.FC<ChecklistProps> = ({
  items,
  title = 'Actionable Verification Checklist',
  className,
  allowToggle = true,
}) => {
  const [checkedIndices, setCheckedIndices] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (!allowToggle) return;
    setCheckedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className={cn('rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-6 space-y-4 shadow-sm', className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <h4 className="font-title text-title text-on-surface tracking-tight flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            {title}
          </h4>
          <span className="font-code text-code text-on-surface-variant font-medium">
            {checkedIndices.length} / {items.length} verified
          </span>
        </div>
      )}

      <ul className="space-y-2">
        {items.map((item, index) => {
          const isChecked = checkedIndices.includes(index);
          return (
            <li
              key={index}
              onClick={() => toggleItem(index)}
              className={cn(
                'flex items-start gap-3 rounded p-2.5 transition-all text-sm cursor-pointer select-none border',
                isChecked
                  ? 'bg-tertiary-fixed/30 border-tertiary/40 text-on-surface line-through decoration-tertiary/60'
                  : 'hover:bg-surface-container border-transparent text-on-surface'
              )}
            >
              <div
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors mt-0.5',
                  isChecked
                    ? 'border-tertiary bg-tertiary text-on-tertiary'
                    : 'border-outline bg-surface-container-lowest'
                )}
              >
                {isChecked && (
                  <span className="material-symbols-outlined text-[14px]">check</span>
                )}
              </div>
              <span className="font-body-md text-body-md leading-relaxed">{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
