import {Application} from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import authRoute from "./auth.route";
import commentRoute from "./comment.route";
import homeRoute from "./home.route";
import eventRoute from "./post.route";
import registerRoute from "./register.route";
import userRoute from "./user.route";

export default function(app: Application) {
    app.use("/api", homeRoute);
    app.use("/api/register", registerRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/user", authMiddleware, userRoute);
    app.use("/api/comment", commentRoute);
    app.use("/api/event", eventRoute);
}
