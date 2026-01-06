import { Request, Response } from "express";
import { postServices } from "./posts.services";

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

export const postController = {
  createPost,
};
