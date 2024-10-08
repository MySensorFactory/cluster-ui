import React, {createContext, useContext, useState} from 'react';
import type {RequestError} from "../datasource/Common";

const ErrorContext = createContext(null);

export class ErrorContextType {
    error: RequestError
}

export const ErrorProvider = ({children}) => {
    const [error: RequestError, setError: (RequestError) => void] = useState(null);
    return (
        <ErrorContext.Provider value={[error, setError]}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useErrorContext = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useErrorContext must be used within an ErrorProvider');
    }
    return context
}