import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator/check";
import HttpError from "../errors/http.error";
import CommentModel, {Comment} from "../models/comment.model";
import CommentReplyModel, {CommentReply} from "../models/commentReply.model";
import PostModel from "../models/post.model";

export async function getComment(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.id;
    const comment = await CommentModel.findOne({commentId});
    res.json({comment, success: true, status: 200});
}

export async function getAllComments(req: Request, res: Response, next: NextFunction) {
    const comments = await CommentModel.findAll();
    res.json({comments, success: true, status: 200});
}

export async function getAllCommentsByPostId(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.id;
    const post = await PostModel.findOne({postId});
    const comments = await CommentModel.findAllByPost(post.id);
    res.json({comments, success: true, status: 200});
}

export async function createComment(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(422, "Not valid data");
    }

    const {commentData, postId} = req.body;

    const post = await PostModel.findOne({postId});
    const comment = new CommentModel({Post: post, User: req.user, ...commentData});
    await comment.save();
    res.json({comment, success: true, status: 200});
}

export async function editComment(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(422, "Not valid data");
    }

    const commentData: Comment = req.body;
    await CommentModel.findOneAndUpdate({commentId}, commentData);

    res.json({success: true, status: 200});
}

export async function deleteComment(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.id;
    await CommentModel.deleteOne({commentId});
    res.json({success: true, status: 200});
}

export async function replyComment(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.id;
    const {replyData} =  req.body;
    const comment = await CommentModel.findOne({commentId});
    const commentReply = new CommentReplyModel({Comment: comment, User: req.user, ...replyData});
    await commentReply.save();
    res.json({commentReply, success: true, status: 200});
}
