import { Post } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createPost = async (data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">, userId: string ) =>{
    const result = await prisma.post.create({
        data:{
            ...data,
            authorId: userId // userId automatically set up into authorId
        }
    });
    return result
}

export const postServices = {
    createPost,
}