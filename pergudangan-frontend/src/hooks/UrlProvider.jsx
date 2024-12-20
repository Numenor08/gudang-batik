import { createContext, useContext, useMemo, useState } from "react";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
    const [url, setUrl] = useState("/");

    const contextValue = useMemo(() => ({ url, setUrl }), [url]);

    return <UrlContext.Provider value={contextValue}>{children}</UrlContext.Provider>;
}

const useUrl = () => {
    const context = useContext(UrlContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { UrlContext, UrlProvider, useUrl };