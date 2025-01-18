import { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [searchResults, setSearchResults] = useState([]);

    const clearSaerchResults = () => {
        setSearchResults([]);
    }
    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults, clearSaerchResults }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    return useContext(SearchContext);
}
