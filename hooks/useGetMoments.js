// hooks/useGetMoments.js

'use client'
import { useState, useEffect } from 'react';

export default function useGetMoments() {
    const [moments, setMoments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/moments')
        .then(res => res.json())
        .then(data => {
            setMoments(data);
            setIsLoading(false);
        })
    }, [])
    return { moments, isLoading }
}
