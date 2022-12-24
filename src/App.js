import React from 'react';
import { PublicRoute } from '@components/routing/PublicRoute/PublicRoute';

import './App.scss';

import {PageProvider} from "@services/Providers/PageProvider"



  import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <PageProvider>
        <PublicRoute/>
        </PageProvider>
    </ThemeProvider>
  );
}


export default App;
