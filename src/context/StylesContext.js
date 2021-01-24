import { ThemeProvider } from 'styled-components';
import React from 'react';
import { Reset } from 'styled-reset';

import { GlobalStyles, theme } from '@styles';

export function StylingProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
