import express, { Request, Response } from "express"
import { postRouter } from "./modules/posts/posts.router";

const app = express();
app.use(express.json());

app.use("/posts", postRouter);

app.get("/", (req : Request, res: Response)=>{
    res.send("Hello world!");
});

export default app;