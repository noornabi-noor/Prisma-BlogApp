import { Request, Response } from "express";
import { postServices } from "./posts.services";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postServices.createPost(req.body);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error instanceof Error ? error.message : "Post creation failed",
    });
  }
};

export const postController = {
  createPost,
};
