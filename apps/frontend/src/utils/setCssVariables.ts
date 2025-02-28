export const setCssVariables = (mode: 'light' | 'dark') => {
  if (mode === 'dark') {
    // Set dark mode CSS variables
    document.documentElement.style.setProperty(
      '--color-primary',
      'oklch(65.33% 0.1838 266.79)',
    );
    document.documentElement.style.setProperty(
      '--color-secondary',
      'oklch(76.32% 0.139 237.2)',
    );
    document.documentElement.style.setProperty(
      '--color-bg',
      'oklch(32.51% 0.0323 265.03)',
    );
    document.documentElement.style.setProperty(
      '--color-bg-highlight',
      'oklch(34.23% 0.0804 266.33)',
    );
    document.documentElement.style.setProperty(
      '--color-text',
      'oklch(64.54% 0.0488 258.74)',
    );
    document.documentElement.style.setProperty(
      '--color-icon',
      'oklch(64.54% 0.0488 258.74)',
    );
  } else {
    // Set light mode CSS variables
    document.documentElement.style.setProperty(
      '--color-primary',
      'oklch(65.33% 0.1838 266.79)',
    );
    document.documentElement.style.setProperty(
      '--color-secondary',
      'oklch(76.32% 0.139 237.2)',
    );
    document.documentElement.style.setProperty('--color-bg', 'oklch(100% 0 0)');
    document.documentElement.style.setProperty(
      '--color-bg-highlight',
      'oklch(96.74% 0.019167 230.6894)',
    );
    document.documentElement.style.setProperty(
      '--color-text',
      'oklch(32.7% 0.0355 260.11)',
    );
    document.documentElement.style.setProperty(
      '--color-icon',
      'oklch(32.7% 0.0355 260.11)',
    );
  }
};
