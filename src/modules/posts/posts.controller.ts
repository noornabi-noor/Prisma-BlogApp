import { Request, Response } from "express";
import { postServices } from "./posts.services";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";

const createPost = async (req: Request, res: Response) => {
  try {
    // take user data and check authorized user
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized user",
      });
    }

    const result = await postServices.createPost(req.body, user.id as string);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error instanceof Error ? error.message : "Post creation failed",
    });
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {

    // for search any part
    const { search } = req.query;
    const searchType = typeof search === "string" ? search : undefined;

    // search with tags name
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    // true or false (isFeatured)
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined
      : undefined;

      // check status
      const status = req.query.status as PostStatus | undefined;

      // check by authorId
      const authorId = req.query.authorId as string | undefined

      // pagination
      // const page = Number(req.query.page ?? 1);
      // const limit = Number(req.query.limit ?? 10);
      // const skip = (page - 1) * limit;

      const {page, limit, skip, sortBy, sortOrder} = paginationSortingHelper(req.query);

    const result = await postServices.getAllPost({
      search: searchType,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Cannot find out all post",
    });
  }
};

export const postController = {
  createPost,
  getAllPost,
};
