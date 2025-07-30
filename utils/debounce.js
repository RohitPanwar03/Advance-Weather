import { useState, useEffect } from 'react';

// Utility function for debouncing
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// React hook for debounced values
export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// Custom hook for debounced search
export const useDebouncedSearch = (searchFunction, delay = 300) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, delay);

    useEffect(() => {
        if (debouncedSearchTerm) {
            searchFunction(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm, searchFunction]);

    return [searchTerm, setSearchTerm];
};