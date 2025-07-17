import React, { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup if value changes before delay
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;