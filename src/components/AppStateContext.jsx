import React, { createContext, useState, useContext } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState('Home');
    const [homeSubMenu, setHomeSubMenu] = useState('view');
    const [reportsSubMenu, setReportsSubMenu] = useState('report_list');

    const value = {
        activeMenu,
        setActiveMenu,
        homeSubMenu,
        setHomeSubMenu,
        reportsSubMenu,
        setReportsSubMenu
    };

    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => useContext(AppStateContext);