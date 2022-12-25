import React from 'react';
import { PublicRoute } from '@components/routing/PublicRoute/PublicRoute';

import './App.scss';

import {PageProvider} from "@services/Providers/PageProvider"
import { ColorModeProvider } from '@services/Providers/ColorModeProvider';


function App() {
  return (
    <PageProvider>
      <ColorModeProvider>
          <PublicRoute/>
      </ColorModeProvider>
    </PageProvider>
  );
}


export default App;
