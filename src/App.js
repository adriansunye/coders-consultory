import React from 'react';
import { PublicRoute } from '@components/routing/PublicRoute/PublicRoute';

import './App.scss';

import { PageProvider } from "@services/Providers/PageProvider"
import { ColorModeProvider } from '@services/Providers/ColorModeProvider';
import { UsernameProvider } from '@services/Providers/UsernameProvider';
import { CoderProvider } from '@services/Providers/CoderProvider';

function App() {
  return (
    <UsernameProvider>
      <CoderProvider>
        <PageProvider>
          <ColorModeProvider>
            <PublicRoute />
          </ColorModeProvider>
        </PageProvider>
      </CoderProvider>
    </UsernameProvider>
  );
}


export default App;
