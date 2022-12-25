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
                    primary: {
                        light: '#757ce8',
                        main: '#3f50b5',
                        dark: '#ab003c',
                        contrastText: '#fff',
                    },
                    mode,
                },
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