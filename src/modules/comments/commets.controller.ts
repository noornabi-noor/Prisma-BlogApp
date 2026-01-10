import { Request, Response } from "express";
import { commentServices } from "./comments.services";
import { CommentStatus } from "../../../generated/prisma/enums";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user; // call user data here
    req.body.authorId = user?.id; // automatically userId set into authorId

    const result = await commentServices.createComment(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Cannot create comment!!!",
    });
  }
};

const getCommentById = async (req: Request, res: Response) => {
  try {
    const {commentId} = req.params;

    const result = await commentServices.getCommentById(commentId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Comment not found",
    });
  }
};

const getCommentByAuthorId = async(req: Request, res: Response) => {
  try {
    const {authorId} = req.params;

    const result = await commentServices.getCommentByAuthorId(authorId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Author not found",
    });
  }
}

const commentDelete = async(req: Request, res: Response) => {
  try {

    const user = req.user;
    const {commentId} = req.params;

    const result = await commentServices.commentDelete(user?.id as string, commentId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Author not found",
    });
  }
};

const updateComment = async(req: Request, res: Response) => {
  try {

    const user = req.user;
    const {commentId} = req.params;

    const result = await commentServices.updateComment(commentId as string, req.body, user?.id as string);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Update comment failed!!",
    });
  }
};

const moderateComment = async(req: Request, res: Response) => {
  try {

    const {commentId} = req.params;
    const { status } = req.body;


    const result = await commentServices.moderateComment(commentId as string, { status: status as CommentStatus });
    res.status(201).json(result);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message:("Comment update failed!")
    res.status(400).json({
      error: errorMessage,
      details: error
    });
  }
};


export const commentController = {
  createComment,
  getCommentById,
  getCommentByAuthorId,
  commentDelete,
  updateComment,
  moderateComment
};
