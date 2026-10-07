import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/button';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative rounded h-8 w-8 border-border bg-surface hover:bg-surface-secondary text-foreground"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-ochre transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-teal transition-transform hover:-rotate-12" />
      )}
    </Button>
  );
};
