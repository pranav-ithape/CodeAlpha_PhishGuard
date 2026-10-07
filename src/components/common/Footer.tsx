import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 space-y-6 pt-6 pb-12 border-t border-outline-variant/60 text-on-surface-variant text-xs">
      {/* Dossier Bar */}
      <div className="bg-surface-container-low rounded-lg p-space-md border border-outline-variant/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">school</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-bold text-on-surface">
              Educational Platform Progress Dossier
            </span>
            <span className="text-outline text-xs">
              Canonical 9-Module Defensive Curriculum · Client-Side Session
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/learn"
            className="bg-surface-container-lowest hover:bg-surface-container font-semibold text-on-surface px-3.5 py-1.5 rounded transition-colors text-xs border border-outline-variant/60 cursor-pointer shadow-xs"
          >
            Curriculum Index
          </Link>
          <Link
            to="/quiz"
            className="bg-primary hover:bg-primary-container text-on-primary font-semibold px-3.5 py-1.5 rounded transition-colors text-xs cursor-pointer shadow-xs"
          >
            Assessment Quiz
          </Link>
        </div>
      </div>

      {/* Disclaimers & Ethics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-outline px-1">
        <div className="flex items-center gap-2 max-w-xl">
          <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">shield</span>
          <span className="font-body-sm text-[12px] leading-relaxed">
            <strong className="text-on-surface">Defensive Educational Protocol:</strong> PhishGuard is built exclusively for defensive cybersecurity education and threat deconstruction.
          </span>
        </div>
        <p className="shrink-0 font-code text-[11px] text-outline">PhishGuard Educational Platform • 2025</p>
      </div>
    </footer>
  );
};
