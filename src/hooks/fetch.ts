import { useEffect, useState } from "react";

type ResultDataType<T> = {
    code: number
    msg: string
    data: T
}

class ResultData<T> {
    code: number;
    msg: string;
    data: T;
    constructor(data: ResultDataType<T>) {
        this.code = data.code;
        this.msg = data.msg;
        this.data = data.data;
    }
}

interface FetchResult<T> {
    data: T
    isLoading: boolean
    error?: any
}

export function useFetch<T>(options:RequestInfo, init: T, effectArr?: any[]):FetchResult<T> {
    const [res, setRes] = useState(init);
    const [err, setErr] = useState<any>();
    const [isLoading, setloading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setloading(true);
            try {
                let res = await fetch(options);
                let json:ResultDataType<T> = await res.json();
                if(json.code === 200) {
                    setRes(json.data);
                } else {
                    throw new Error(json.msg);
                }
            } catch(err) {
                setErr(err);
            } finally {
                setloading(false);
            }
        }
        load();
    }, effectArr ? [...effectArr] : []);

    return {
        data: res,
        error: err,
        isLoading: isLoading
    }
}

export function useTestFetch<T>(data: T, init: T, fail?: boolean):[T, boolean, any] {
    const [res, setRes] = useState<T>(init);
    const [err, setErr] = useState<any>();
    const [loading, setloading] = useState(false);
    useEffect(() => {
        const load = async () => {
            setloading(true);
            try {
                let res = await new Promise<T>((res, rej) => {
                    if (fail) {
                        setTimeout(() => {
                            rej();
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            res(data);
                        }, 2000);
                    }
                });
                setRes(res);
            } catch(err) {
                setErr(err);
            } finally {
                setloading(false);
            }
        }
        load();
    }, []);
    return [res, loading, err];
}