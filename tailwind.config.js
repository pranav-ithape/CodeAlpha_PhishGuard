/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch Readability-First Tokens
        background: 'var(--color-background)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          dim: 'var(--color-surface-dim)',
          bright: 'var(--color-surface-bright)',
          'container-lowest': 'var(--color-surface-container-lowest)',
          'container-low': 'var(--color-surface-container-low)',
          container: 'var(--color-surface-container)',
          'container-high': 'var(--color-surface-container-high)',
          'container-highest': 'var(--color-surface-container-highest)',
          variant: 'var(--color-surface-variant)',
          secondary: 'var(--color-surface-container-low)',
        },
        'surface-container-lowest': 'var(--color-surface-container-lowest)',
        'surface-container-low': 'var(--color-surface-container-low)',
        'surface-container': 'var(--color-surface-container)',
        'surface-container-high': 'var(--color-surface-container-high)',
        'surface-container-highest': 'var(--color-surface-container-highest)',
        'surface-dim': 'var(--color-surface-dim)',
        'surface-bright': 'var(--color-surface-bright)',
        'surface-variant': 'var(--color-surface-variant)',
        
        'on-surface': 'var(--color-on-surface)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        'inverse-surface': 'var(--color-inverse-surface)',
        'inverse-on-surface': 'var(--color-inverse-on-surface)',

        primary: {
          DEFAULT: 'var(--color-primary)',
          container: 'var(--color-primary-container)',
          fixed: 'var(--color-primary-fixed)',
          'fixed-dim': 'var(--color-primary-fixed-dim)',
          foreground: 'var(--color-on-primary)',
        },
        'primary-container': 'var(--color-primary-container)',
        'primary-fixed': 'var(--color-primary-fixed)',
        'on-primary': 'var(--color-on-primary)',
        'on-primary-container': 'var(--color-on-primary-container)',

        secondary: {
          DEFAULT: 'var(--color-secondary)',
          container: 'var(--color-secondary-container)',
          fixed: 'var(--color-secondary-fixed)',
          'fixed-dim': 'var(--color-secondary-fixed-dim)',
          foreground: 'var(--color-on-secondary)',
        },
        'secondary-container': 'var(--color-secondary-container)',
        'secondary-fixed': 'var(--color-secondary-fixed)',
        'on-secondary': 'var(--color-on-secondary)',
        'on-secondary-container': 'var(--color-on-secondary-container)',
        'on-secondary-fixed': 'var(--color-on-secondary-fixed)',
        'on-secondary-fixed-variant': 'var(--color-on-secondary-fixed-variant)',

        tertiary: {
          DEFAULT: 'var(--color-tertiary)',
          container: 'var(--color-tertiary-container)',
          fixed: 'var(--color-tertiary-fixed)',
          'fixed-dim': 'var(--color-tertiary-fixed-dim)',
          foreground: 'var(--color-on-tertiary)',
        },
        'tertiary-container': 'var(--color-tertiary-container)',
        'tertiary-fixed': 'var(--color-tertiary-fixed)',
        'on-tertiary': 'var(--color-on-tertiary)',
        'on-tertiary-container': 'var(--color-on-tertiary-container)',
        'on-tertiary-fixed': 'var(--color-on-tertiary-fixed)',

        error: {
          DEFAULT: 'var(--color-error)',
          container: 'var(--color-error-container)',
        },
        'error-container': 'var(--color-error-container)',
        'on-error': 'var(--color-on-error)',
        'on-error-container': 'var(--color-on-error-container)',

        outline: {
          DEFAULT: 'var(--color-outline)',
          variant: 'var(--color-outline-variant)',
        },
        'outline-variant': 'var(--color-outline-variant)',

        // Semantic aliases
        foreground: 'var(--color-on-surface)',
        'muted-foreground': 'var(--color-on-surface-variant)',
        border: 'var(--color-outline-variant)',
        card: {
          DEFAULT: 'var(--color-surface-container-lowest)',
          foreground: 'var(--color-on-surface)',
        },

        // Color aliases for backwards compatibility with earlier components
        teal: {
          DEFAULT: 'var(--color-primary-container)',
          hover: 'var(--color-primary)',
          fixed: 'var(--color-primary-fixed)',
        },
        copper: {
          DEFAULT: 'var(--color-secondary)',
          fixed: 'var(--color-secondary-fixed)',
        },
        sage: {
          DEFAULT: 'var(--color-tertiary)',
          fixed: 'var(--color-tertiary-fixed)',
        },
        ochre: {
          DEFAULT: '#a17c42',
          fixed: '#f7f1e6',
        },
        brick: {
          DEFAULT: 'var(--color-error)',
          fixed: 'var(--color-error-container)',
        },
      },
      spacing: {
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
        gutter: '1.5rem',
        'gutter-mobile': '1rem',
        margin: '2.5rem',
        'margin-mobile': '1.25rem',
      },
      fontFamily: {
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
        title: ['"Public Sans"', 'sans-serif'],
        code: ['"JetBrains Mono"', 'monospace'],
        display: ['"Public Sans"', 'sans-serif'],
        body: ['"Public Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        display: ['40px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-mobile': ['30px', { lineHeight: '38px', letterSpacing: '-0.015em', fontWeight: '600' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.015em', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-sm': ['20px', { lineHeight: '28px', letterSpacing: '0em', fontWeight: '600' }],
        title: ['18px', { lineHeight: '26px', letterSpacing: '0em', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '30px', letterSpacing: '0.005em', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '26px', letterSpacing: '0.005em', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '22px', letterSpacing: '0.01em', fontWeight: '400' }],
        'label-md': ['13px', { lineHeight: '18px', letterSpacing: '0.02em', fontWeight: '500' }],
        'label-sm': ['11px', { lineHeight: '16px', letterSpacing: '0.06em', fontWeight: '600' }],
        code: ['13px', { lineHeight: '20px', letterSpacing: '0em', fontWeight: '400' }],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [],
}
