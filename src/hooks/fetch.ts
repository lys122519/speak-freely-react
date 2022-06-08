import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { UserContext } from "../context/user";
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

export interface FetchOptions {
    path?: string
    data?: any
    token?: string
    method?: string
}

export function useFetch<T>(options: FetchOptions, init: T): FetchResult<T> {
    const [ops, setOps] = useState(options);
    const [res, setRes] = useState(init);
    const [err, setErr] = useState<any>();
    const [isLoading, setloading] = useState(false);
    const {userinfo} = useContext(UserContext);

    const load = async () => {
        setloading(true);
        try {
            let res = await req({
                url: config.host + ops?.path,
                method:ops.method ?? "GET",
                params: ops.method === "GET" || !ops.method ? ops.data : undefined,
                data: ops.method === "POST" ? ops.data : undefined,
                headers: {
                    token: userinfo?.token ?? ""
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
        if(ops.path) {
            load();
        }
    }, [ops, userinfo]);

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