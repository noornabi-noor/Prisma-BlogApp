import express from "express"
import { commentController } from "./commets.controller";
import auth, { UserRoles } from "../../middleware/auth";

const router = express.Router();

router.post("/", auth(UserRoles.USER, UserRoles.ADMIN), commentController.createComment);

export const commentRouter = router;