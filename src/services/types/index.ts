import { Post } from "../../types"

export type NewPost = {
    title: string;
    description: string
}

export type EditPost = {
    id: number;
    title: string;
    description: string
}

export type ResponsePosts = {
    data: Post[];
    status: number;
}

export type NewUser = {
    email: string;
    password: string;
}
