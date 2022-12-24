import React, { useState, createContext, useContext } from "react";

export const ThemeContext = createContext({
    theme: "light",
    setTheme: () => { },
})

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export default useTheme;