import { useState, useCallback } from "react";

export const Http = () => {
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);

    const request = useCallback( async (url) => {

        setLoading(true);

        try{

            const init = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                page_size: 40,
                page: 40
            }

            let res = await fetch(url, {
                page: 40,
                page_size: 40
            });

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