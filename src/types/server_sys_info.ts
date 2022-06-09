export type ServerSysInfo = {
    cpuCoreCount: string
    cpuFreeRatio: string
    cpuModel: string
    cpuSysUsedRatio: string
    cpuUsedRatio: string
    cpuUserUsedRatio: string
    cpuWaitRatio: string
    diskFree: string
    diskTotal: string
    diskUsed: string
    diskUsedRatio: string
    manufacturer: string
    memoryAvailable: string
    memoryTotal: string
    memoryUsed: string
    sysInfo: string
}

export enum UserInfoName {
    "userCount" = "用户总数",
    "activeUser" = "当前在线"
}

export type UserInfoNameIndex = keyof typeof UserInfoName;