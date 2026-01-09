import express, { Request, Response } from "express"
import { postRouter } from "./modules/posts/posts.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors"
import { commentRouter } from "./modules/comments/commets.router";

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.APP_URL
}))

// better auth 
app.all("/api/auth/*splat", toNodeHandler(auth));
// post router
app.use("/posts", postRouter);
// comment router
app.use("/comments", commentRouter);


app.get("/", (req : Request, res: Response)=>{
    res.send("Hello world!");
});

export default app;