import React, {createContext, useContext} from 'react';
import {useHomeApi} from './HomeClient';
import {useReportsApi} from "./ReportsClient";

const ApiContext = createContext(null);

export const ApiProvider = ({children}) => {
    const homeApi = useHomeApi()
    const reportsApi = useReportsApi()
    return (
        <ApiContext.Provider value={{homeApi, reportsApi}}>
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