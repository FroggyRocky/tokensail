'use client';
import {useEffect, useRef} from "react";

export function useDebounce(callback:any, delay:number, dependencies:any[]) {
    const timeoutRef = useRef<any>(null)
    useEffect(() => {
        if(timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            callback()
        }, delay)
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [...dependencies])
    useEffect(() => {
        clearTimeout(timeoutRef.current)
    }, [])
}

export function withDebounce(callback:any, delay:number) {
    let timeoutRef = null as any
    return function() {
        if(timeoutRef) clearTimeout(timeoutRef)
        timeoutRef = setTimeout(() => {
            callback()
        }, delay)
    }
}

export function useClickOutside(ref:any, callback:any) {
    const handleClick = (e:any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
}