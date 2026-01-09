import { Request, Response } from "express";
import { commentServices } from "./comments.services";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user; // call user data here
    req.body.authorId = user?.id; // automatically userId set into authorId

    const result = await commentServices.createComment(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Cannot create comment!!!",
    });
  }
};

export const commentController = {
  createComment,
};
