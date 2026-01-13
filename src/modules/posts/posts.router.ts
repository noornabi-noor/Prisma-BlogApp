import express from "express";
import { postController } from "./posts.controller";
import auth, { UserRoles } from "../../middleware/auth";

const router = express.Router();

router.get("/", postController.getAllPost);
router.get("/stats", auth(UserRoles.ADMIN), postController.getStats)
router.get("/my-posts", auth(UserRoles.USER, UserRoles.ADMIN), postController.getMyPost);
router.get("/:id", postController.getPostById);
router.post("/", auth(UserRoles.USER, UserRoles.ADMIN), postController.createPost);
router.patch("/:postId", auth(UserRoles.USER, UserRoles.ADMIN), postController.updateMyPost);
router.delete("/:postId", auth(UserRoles.USER, UserRoles.ADMIN), postController.deleteMyPost);

export const postRouter = router;