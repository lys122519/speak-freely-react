import { createContext } from "react";

export interface UserInfo {
    status: number
    username: string
    role: string
    address: string
    avatarUrl: string
    id: number
    password: string
    phone: string
    token: string
    email: string
    nickname: string
}

export const UserContext = createContext<{userinfo: UserInfo | undefined, setUser:React.Dispatch<React.SetStateAction<UserInfo | undefined>>}>({
    userinfo: {
        status: 0,
        username: "",
        role: "",
        email: "",
        nickname: "",
        password: "",
        id: -1,
        phone: "",
        token: "",
        address: "",
        avatarUrl: ""
    },
    setUser: () => {}
});