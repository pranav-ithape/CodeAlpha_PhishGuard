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
      <img 
        src="/logo-icon.png" 
        alt="PhishGuard Shield" 
        className={className}
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img 
        src="/logo-full.png" 
        alt="PhishGuard" 
        style={{ height: size, width: 'auto', objectFit: 'contain' }}
        className="shrink-0"
      />
    </div>
  );
};
