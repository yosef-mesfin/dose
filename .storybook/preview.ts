import type { Preview } from '@storybook/react';
import '../app/globals.css';

const BREAKPOINTS = {
  xs: 375,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const customViewports = Object.entries(BREAKPOINTS).map(
  ([name, width], idx) => {
    return [
      name,
      {
        name,
        styles: {
          width: `${width}px`,
          height: `${(idx + 5) * 10}vh`,
        },
        type: 'desktop',
      },
    ];
  }
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: customViewports,
    },
  },
};

export default preview;
