import React, { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    //states
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [resultsMessage, setResultsMessage] = useState(false);
    const [keyword, setKeyword] = useState("");

    return (
        <AppContext.Provider
            value={{
                resultsMessage,
                setResultsMessage,
                searchResults,
                setSearchResults,
                isLoading,
                setIsLoading,
                isDarkMode,
                setIsDarkMode,
                keyword,
                setKeyword,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
