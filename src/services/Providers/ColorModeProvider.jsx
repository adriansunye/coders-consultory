import React, { useState, createContext, useContext, useMemo } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';


export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState("light");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );


    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light' && {
                        primary: {
                            main: '#806EDF',
                        },
                        background: {
                            default: '#F7F7FD',
                            paper: '#fefcfe',
                        },
                    }),
                    ...(mode === 'dark' && {
                        primary: {
                            main: '#C88EE4',
                        },
                        background: {
                            default: '#1D192F',
                            paper: '#262138',
                        },
                    }),
                    secondary: {
                        main: '#f50057',
                    },
                    text: {
                        secondary: '#7268DC',
                    },
                }
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

const useColorMode = () => {
    const context = useContext(ColorModeContext);

    if (context === undefined) {
        throw new Error("useColorMode must be used within a ColorProvider");
    }
    return context;
};

export default useColorMode;