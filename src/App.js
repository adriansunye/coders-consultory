import React from 'react';
import { PublicRoute } from '@components/routing/PublicRoute/PublicRoute';

import './App.scss';
import {ThemeProvider} from "@services/Providers/ThemeProvider"

function App() {


  return (
    <ThemeProvider >
        <PublicRoute/>
    </ThemeProvider> 
  
  );
}

export default App;
