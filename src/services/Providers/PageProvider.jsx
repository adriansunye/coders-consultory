import React, { useState, createContext, useContext } from "react";

export const PageContext = createContext({
    page: "home",
    setPage: () => { },
})

export const PageProvider = ({ children }) => {
    const [page, setPage] = useState("home");
    return (
        <PageContext.Provider value={{ page, setPage }}>
            {children}
        </PageContext.Provider>
    );
};

const usePage = () => {
    const context = useContext(PageContext);

    if (context === undefined) {
        throw new Error("usePage must be used within a PageProvider");
    }
    return context;
};

export default usePage;