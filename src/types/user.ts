export type UserData = {
    address: string
    avatarUrl: string
    role: UserRole
    createTime: string
    id: number
    nickname: string
    password: string
    phone: string
    sex: string
    username: string
    email: string
}

export enum UserRole {
    "ROLE_ADMIN" = "管理员",
    "ROLE_USER" = "一般用户"
}

export type UserRoleIndex = keyof typeof UserRole;