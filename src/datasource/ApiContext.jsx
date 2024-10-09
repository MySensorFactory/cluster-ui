import React, {createContext, useContext} from 'react';
import {HomeApi} from './HomeClient';
import {ReportsApi} from "./ReportsClient";

const ApiContext = createContext(null);

export class ApiContextType{
    homeApi: HomeApi;
    reportsApi: ReportsApi;
}

export const ApiProvider = ({children}) => {
    const homeApi = new HomeApi(process.env.REACT_APP_HOME_API_BASE_URL)
    const reportsApi = new ReportsApi(process.env.REACT_APP_REPORTS_API_BASE_URL)
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