import React, { createContext, useContext, useState, useCallback } from "react";

const RelationConfigContext = createContext(null);

export const RelationConfigProvider = ({ children, ...relationConfig }) => {
    const [refreshToken, setRefreshToken] = useState(0);
    
    const refresh = useCallback(() => {
        setRefreshToken(new Date().getTime());
    }, []);

    const contextValue = {
        ...relationConfig,
        refreshToken,
        refresh
    };

    return (
        <RelationConfigContext.Provider value={contextValue}>
            {children}
        </RelationConfigContext.Provider>
    );
};

export const useRelationConfig = () => {
    const context = useContext(RelationConfigContext);
    
    if (!context) {
        throw new Error("useRelationConfig must be used within a RelationConfigProvider");
    }
    
    return context;
};
