import {NextFunction, Request, Response} from "express";
import HttpError from "../errors/http.error";
import UserModel from "../models/user.model";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization.replace("Bearer ", ""); // jwt = req.header.Authorization
        const user = await UserModel.findOneWithAccessToken(token);
        if (!user) {
            return next(new HttpError(404, "User not found"));
        }
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
}
