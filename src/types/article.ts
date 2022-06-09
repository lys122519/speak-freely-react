export type ArticleData = {
    content: string
    id: number,
    name: string,
    time: string,
    username: string,
    userid: string,
    enabled: string,
    authorAvatarUrl: string,
    authorNickname: string,
    tagsID: string,
    tagsContent: string
    tagsCounts: string
    userId: number
}

export type ArticleDataFetchResponseData = {
    currents: number
    pages: number
    records: ArticleData[]
    size: number
    total: number
}

export enum ArticleType {
    "全部" = "all",
    "草稿" = "draft",
    "已发布" = "publish"
}

export type articleTypeIndex = keyof typeof ArticleType