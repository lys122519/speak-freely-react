export type ReportData = {
    articleId: number
    commentId: number
    content: string
    deleted: boolean
    execd: boolean
    id: number
    time: string
    userId: number
    nickName: string
    articleName: string
    commentContent: string
}

export type ReportFetchData = {
    records: ReportData[],
    total: number
}