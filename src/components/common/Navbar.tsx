import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useTrainingProgress } from '../../hooks/useTrainingProgress';
import { PhishGuardLogo } from './PhishGuardLogo';

interface NavbarProps {
  onOpenMobile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobile }) => {
  const { overallPercentage } = useTrainingProgress();

  return (
    <header className="sticky top-0 z-40 w-full h-16 shrink-0 bg-surface-container-low border-b border-outline-variant flex items-center justify-between px-space-lg shadow-xs">
      {/* Left: Mobile hamburger & Badge */}
      <div className="flex items-center gap-space-md">
        <button
          type="button"
          onClick={onOpenMobile}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        {/* Mobile brand text */}
        <Link to="/dashboard" className="lg:hidden flex items-center gap-2">
          <PhishGuardLogo size={28} />
        </Link>

        {/* Desktop Brand / Educational Badge */}
        <div className="hidden lg:flex items-center gap-space-md">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest border border-outline-variant px-2.5 py-0.5 rounded font-semibold bg-surface-container-lowest/50">
            Educational Learning Suite
          </span>
        </div>
      </div>

      {/* Right: Progress, Report CTA, Theme, Profile */}
      <div className="flex items-center gap-space-md sm:gap-space-lg">
        {/* Curriculum Progress Mini-Bar */}
        <div className="hidden lg:flex items-center gap-space-sm border-r border-outline-variant pr-space-md">
          <span className="font-label-md text-label-md text-on-surface-variant font-medium">
            Curriculum: <strong className="text-on-surface font-code">{overallPercentage}%</strong> Completed
          </span>
          <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        {/* Report Action Button (Stitch styled) */}
        <Link to="/incident-response">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-secondary text-secondary hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors font-label-md text-label-md font-semibold cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">flag</span>
            <span className="hidden sm:inline">Report Suspicious Email</span>
            <span className="sm:hidden">Report</span>
          </button>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

      </div>
    </header>
  );
};
