import { useState, useEffect } from "react";
import {get} from "../app/api";


export default function useApiQuery(query, token: string | null): [any, boolean, string | null] {

    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (token) {
            get(query, token)
                .then(data => {
                    setLoading(false);

                    if (data !== null) {
                        setData(data.records);
                    }
                })
                .catch(err => {
                setError(err.message ? err.message : 'Please try again.');
            })
        }

    }, [token, query]);

    return [data, loading, error];
};
