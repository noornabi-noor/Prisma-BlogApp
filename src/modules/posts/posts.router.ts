import express from "express";
import { postController } from "./posts.controller";
import auth, { UserRoles } from "../../middleware/auth";

const router = express.Router();

router.get("/", postController.getAllPost);
router.get("/my-posts", auth(UserRoles.USER, UserRoles.ADMIN), postController.getMyPost);
router.get("/:id", postController.getPostById);
router.post("/", auth(UserRoles.USER, UserRoles.ADMIN), postController.createPost);

export const postRouter = router;