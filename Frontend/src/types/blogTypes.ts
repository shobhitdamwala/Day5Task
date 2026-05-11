export interface Blog {
    _id?: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
}

export interface CreateBlogPayload extends Blog {
    captchaToken: string;
}
