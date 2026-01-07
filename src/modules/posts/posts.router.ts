import express from "express";
import { postController } from "./posts.controller";
import auth, { UserRoles } from "../../middleware/auth";

const router = express.Router();

router.get("/", postController.getAllPost);
router.post("/", auth(UserRoles.USER), postController.createPost);

export const postRouter = router;