import { message } from "antd";
import request, { AxiosRequestConfig } from "axios";

const req = async (option: AxiosRequestConfig<any>) => {
    try {
        let user = JSON.parse(localStorage.getItem("user") ?? "null");
        let res = await request({
            ...option,
            timeout: 5000,
            headers: {
                ...option.headers,
                token: user ? user.token : option.headers?.token
            }
        });
        if (res.status >= 200 && res.status < 300) {
            if (res.data.code === 999) {
                message.warning("登录已失效");
                localStorage.removeItem("user");
                window.location.href = "/h/home";
                return Promise.reject();
            }
            if (res.data.code === 401) {
                message.warning("登录已失效");
                localStorage.removeItem("user");
                window.location.href = "/h/home";
                return Promise.reject();
            }
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