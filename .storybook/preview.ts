import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/css/app.css';
import { ThemeProvider } from '../src/providers';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },

  decorators: [
    (Story) => {
      return React.createElement(
        ThemeProvider,
        {
          initialTheme: { primaryColor: '#283593' },
          children: React.createElement(Story, {})
        }
      );
    },
  ],
};

export default preview;