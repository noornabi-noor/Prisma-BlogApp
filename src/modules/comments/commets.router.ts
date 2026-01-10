import express from "express"
import { commentController } from "./commets.controller";
import auth, { UserRoles } from "../../middleware/auth";

const router = express.Router();

router.get("/author/:authorId", commentController.getCommentByAuthorId)
router.get("/:commentId", commentController.getCommentById);
router.post("/", auth(UserRoles.USER, UserRoles.ADMIN), commentController.createComment);
router.delete("/:commentId", auth(UserRoles.USER, UserRoles.ADMIN), commentController.commentDelete);
router.patch("/:commentId", auth(UserRoles.USER, UserRoles.ADMIN), commentController.updateComment);
router.patch("/moderator/:commentId", auth(UserRoles.ADMIN), commentController.moderateComment);

export const commentRouter = router;