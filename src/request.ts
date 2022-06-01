import request, { AxiosRequestConfig } from "axios";

const req = async (option: AxiosRequestConfig<any>) => {
    try {
        let res = await request({
            ...option,
            timeout: 5000
        });
        if (res.status >= 200 && res.status < 300) {
            return Promise.resolve(res);
        } else {
            return Promise.reject({
                status: res.status,
                text: res.statusText
            });
        }
    } catch (err: any) {
        if (err.code === "ECONNABORTED") {
            return Promise.reject({
                status: 0,
                text: "请求超时"
            })
        } else {
            console.log(err);
            return Promise.reject({
                status: 0,
                text: "请求异常，详见控制台"
            })
        }
    }
}

export default req;