export type CommentData = {
    articleId: number,
    avatarUrl: string
    children: CommentData[]
    content: string
    id: number
    nickname: string
    time: string
    userId: number
    pid: number
    pNickName: string
    originId: number
    pUserId: number
    articleName: string
}

export type CommentFetchData = {
    total: number
    records: CommentData[]
}