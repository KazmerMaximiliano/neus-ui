import type { Preview } from '@storybook/react-vite';
import { addons } from 'storybook/internal/preview-api';
import React, { useEffect } from 'react';
import '../src/css/app.css';
import { ThemeProvider } from '../src/providers';

function applyScheme(scheme: string) {
  document.documentElement.setAttribute('data-color-scheme', scheme);
  document.body.style.backgroundColor = scheme === 'dark' ? '#1e1e2e' : '';
  document.body.style.transition = 'background-color 0.2s ease';
}

// Apply scheme to whichever iframe this module loads in
const channel = addons.getChannel();
channel.on('globalsUpdated', ({ globals }: { globals: Record<string, string> }) => {
  if (globals.colorScheme) applyScheme(globals.colorScheme);
});
channel.on('SET_GLOBALS', ({ globals }: { globals: Record<string, string> }) => {
  if (globals.colorScheme) applyScheme(globals.colorScheme);
});

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    colorScheme: 'light',
  },

  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },

  decorators: [
    (Story, context) => {
      const scheme = (context.globals.colorScheme as 'light' | 'dark') ?? 'light';

      useEffect(() => {
        applyScheme(scheme);
      }, [scheme]);

      return React.createElement(
        ThemeProvider,
        { initialTheme: { primaryColor: '#283593' }, initialColorScheme: scheme },
        React.createElement(Story, {})
      );
    },
  ],
};

export default preview;
