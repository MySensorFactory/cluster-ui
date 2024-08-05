import React, {createContext, useContext} from 'react';
import {useApi} from './ApiClient';

const ApiContext = createContext(null);

export const ApiProvider = ({children}) => {
    const homeApi = useApi()
    return (
        <ApiContext.Provider value={{homeApi}}>
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