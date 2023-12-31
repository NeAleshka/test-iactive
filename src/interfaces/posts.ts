export interface IResponse {
    Messages:IResponsePost[]
    dislikeImages:[]
    likeImages:[]
}

export interface IResponsePost{
    author: string
    content: string
    channel: string
    id: number
    date: string
    attachments: Attachment[]
    senderNumber: string
    region: string
}

interface Attachment {
    type: string
    url: string
}
