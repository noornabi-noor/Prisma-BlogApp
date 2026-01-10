import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { title } from "node:process";

const createComment = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  // check postId correct or not
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });

  // check parentId exist or not
  if (payload.parentId) {
    await prisma.comment.findUniqueOrThrow({
      // findUniqueOrThrow it is check and throw error if not exist
      where: {
        id: payload.parentId,
      },
    });
  }

  return await prisma.comment.create({
    data: payload,
  });
};

const getCommentById = async (id: string) => {
  const result = await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });

  return result;
};

const getCommentByAuthorId = async (authorId: string) => {
  return await prisma.comment.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const commentDelete = async (authorId:string, commentId: string) => {
  const commentData = await prisma.comment.findFirst({
    where:{
      id: commentId,
      authorId,
    },
    select:{
      id: true
    }
  });

  if(!commentData){
    throw new Error("Your provide input is invalid!");
  };

  return await prisma.comment.delete({
    where:{
      id: commentData.id
    }
  })
};


const updateComment = async(commentId: string, data:{content?: string, status?: CommentStatus}, authorId: string) => {
  const commentData = await prisma.comment.findFirst({
    where:{
      id: commentId,
      authorId,
    },
    select:{
      id: true
    }
  });

  if(!commentData){
    throw new Error("Your provide input is invalid!");
  };

  return await prisma.comment.update({
    where:{
      id: commentId,
      authorId
    },
    data
  })
}

export const commentServices = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  commentDelete,
  updateComment,

};
