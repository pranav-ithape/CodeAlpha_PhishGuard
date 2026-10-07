import React from 'react';

interface PhishGuardLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: number;
}

export const PhishGuardLogo: React.FC<PhishGuardLogoProps> = ({ 
  className = '', 
  iconOnly = false,
  size = 32
}) => {
  if (iconOnly) {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 36 36" 
        fill="none" 
        className={className}
        style={{ width: size, height: size }}
      >
        <g transform="translate(2, 2)">
          <path 
            d="M16 2L4 7V17C4 24.5 9.1 31.4 16 33C22.9 31.4 28 24.5 28 17V7L16 2Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary fill-surface-container"
          />
          <path 
            d="M16 8V27" 
            stroke="#A6634F" 
            strokeWidth="1.6" 
            strokeLinecap="round" 
          />
          <circle cx="16" cy="15" r="3.2" className="fill-primary" />
          <path 
            d="M12.5 19L16 22.5L19.5 19" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-on-surface"
          />
        </g>
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 36 36" 
        fill="none" 
        style={{ width: size, height: size }}
        className="shrink-0"
      >
        <g transform="translate(2, 2)">
          <path 
            d="M16 2L4 7V17C4 24.5 9.1 31.4 16 33C22.9 31.4 28 24.5 28 17V7L16 2Z" 
            stroke="#195350" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="#ECE9E1"
          />
          <path 
            d="M16 8V27" 
            stroke="#8C4E3B" 
            strokeWidth="1.6" 
            strokeLinecap="round" 
          />
          <circle cx="16" cy="15" r="3.2" fill="#195350" />
          <path 
            d="M12.5 19L16 22.5L19.5 19" 
            stroke="#1B1C1B" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </g>
      </svg>
      <div className="flex flex-col">
        <span className="font-title text-title text-primary tracking-tight leading-none font-bold">
          PhishGuard
        </span>
        <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5 font-semibold">
          Educational Suite
        </span>
      </div>
    </div>
  );
};
