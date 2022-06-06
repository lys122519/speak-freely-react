import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import req from "../request";

type ResultDataType<T> = {
    code: number
    msg: string
    data: T
}

// class ResultData<T> {
//     code: number;
//     msg: string;
//     data: T;
//     constructor(data: ResultDataType<T>) {
//         this.code = data.code;
//         this.msg = data.msg;
//         this.data = data.data;
//     }
// }

type FetchResult<T> = [
    data: T,
    refresh: () => Promise<void>,
    setOps: React.Dispatch<React.SetStateAction<FetchOptions>>,
    isLoading: boolean,
    error?: any
]

interface FetchOptions {
    path: string
    data?: any
    token?: string
}

export function useFetch<T>(options: FetchOptions, init: T): FetchResult<T> {
    const [ops, setOps] = useState(options);
    const [res, setRes] = useState(init);
    const [err, setErr] = useState<any>();
    const [isLoading, setloading] = useState(false);

    const load = async () => {
        setloading(true);
        try {
            let res = await req({
                url: config.host + ops.path,
                method: "GET",
                params: ops.data,
                headers: {
                    token: ops.token ?? ""
                }
            });
            let json: ResultDataType<T> = res.data;
            if (json.code === 200) {
                setRes(json.data);
            } else {
                throw new Error(json.msg);
            }
        } catch (err) {
            setErr(err);
        } finally {
            setloading(false);
        }
    }

    useEffect(() => {
        load();
    }, [ops]);

    return [
        res,
        load,
        setOps,
        err,
        isLoading
    ]
}

export function useTestFetch<T>(data: T, init: T, fail?: boolean): [T, boolean, any] {
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
            } catch (err) {
                setErr(err);
            } finally {
                setloading(false);
            }
        }
        load();
    }, [data, fail]);
    return [res, loading, err];
}