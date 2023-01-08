import React, { useState, createContext, useContext } from "react";

export const CoderContext = createContext({
    coder: "No Coder Selected",
    setCoder: () => { },
})

export const CoderProvider = ({ children }) => {
    const [coder, setCoder] = useState("No Coder Selected");
    return (
        <CoderContext.Provider value={{ coder, setCoder }}>
            {children}
        </CoderContext.Provider>
    );
};

const useCoder = () => {
    const context = useContext(CoderContext);

    if (context === undefined) {
        throw new Error("useCoder must be used within a CoderProvider");
    }
    return context;
};

export default useCoder;