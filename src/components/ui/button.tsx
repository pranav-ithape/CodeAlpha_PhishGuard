import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'copper' | 'teal';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal disabled:pointer-events-none disabled:opacity-50 select-none';
    
    const variants = {
      default: 'bg-teal text-white hover:bg-teal-hover shadow-xs active:scale-[0.98]',
      teal: 'bg-teal text-white hover:bg-teal-hover shadow-xs active:scale-[0.98]',
      destructive: 'bg-brick text-white hover:bg-brick/90 shadow-xs active:scale-[0.98]',
      copper: 'border border-copper text-copper hover:bg-copper-fixed hover:text-copper transition-colors',
      outline: 'border border-border bg-surface text-foreground hover:bg-surface-secondary hover:text-foreground shadow-xs',
      secondary: 'bg-surface-secondary text-foreground hover:bg-surface-high',
      ghost: 'hover:bg-surface-secondary text-muted-foreground hover:text-foreground',
    };

    const sizes = {
      default: 'h-9 px-4 py-2 text-sm',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-11 px-6 text-base font-semibold',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
