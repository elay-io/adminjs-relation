import { RelationsFeatureOptions } from '@/global-types';
import { RecordJSON, ResourceJSON } from 'adminjs';
import React, { PropsWithChildren, createContext, useContext, useState, useCallback } from 'react';

type RelationConfigProps = PropsWithChildren<{
    relation: string;
    ownerRecord: RecordJSON;
    ownerResource: ResourceJSON;
    relations: RelationsFeatureOptions;
}>;
type UseRelationConfigResult = Omit<RelationConfigProps, 'children'> & {
    refreshToken: number;
    refresh: () => void;
};


const RelationConfigContext = createContext(null);

export const RelationConfigProvider: React.FC<RelationConfigProps> = ({ children, ...relationConfig }) => {
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
        <RelationConfigContext.Provider value={contextValue as any}>
            {children}
        </RelationConfigContext.Provider>
    );
};

export const useRelationConfig = (): UseRelationConfigResult => {
    const context = useContext(RelationConfigContext);

    if (!context) {
        throw new Error("useRelationConfig must be used within a RelationConfigProvider");
    }

    return context;
};
