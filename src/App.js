import React from 'react';
import { PublicRoute } from '@components/routing/PublicRoute/PublicRoute';

import './App.scss';

import { PageProvider } from "@services/Providers/PageProvider"
import { ColorModeProvider } from '@services/Providers/ColorModeProvider';
import { UsernameProvider } from '@services/Providers/UsernameProvider';
import { UserDataProvider } from './services/Providers/UserDataProvider';

function App() {
  return (
    <UsernameProvider>
        <PageProvider>
          <ColorModeProvider>
            <PublicRoute />
          </ColorModeProvider>
        </PageProvider>
    </UsernameProvider>
  );
}


export default App;
