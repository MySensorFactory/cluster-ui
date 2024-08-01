import React, { createContext, useContext } from 'react';
import { useApi } from './useApi';

const ApiContext = createContext<ReturnType<typeof useApi> | null>(null);

export const ApiProvider: React.FC = ({ children }) => {
    const api = useApi();

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApiContext = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApiContext must be used within an ApiProvider');
    }
    return context;
};