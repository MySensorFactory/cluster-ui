import React, {createContext, useContext} from 'react';
import {HomeApi} from './HomeClient';
import {ReportsApi} from "./ReportsClient";

const ApiContext = createContext(null);

export class ApiContextType{
    homeApi: HomeApi;
    reportsApi: ReportsApi;
}

export const ApiProvider = ({children}) => {
    const homeApi = new HomeApi('http://localhost:8082/data/home')
    const reportsApi = new ReportsApi('http://localhost:8082/data')
    return (
        <ApiContext.Provider value={{homeApi, reportsApi}}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApiContext = (): ApiContextType => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApiContext must be used within an ApiProvider');
    }
    return context;
};