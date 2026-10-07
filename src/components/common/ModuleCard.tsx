import React from 'react';
import { Link } from 'react-router-dom';
import { TrainingModule } from '../../types';
import { cn } from '../../lib/utils';

interface ModuleCardProps {
  module: TrainingModule;
  isCompleted?: boolean;
  isInProgress?: boolean;
  isLocked?: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  isCompleted = false,
  isInProgress = false,
  isLocked = false
}) => {
  const modNumberStr = `MOD.${String(module.number).padStart(2, '0')}`;

  if (isLocked) {
    return (
      <article className="bg-surface-container-low rounded-lg p-space-md flex flex-col justify-between opacity-85 border border-outline-variant/40">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-code text-code text-outline font-medium">{modNumberStr}</span>
            <span className="bg-surface-container text-outline font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">lock</span> Locked
            </span>
          </div>
          <h4 className="font-title text-title text-on-surface-variant leading-snug">
            {module.title}
          </h4>
          <p className="font-body-sm text-body-sm text-outline line-clamp-2">
            {module.description}
          </p>
        </div>
        <div className="flex items-center justify-between pt-space-md mt-space-sm bg-transparent border-t border-outline-variant/30">
          <span className="font-code text-code text-outline">{module.estimatedMinutes} min · Prereq Required</span>
          <span className="material-symbols-outlined text-outline text-[18px]">lock</span>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        'bg-surface-container-lowest rounded-lg p-space-md flex flex-col justify-between h-full shadow-xs hover:shadow transition-shadow relative border border-outline-variant/60',
        isInProgress && 'shadow-sm border-t-2 border-t-primary'
      )}
    >
      {isInProgress && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-lg"></div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className={cn(
            'font-code text-code font-medium',
            isInProgress ? 'text-primary font-bold' : 'text-outline'
          )}>
            {modNumberStr}
          </span>

          {isCompleted ? (
            <span className="bg-tertiary/10 text-tertiary font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
            </span>
          ) : isInProgress ? (
            <span className="bg-primary/10 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded font-semibold">
              In Progress
            </span>
          ) : (
            <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded">
              Not Started
            </span>
          )}
        </div>

        <h4 className="font-title text-title text-on-surface leading-snug">
          {module.title}
        </h4>

        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
          {module.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-space-md mt-space-sm bg-transparent border-t border-outline-variant/30">
        <span className="font-code text-code text-outline">
          {module.estimatedMinutes} min · {module.category}
        </span>

        {isInProgress ? (
          <Link
            to={module.route}
            className="bg-primary text-on-primary px-3 py-1 rounded font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-xs"
          >
            Resume Module →
          </Link>
        ) : isCompleted ? (
          <Link
            to={module.route}
            className="font-label-md text-label-md text-primary hover:text-primary-container font-semibold transition-colors flex items-center gap-1"
          >
            Review Module →
          </Link>
        ) : (
          <Link
            to={module.route}
            className="font-label-md text-label-md text-primary hover:text-primary-container font-semibold transition-colors flex items-center gap-1"
          >
            Start Module →
          </Link>
        )}
      </div>
    </article>
  );
};
