import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator/check";
import HttpError from "../errors/http.error";
import PostModel, {Post} from "../models/post.model";

export async function getPost(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.id;
    const eventData = await PostModel.findById(parseInt(postId, 10));
    res.json({eventData, success: true, status: 200});
}

export async function getAllPosts(req: Request, res: Response, next: NextFunction) {
    const posts = await PostModel.find();
    res.json({posts, success: true, status: 200});
}

export async function createPost(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(422, "Not valid data");
    }

    const {postData} = req.body;
    const post = new PostModel(postData);
    await post.save();

    res.json({post, success: true, status: 200});
}

export async function editPost(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(422, "Not valid data");
    }

    const postData: Post = req.body;
    await PostModel.findOneAndUpdate({postId}, postData);

    res.json({success: true, status: 200});
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
    const eventId = req.params.id;
    await PostModel.findOneAndDelete({eventId});
    res.json({success: true, status: 200});
}
