import { useState, useCallback } from "react";

export const Http = () => {
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);

    const request = useCallback( async (url) => {

        setLoading(true);

        try{
            let res = await fetch(url);

            if(!res.ok){
                throw new Error(`url: ${url}, status: ${res.status}`);
            }

            const data = await res.json();
            setLoading(false);
            return data;
        } catch {
            setError(true);
            setLoading(false);
        }
    }, []);

    const onErrorFalse = useCallback(() => setError(false), []);

    return {loading, error, request, onErrorFalse};
}