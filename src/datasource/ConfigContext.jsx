import React, {createContext, useContext, useState} from 'react';
import {Config, ConfigApi} from "./ConfigClient";

class ConfigContext {
    config: Config
}

const ConfigurationContext = createContext(null);

export const ConfigProvider = ({children}) => {
    const [config, setConfig] = useState(null)

    const configApi = new ConfigApi(process.env.REACT_APP_CONFIG_API_BASE_URL);

    if (config == null) {
        configApi.getConfiguration((newConfig: Config) => {
                setConfig(newConfig);
            },
            (_) => {})
    }

    return (
        <ConfigurationContext.Provider value={{config}}>
            {children}
        </ConfigurationContext.Provider>
    );
};

export const useConfigContext = (): ConfigContext => {
    const context = useContext(ConfigurationContext);
    if (!context) {
        throw new Error('useContextContext must be used within an ConfigProvider');
    }
    return context;
};