import { title } from "node:process";
import { Post, PostStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId, // userId automatically set up into authorId
    },
  });
  return result;
};

const getAllPost = async (payload: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured?: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const where: any = {};

  if (payload.search) {
    where.OR = [
      {
        title: {
          contains: payload.search,
          mode: "insensitive",
        },
      },
      {
        content: {
          contains: payload.search,
          mode: "insensitive",
        },
      },
      {
        tags: {
          has: payload.search,
        },
      },
    ];
  }

  if (payload.tags && payload.tags.length > 0) {
    where.tags = {
      hasEvery: payload.tags,
    };
  }

  if (typeof payload.isFeatured === "boolean") {
    where.isFeatured = payload.isFeatured;
  }

  if (payload.status) {
    where.status = payload.status;
  }

  if (payload.authorId) {
    where.authorId = payload.authorId;
  }

  const result = await prisma.post.findMany({
    take: payload.limit,
    skip: payload.skip,
    orderBy: {
      [payload.sortBy]: payload.sortOrder,
    },
    where: where,
  });

  const total = await prisma.post.count({
    where: where,
  });

  return {
    data: result,
    pagination: {
      total,
      page: payload.page,
      limit: payload.limit,
      totalPages: Math.ceil(total / payload.limit),
    },
  };
};

const getPostById = async (id: string) => {
  const result = await prisma.post.findUnique({
    where:{
      id: id,
    }
  })
  return result;
}

export const postServices = {
  createPost,
  getAllPost,
  getPostById,
};
