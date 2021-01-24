import React from 'react';

import { GameProvider } from './GameContext';
import { StylingProvider } from './StylesContext';

function AppProviders({ children }) {

  return (
    <StylingProvider>
      <GameProvider>
        {children}
      </GameProvider>
    </StylingProvider>
  );
}

export default AppProviders;
