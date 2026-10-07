import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PhishGuardLogo } from './PhishGuardLogo';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const navSections = [
    {
      label: 'General',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: 'grid_view' },
      ],
    },
    {
      label: 'Educational Modules',
      items: [
        { name: 'Modules', path: '/learn', icon: 'auto_stories' },
        { name: 'Real-World Case Studies', path: '/examples', icon: 'history_edu' },
      ],
    },
    {
      label: 'Interactive Labs',
      items: [
        { name: 'Email Inspector', path: '/email-analysis', icon: 'mark_email_unread' },
        { name: 'URL & Domain Lab', path: '/url-analysis', icon: 'link' },
      ],
    },
    {
      label: 'Evaluation & Response',
      items: [
        { name: 'Interactive Assessment', path: '/quiz', icon: 'fact_check' },
        { name: 'Incident Response Guide', path: '/incident-response', icon: 'shield' },
        { name: 'Prevention Guidelines', path: '/prevention', icon: 'lock' },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between pt-5 pb-5">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="px-space-lg pb-4 border-b border-outline-variant flex items-center justify-between">
          <Link to="/dashboard" onClick={onCloseMobile} className="focus:outline-none">
            <PhishGuardLogo size={44} />
          </Link>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 rounded hover:bg-surface-container text-on-surface-variant"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <nav className="flex flex-col gap-y-1 px-space-sm mt-space-md">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1 mb-2">
              <div className="px-space-md pt-2 pb-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  {section.label}
                </span>
              </div>
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-space-sm px-space-md py-2 rounded transition-colors font-body-sm text-body-sm',
                      isActive
                        ? 'bg-surface-container-lowest text-on-surface font-title border-l-4 border-primary shadow-xs'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={cn('material-symbols-outlined text-[20px] shrink-0', isActive ? 'text-primary' : 'text-outline')}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Metadata */}
      <div className="px-space-lg pt-4 border-t border-outline-variant flex flex-col gap-1">
        <span className="font-label-sm text-label-sm text-on-surface font-semibold">PhishGuard Education v2.4</span>
        <span className="font-label-sm text-label-sm text-outline">Readability-First Security Archival</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-surface-container-high border-r border-outline-variant h-screen sticky top-0 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={onCloseMobile} 
          />
          <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-high border-r border-outline-variant z-50 shadow-2xl overflow-y-auto">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
