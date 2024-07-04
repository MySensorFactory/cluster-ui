import React, { createContext, useState, useContext } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState('Home');
    const [homeSubMenu, setHomeSubMenu] = useState('view');

    const value = {
        activeMenu,
        setActiveMenu,
        homeSubMenu,
        setHomeSubMenu,
    };

    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => useContext(AppStateContext);