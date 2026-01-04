import express from "express";
import { postController } from "./posts.controller";

const router = express.Router();

router.post("/", postController.createPost);

export const postRouter = router;