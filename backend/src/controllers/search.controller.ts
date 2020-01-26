import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator/check";
import HttpError from "../errors/http.error";
import PostModel, {Post} from "../models/post.model";

export async function searchPost(req: Request, res: Response, next: NextFunction) {
    const title = req.query.title;
    const posts = await PostModel.searchByTitle(title);
    res.json({posts, success: true, status: 200});
}
