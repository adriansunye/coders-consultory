import React, { useState, createContext, useContext } from "react";

export const UsernameContext = createContext({
    username: "Anonymous",
    setUsername: () => { },
})

export const UsernameProvider = ({ children }) => {
    const [username, setUsername] = useState("Anonymous");
    
    return (
        <UsernameContext.Provider value={{ username, setUsername }}>
            {children}
        </UsernameContext.Provider>
    );
};

const useUsername = () => {
    const context = useContext(UsernameContext);

    if (context === undefined) {
        throw new Error("useUsername must be used within a UsernameProvider");
    }
    return context;
};

export default useUsername;