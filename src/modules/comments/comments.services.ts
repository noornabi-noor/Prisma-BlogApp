import { prisma } from "../../lib/prisma";

const createComment = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  // check postId correct or not
  await prisma.comment.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });

  // check parentId exist or not
  if (payload.parentId) {
    await prisma.comment.findUniqueOrThrow({ // findUniqueOrThrow it is check and throw error if not exist
      where:{
        id: payload.parentId,
      }
    });
  }

  return await prisma.comment.create({
    data: payload,
  });
};

export const commentServices = {
  createComment,
};
