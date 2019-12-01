import {Application} from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import authRoute from "./auth.route";
import commentRoute from "./comment.route";
import conversationRoute from "./conversation.route";
import friendRoute from "./friend.route";
import homeRoute from "./home.route";
import postRoute from "./post.route";
import registerRoute from "./register.route";
import steamRoute from "./steam.route";
import userRoute from "./user.route";

export default function(app: Application) {
    app.use("/api", homeRoute);
    app.use("/api/register", registerRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/user", authMiddleware, userRoute);
    app.use("/api/users", userRoute);
    app.use("/api/comments", commentRoute);
    app.use("/api/posts", postRoute);
    app.use("/api/conversations", conversationRoute);
    app.use("/api/friends", friendRoute);
    app.use("/api/steam", steamRoute);
}
