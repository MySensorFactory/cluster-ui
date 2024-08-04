import React, { createContext, useContext } from 'react';
import { useApi } from './UseApi';

const ApiContext = createContext(null);

export const ApiProvider  = ({ children }) => {
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