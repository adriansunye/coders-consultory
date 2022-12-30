import React from 'react';
import { PublicRoute } from '@components/routing/PublicRoute/PublicRoute';

import './App.scss';

import {PageProvider} from "@services/Providers/PageProvider"
import { ColorModeProvider } from '@services/Providers/ColorModeProvider';
import { AxiosInstanceProvider } from '@services/Providers/AxiosInstanceProvider';

function App() {
  return (
    <AxiosInstanceProvider>
      <PageProvider>
      <ColorModeProvider>
          <PublicRoute/>
      </ColorModeProvider>
    </PageProvider>
    </AxiosInstanceProvider>
  );
}


export default App;
